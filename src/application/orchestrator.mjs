import { decide } from "../engines/decision/index.mjs";
import { generateCopy } from "../engines/copy/index.mjs";
import { planCarousel } from "../engines/carousel/index.mjs";
import { analyzePackage } from "../engines/analyzer/index.mjs";
import { adaptShopeeBr } from "../adapters/shopee-br/index.mjs";

const now = (clock) => clock().toISOString();

export function runMarketplacePipeline(input, options = {}) {
  const clock = options.clock ?? (() => new Date());
  const stages = [];
  const artifacts = {};
  const execute = (name, fn) => {
    const started_at = now(clock);
    try {
      const value = fn();
      stages.push({ name, status: "completed", started_at, completed_at: now(clock) });
      return value;
    } catch (error) {
      stages.push({ name, status: "failed", started_at, completed_at: now(clock), error_code: String(error.message).split(":")[0] });
      throw Object.assign(new Error(`PIPELINE_STAGE_FAILED:${name}:${error.message}`), { stages, artifacts });
    }
  };

  artifacts.strategy = execute("decision", () => decide(input.ad, input.decision_request));
  artifacts.copy = execute("copy", () => generateCopy(input.ad, artifacts.strategy, input.copy_request));
  artifacts.carousel = execute("carousel", () => planCarousel(input.ad, artifacts.strategy, artifacts.copy, input.carousel_request));
  artifacts.analysis = execute("analysis", () => analyzePackage(input.ad, artifacts.strategy, artifacts.copy, artifacts.carousel));
  artifacts.export = execute("adapter", () => adaptShopeeBr(input.ad, artifacts.copy, artifacts.carousel, artifacts.analysis, input.marketplace_profile));

  return {
    schema_version: "0.8.0",
    contract_type: "pipeline_run",
    run_id: input.ad.metadata.run_id,
    project_id: input.ad.project_id,
    status: artifacts.export.status === "ready" ? "completed" : "needs_review",
    stages,
    artifacts
  };
}