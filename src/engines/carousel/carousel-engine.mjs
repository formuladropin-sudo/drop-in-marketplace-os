const BASE_ROLES = ["cover", "views", "benefit", "detail", "lifestyle", "material", "measurements", "trust", "cta"];
const OBJECTIVES = {
  cover: "Identify the product immediately.", views: "Show essential product views.", benefit: "Communicate a supported priority benefit.",
  detail: "Demonstrate finish or print fidelity.", lifestyle: "Show a plausible usage context without changing the product.", material: "Demonstrate a supported material fact.",
  measurements: "Reduce size uncertainty using provided measurements.", trust: "Communicate supported operational trust.", cta: "Close the narrative with a clear action."
};

export function planCarousel(ad, strategy, copy, request) {
  if (strategy.status === "blocked" || copy.compliance.status === "blocked") throw new Error("CAROUSEL_SOURCE_BLOCKED");
  const assets = (ad.assets ?? []).filter((asset) => asset.usage_rights !== "unknown");
  if (!assets.length) throw new Error("CAROUSEL_NO_USABLE_ASSETS");
  const roles = BASE_ROLES.filter((role) => request.include_measurements || role !== "measurements");
  while (roles.length < request.slide_count) roles.splice(roles.length - 1, 0, "benefit");
  const selected = roles.slice(0, request.slide_count - 1).concat("cta");
  const messages = strategy.message_hierarchy;
  let messageIndex = 0;
  const usedClaims = new Set();
  const slides = selected.map((role, index) => {
    const usesMessage = ["benefit", "material", "trust"].includes(role) && messages.length;
    const message = usesMessage ? messages[messageIndex++ % messages.length] : null;
    if (message) usedClaims.add(message.claim_id);
    const headline = role === "cover" ? ad.product.name : role === "cta" ? copy.cta : message?.text ?? OBJECTIVES[role];
    return {
      position: index + 1, role, objective: OBJECTIVES[role], headline,
      source_claim_ids: message ? [message.claim_id] : [], asset_ids: assets.map((asset) => asset.id).slice(0, role === "views" ? 2 : 1),
      composition: `${request.aspect_ratio} canvas; ${request.visual_style}; keep content inside ${request.safe_zone_percent}% safe zone.`,
      requirements: ["Use only referenced product assets.", "Keep the product recognizable and text legible on mobile."],
      prohibitions: ["Do not change product color, print, proportions or material.", "Do not add unsupported claims or invented certifications."],
      acceptance_criteria: ["Product fidelity confirmed against reference.", "No text crosses the safe zone.", "One primary message is visually dominant."]
    };
  });
  const supported = messages.map((message) => message.claim_id);
  const uncovered = supported.filter((id) => !usedClaims.has(id));
  const warnings = [...(uncovered.length ? ["SUPPORTED_MESSAGES_UNCOVERED"] : []), ...(request.include_measurements && !ad.product.attributes.sizes ? ["MEASUREMENTS_REQUIRE_SOURCE_DATA"] : [])];
  return {
    schema_version: "0.5.0", contract_type: "carousel_plan", plan_id: `carousel:${request.request_id}`,
    source: { project_id: ad.project_id, strategy_id: strategy.strategy_id, copy_id: copy.copy_id, request_id: request.request_id },
    aspect_ratio: request.aspect_ratio, safe_zone_percent: request.safe_zone_percent, slides,
    coverage: { supported_claim_ids: [...usedClaims], uncovered_claim_ids: uncovered },
    compliance: { status: warnings.length || strategy.status === "needs_review" ? "needs_review" : "ready", warnings }
  };
}