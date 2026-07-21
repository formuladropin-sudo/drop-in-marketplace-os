import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const schemaPath = path.join(root, "schemas/v0.2.0/marketplace-ad.schema.json");
const validDir = path.join(root, "tests/fixtures/contracts/valid");
const invalidDir = path.join(root, "tests/fixtures/contracts/invalid");

const parseJson = async (file) => JSON.parse(await readFile(file, "utf8"));

const listJson = async (directory) =>
  (await readdir(directory))
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => path.join(directory, name));

const schemaErrorCode = (errors = []) => {
  const keyword = errors[0]?.keyword;
  return {
    required: "CONTRACT_REQUIRED_FIELD_MISSING",
    type: "CONTRACT_TYPE_MISMATCH",
    minimum: "CONTRACT_VALUE_OUT_OF_RANGE",
    maximum: "CONTRACT_VALUE_OUT_OF_RANGE",
    minLength: "CONTRACT_VALUE_OUT_OF_RANGE",
    maxLength: "CONTRACT_VALUE_OUT_OF_RANGE",
    enum: "CONTRACT_ENUM_INVALID",
    const: "CONTRACT_ENUM_INVALID",
    format: "CONTRACT_FORMAT_INVALID",
    pattern: "CONTRACT_FORMAT_INVALID",
    additionalProperties: "CONTRACT_UNKNOWN_PROPERTY"
  }[keyword] ?? "CONTRACT_SCHEMA_INVALID";
};

const findDuplicates = (values) => {
  const seen = new Set();
  return values.filter((value) => (seen.has(value) ? true : !seen.add(value)));
};

function semanticErrors(document) {
  const errors = [];
  const push = (code, path, message) => errors.push({ code, severity: "error", path, message });

  const evidenceById = new Map(document.evidence.map((item) => [item.id, item]));
  const skuSet = new Set(document.product.variants.map((item) => item.sku));

  for (const [label, ids] of [
    ["evidence", document.evidence.map((item) => item.id)],
    ["claims", document.claims.map((item) => item.id)],
    ["assets", (document.assets ?? []).map((item) => item.id)],
    ["variants", document.product.variants.map((item) => item.sku)]
  ]) {
    for (const duplicate of findDuplicates(ids)) {
      push("SEMANTIC_DUPLICATE_ID", `/${label}`, `Duplicate identifier '${duplicate}'.`);
    }
  }

  document.claims.forEach((claim, claimIndex) => {
    claim.evidence_ids.forEach((id, evidenceIndex) => {
      if (!evidenceById.has(id)) {
        push(
          "SEMANTIC_REFERENCE_NOT_FOUND",
          `/claims/${claimIndex}/evidence_ids/${evidenceIndex}`,
          `Evidence reference '${id}' was not found.`
        );
      }
    });
    if (claim.status === "supported") {
      const publishable = claim.evidence_ids
        .map((id) => evidenceById.get(id))
        .filter(Boolean)
        .some((evidence) => evidence.type !== "inferred");
      if (!publishable) {
        push(
          "SEMANTIC_CLAIM_WITHOUT_EVIDENCE",
          `/claims/${claimIndex}`,
          `Supported claim '${claim.id}' requires non-inferred evidence.`
        );
      }
    }
  });

  (document.assets ?? []).forEach((asset, assetIndex) => {
    (asset.variant_skus ?? []).forEach((sku, skuIndex) => {
      if (!skuSet.has(sku)) {
        push(
          "SEMANTIC_REFERENCE_NOT_FOUND",
          `/assets/${assetIndex}/variant_skus/${skuIndex}`,
          `Variant SKU reference '${sku}' was not found.`
        );
      }
    });
  });

  const currencies = [
    document.offer.price.currency,
    document.offer.compare_at_price?.currency
  ].filter(Boolean);
  if (currencies.some((currency) => currency !== document.marketplace.currency)) {
    push("SEMANTIC_CURRENCY_MISMATCH", "/offer", "Offer currency must match marketplace currency.");
  }
  if (
    document.offer.compare_at_price &&
    document.offer.compare_at_price.amount < document.offer.price.amount
  ) {
    push(
      "SEMANTIC_COMPARE_PRICE_INVALID",
      "/offer/compare_at_price/amount",
      "Compare-at price cannot be lower than current price."
    );
  }

  document.product.variants.forEach((variant, index) => {
    if (variant.availability === "out_of_stock" && (variant.stock_quantity ?? 0) > 0) {
      push(
        "SEMANTIC_STOCK_INCONSISTENT",
        `/product/variants/${index}`,
        "Out-of-stock variant cannot have positive stock quantity."
      );
    }
  });

  return errors;
}

const schema = await parseJson(schemaPath);
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);
let failures = 0;

for (const file of await listJson(validDir)) {
  const document = await parseJson(file);
  const structural = validate(document) ? [] : validate.errors;
  const semantic = structural.length === 0 ? semanticErrors(document) : [];
  if (structural.length || semantic.length) {
    failures += 1;
    console.error(`FAIL valid fixture: ${path.basename(file)}`, structural, semantic);
  } else {
    console.log(`PASS valid fixture: ${path.basename(file)}`);
  }
}

for (const file of await listJson(invalidDir)) {
  const fixture = await parseJson(file);
  const structurallyValid = validate(fixture.document);
  const errors = structurallyValid
    ? semanticErrors(fixture.document)
    : [{ code: schemaErrorCode(validate.errors), details: validate.errors }];
  if (errors.some((error) => error.code === fixture.expected_error)) {
    console.log(`PASS invalid fixture: ${path.basename(file)} -> ${fixture.expected_error}`);
  } else {
    failures += 1;
    console.error(
      `FAIL invalid fixture: ${path.basename(file)} expected ${fixture.expected_error}`,
      errors
    );
  }
}

if (failures > 0) {
  process.exitCode = 1;
} else {
  console.log("Contract validation completed successfully.");
}