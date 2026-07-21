import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { decide } from "../src/engines/decision/index.mjs";

const json = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));
const ad = await json("./fixtures/contracts/valid/shopee-shirt.json");
const request = await json("./fixtures/decision/request-conversion.json");
const outputSchema = await json("../schemas/v0.3.0/decision-strategy.schema.json");
const requestSchema = await json("../schemas/v0.3.0/decision-request.schema.json");
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

test("request fixture conforms to its public contract", () => {
  assert.equal(ajv.compile(requestSchema)(request), true);
});

test("decision output is deterministic and contract-valid", () => {
  const first = decide(ad, request);
  const second = decide(ad, request);
  assert.deepEqual(first, second);
  const validate = ajv.compile(outputSchema);
  assert.equal(validate(first), true, JSON.stringify(validate.errors));
});

test("higher business priority wins when evidence strength is equal", () => {
  const result = decide(ad, request);
  assert.equal(result.value_proposition.claim_id, "claim-dispatch");
  assert.equal(result.message_hierarchy[0].rank, 1);
  assert.equal(result.objections[0].status, "covered");
  assert.equal(result.status, "ready");
});

test("unknown claim reference fails explicitly", () => {
  const invalid = structuredClone(request);
  invalid.priorities[0].claim_id = "claim-missing";
  assert.throws(() => decide(ad, invalid), /DECISION_CLAIM_NOT_FOUND/);
});

test("prohibited claim blocks the strategy", () => {
  const riskyAd = structuredClone(ad);
  riskyAd.claims.push({ id: "claim-prohibited", text: "Guaranteed result.", status: "prohibited", evidence_ids: [] });
  const result = decide(riskyAd, request);
  assert.equal(result.status, "blocked");
  assert.ok(result.risks.some((risk) => risk.code === "PROHIBITED_CLAIM_PRESENT"));
});