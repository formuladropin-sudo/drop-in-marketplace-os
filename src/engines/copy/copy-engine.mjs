const normalize = (text) => text.replace(/\s+/g, " ").trim();
const stripPunctuation = (text) => normalize(text).replace(/[.!?;:]+$/u, "");

function fit(text, limit, field, truncations) {
  const clean = normalize(text);
  if (clean.length <= limit) return clean;
  const clipped = clean.slice(0, Math.max(1, limit - 1));
  const boundary = clipped.lastIndexOf(" ");
  truncations.push(field);
  return `${clipped.slice(0, boundary > limit * 0.6 ? boundary : clipped.length).trim()}…`;
}

function uniqueKeywords(keywords, text, limit) {
  const base = text.toLocaleLowerCase();
  return keywords.filter((keyword, index) => keywords.indexOf(keyword) === index && !base.includes(keyword.toLocaleLowerCase())).slice(0, limit);
}

export function generateCopy(ad, strategy, request) {
  if (strategy.status === "blocked") throw new Error("COPY_STRATEGY_BLOCKED");
  if (request.locale !== ad.marketplace.locale) throw new Error("COPY_LOCALE_MISMATCH");
  const supportedIds = new Set(ad.claims.filter((claim) => claim.status === "supported").map((claim) => claim.id));
  const messages = strategy.message_hierarchy.filter((message) => supportedIds.has(message.claim_id));
  if (!messages.length) throw new Error("COPY_NO_SUPPORTED_MESSAGES");

  const truncations = [];
  const primary = messages[0];
  const titleKeywords = uniqueKeywords(request.keywords, ad.product.name, 3);
  const titleText = fit([ad.product.name, ...titleKeywords].join(" "), request.limits.title_max_chars, "title", truncations);
  const title = { text: titleText, source_claim_ids: [] };

  const bullets = messages.slice(0, request.limits.max_bullets).map((message, index) => ({
    text: fit(stripPunctuation(message.text), request.limits.bullet_max_chars, `bullets/${index}`, truncations),
    source_claim_ids: [message.claim_id]
  }));

  const intro = `${ad.product.name}: ${stripPunctuation(primary.text)}.`;
  const details = bullets.map((bullet) => `• ${bullet.text}`).join("\n");
  const descriptionText = fit(`${intro}\n\n${details}\n\n${request.cta}`, request.limits.description_max_chars, "description", truncations);
  const description = { text: descriptionText, source_claim_ids: bullets.flatMap((bullet) => bullet.source_claim_ids) };
  const unsupportedClaims = strategy.message_hierarchy.filter((message) => !supportedIds.has(message.claim_id)).map((message) => message.claim_id);

  return {
    schema_version: "0.4.0",
    contract_type: "copy_package",
    copy_id: `copy:${request.request_id}`,
    source: { project_id: ad.project_id, strategy_id: strategy.strategy_id, request_id: request.request_id },
    title,
    bullets,
    description,
    cta: request.cta,
    keywords_used: titleKeywords,
    compliance: {
      status: unsupportedClaims.length ? "blocked" : strategy.status === "needs_review" || truncations.length ? "needs_review" : "ready",
      unsupported_claims: unsupportedClaims,
      truncations
    }
  };
}