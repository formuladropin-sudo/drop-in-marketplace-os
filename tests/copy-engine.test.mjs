import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { decide } from "../src/engines/decision/index.mjs";
import { generateCopy } from "../src/engines/copy/index.mjs";

const json = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));
const ad = await json("./fixtures/contracts/valid/shopee-shirt.json");
const decisionRequest = await json("./fixtures/decision/request-conversion.json");
const copyRequest = await json("./fixtures/copy/request-shopee.json");
const requestSchema = await json("../schemas/v0.4.0/copy-request.schema.json");
const outputSchema = await json("../schemas/v0.4.0/copy-package.schema.json");
const ajv = new Ajv2020({ strict: true, allErrors: true });
addFormats(ajv);

test("copy request and output conform to public contracts", () => {
  assert.equal(ajv.compile(requestSchema)(copyRequest), true);
  const output = generateCopy(ad, decide(ad, decisionRequest), copyRequest);
  const validate = ajv.compile(outputSchema);
  assert.equal(validate(output), true, JSON.stringify(validate.errors));
});

test("copy is deterministic and respects channel limits", () => {
  const strategy = decide(ad, decisionRequest);
  const first = generateCopy(ad, strategy, copyRequest);
  assert.deepEqual(first, generateCopy(ad, strategy, copyRequest));
  assert.ok(first.title.text.length <= copyRequest.limits.title_max_chars);
  assert.ok(first.bullets.every((item) => item.text.length <= copyRequest.limits.bullet_max_chars));
  assert.ok(first.description.text.length <= copyRequest.limits.description_max_chars);
});

test("every persuasive statement remains traceable to supported claims", () => {
  const output = generateCopy(ad, decide(ad, decisionRequest), copyRequest);
  const supported = new Set(ad.claims.filter((claim) => claim.status === "supported").map((claim) => claim.id));
  for (const element of [...output.bullets, output.description]) {
    assert.ok(element.source_claim_ids.every((id) => supported.has(id)));
  }
  assert.deepEqual(output.compliance.unsupported_claims, []);
});

test("blocked strategy cannot generate copy", () => {
  const riskyAd = structuredClone(ad);
  riskyAd.claims.push({ id: "claim-prohibited", text: "Guaranteed.", status: "prohibited", evidence_ids: [] });
  assert.throws(() => generateCopy(riskyAd, decide(riskyAd, decisionRequest), copyRequest), /COPY_STRATEGY_BLOCKED/);
});

test("locale mismatch fails explicitly", () => {
  assert.throws(() => generateCopy(ad, decide(ad, decisionRequest), { ...copyRequest, locale: "en-US" }), /COPY_LOCALE_MISMATCH/);
});