import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { readFile } from "node:fs/promises";

const schemas = await Promise.all([
  "../../schemas/v0.2.0/marketplace-ad.schema.json",
  "../../schemas/v0.3.0/decision-request.schema.json",
  "../../schemas/v0.4.0/copy-request.schema.json",
  "../../schemas/v0.5.0/carousel-request.schema.json"
].map(async path => JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"))));
const ajv = new Ajv2020({ allErrors: true, strict: true }); addFormats(ajv);
const validators = schemas.map(schema => ajv.compile(schema));

export function validatePipelineInput(input) {
  const fields = ["ad", "decision_request", "copy_request", "carousel_request"];
  const errors = [];
  fields.forEach((field, index) => {
    if (!validators[index](input?.[field])) errors.push({ field, errors: structuredClone(validators[index].errors ?? []) });
  });
  if (!input?.marketplace_profile) errors.push({ field: "marketplace_profile", errors: [{ keyword: "required", message: "is required" }] });
  return { valid: errors.length === 0, errors };
}