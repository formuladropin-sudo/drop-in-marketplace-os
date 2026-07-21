import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import Ajv2020 from "ajv/dist/2020.js";
import { runMarketplacePipeline } from "../src/application/index.mjs";
const j=async p=>JSON.parse(await readFile(new URL(p,import.meta.url),"utf8"));
const input={ad:await j("./fixtures/contracts/valid/shopee-shirt.json"),decision_request:await j("./fixtures/decision/request-conversion.json"),copy_request:await j("./fixtures/copy/request-shopee.json"),carousel_request:await j("./fixtures/carousel/request-marketplace.json"),marketplace_profile:await j("../config/marketplaces/shopee-br.example.json")};
const schema=await j("../schemas/v0.7.0/marketplace-export.schema.json");
test("Shopee export conforms to generic marketplace adapter contract",()=>{const output=runMarketplacePipeline(input).artifacts.export;const validate=new Ajv2020({strict:true}).compile(schema);assert.equal(validate(output),true,JSON.stringify(validate.errors));});