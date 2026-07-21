const TYPE_WEIGHT = Object.freeze({ verified: 100, observed: 90, provided: 80, inferred: 40 });
const ALGORITHM_VERSION = "decision-ranking@0.3.0";

const average = (values) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
const round = (value) => Math.max(0, Math.min(100, Math.round(value)));

function evidenceScore(claim, evidenceById) {
  const usable = claim.evidence_ids.map((id) => evidenceById.get(id)).filter(Boolean);
  return round(average(usable.map((item) => item.confidence * TYPE_WEIGHT[item.type] / 100)));
}

function assertReferences(ad, request) {
  const claims = new Map(ad.claims.map((claim) => [claim.id, claim]));
  const evidence = new Set(ad.evidence.map((item) => item.id));
  for (const claim of ad.claims) {
    for (const id of claim.evidence_ids) {
      if (!evidence.has(id)) throw new Error(`SEMANTIC_REFERENCE_NOT_FOUND: evidence '${id}'`);
    }
  }
  for (const priority of request.priorities) {
    if (!claims.has(priority.claim_id)) throw new Error(`DECISION_CLAIM_NOT_FOUND: '${priority.claim_id}'`);
  }
  for (const objection of request.known_objections ?? []) {
    for (const id of objection.response_claim_ids) {
      if (!claims.has(id)) throw new Error(`DECISION_CLAIM_NOT_FOUND: '${id}'`);
    }
  }
}

export function decide(ad, request) {
  assertReferences(ad, request);
  const evidenceById = new Map(ad.evidence.map((item) => [item.id, item]));
  const weightByClaim = new Map(request.priorities.map((item) => [item.claim_id, item.business_weight]));
  const supported = ad.claims.filter((claim) => claim.status === "supported");

  const ranked = supported
    .map((claim) => {
      const evidence_score = evidenceScore(claim, evidenceById);
      const business_weight = weightByClaim.get(claim.id) ?? 3;
      const score = round(evidence_score * 0.7 + (business_weight / 5 * 100) * 0.3);
      return {
        rank: 0,
        claim_id: claim.id,
        text: claim.text,
        evidence_ids: claim.evidence_ids,
        evidence_score,
        business_weight,
        score,
        reason: `70% evidence (${evidence_score}) + 30% business priority (${business_weight}/5).`
      };
    })
    .sort((a, b) => b.score - a.score || a.claim_id.localeCompare(b.claim_id))
    .slice(0, request.constraints.max_messages)
    .map((message, index) => ({ ...message, rank: index + 1 }));

  const messageByClaim = new Map(ranked.map((message) => [message.claim_id, message]));
  const objections = (request.known_objections ?? []).map((objection) => {
    const response_messages = objection.response_claim_ids.map((id) => messageByClaim.get(id)).filter(Boolean);
    return { ...objection, response_messages, status: response_messages.length ? "covered" : "uncovered" };
  }).map(({ response_claim_ids: _, ...objection }) => objection);

  const risks = [];
  for (const claim of ad.claims.filter((item) => item.status !== "supported")) {
    risks.push({
      code: claim.status === "prohibited" ? "PROHIBITED_CLAIM_PRESENT" : "HYPOTHESIS_REQUIRES_REVIEW",
      severity: claim.status === "prohibited" ? "blocker" : "warning",
      message: claim.status === "prohibited" ? "A prohibited claim must not be used." : "A hypothesis cannot be promoted to a fact.",
      reference_id: claim.id
    });
  }
  for (const asset of (ad.assets ?? []).filter((item) => item.usage_rights === "unknown")) {
    risks.push({ code: "ASSET_RIGHTS_UNKNOWN", severity: "warning", message: "Asset usage rights require review.", reference_id: asset.id });
  }
  for (const objection of objections.filter((item) => item.status === "uncovered")) {
    risks.push({ code: "OBJECTION_UNCOVERED", severity: "warning", message: "Known objection has no ranked supported response.", reference_id: objection.id });
  }

  const confidence = ranked[0]?.evidence_score ?? 0;
  if (ranked.length && confidence < request.constraints.minimum_confidence) {
    risks.push({ code: "CONFIDENCE_BELOW_THRESHOLD", severity: "warning", message: "Primary message is below the requested confidence threshold.", reference_id: ranked[0].claim_id });
  }
  const status = !ranked.length || risks.some((risk) => risk.severity === "blocker")
    ? "blocked"
    : risks.length || confidence < request.constraints.minimum_confidence ? "needs_review" : "ready";

  return {
    schema_version: "0.3.0",
    contract_type: "decision_strategy",
    strategy_id: `strategy:${request.request_id}`,
    source: {
      project_id: ad.project_id,
      run_id: ad.metadata.run_id,
      input_schema_version: ad.schema_version,
      request_id: request.request_id
    },
    status,
    primary_objective: request.primary_objective,
    audience: request.audience,
    ...(ranked[0] ? { value_proposition: ranked[0] } : {}),
    message_hierarchy: ranked,
    objections,
    risks,
    confidence,
    decision_trace: {
      algorithm_version: ALGORITHM_VERSION,
      candidates_considered: supported.length,
      candidates_rejected: ad.claims.length - supported.length,
      scoring_formula: "evidence_score * 0.70 + normalized_business_weight * 0.30"
    }
  };
}