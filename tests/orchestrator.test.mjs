import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { runMarketplacePipeline } from "../src/application/index.mjs";

const j=async p=>JSON.parse(await readFile(new URL(p,import.meta.url),"utf8"));
const input={ad:await j("./fixtures/contracts/valid/shopee-shirt.json"),decision_request:await j("./fixtures/decision/request-conversion.json"),copy_request:await j("./fixtures/copy/request-shopee.json"),carousel_request:await j("./fixtures/carousel/request-marketplace.json"),marketplace_profile:await j("../config/marketplaces/shopee-br.example.json")};
const schema=await j("../schemas/v0.8.0/pipeline-run.schema.json");
const clock=()=>new Date("2026-07-21T18:00:00.000Z");
test("orchestrator executes five ordered stages",()=>{const r=runMarketplacePipeline(input,{clock});assert.deepEqual(r.stages.map(s=>s.name),["decision","copy","carousel","analysis","adapter"]);assert.ok(r.stages.every(s=>s.status==="completed"));});
test("pipeline result conforms to public contract",()=>{const r=runMarketplacePipeline(input,{clock}),ajv=new Ajv2020({strict:true,allErrors:true});addFormats(ajv);const v=ajv.compile(schema);assert.equal(v(r),true,JSON.stringify(v.errors));});
test("pipeline is deterministic with injected clock",()=>assert.deepEqual(runMarketplacePipeline(input,{clock}),runMarketplacePipeline(input,{clock})));
test("failure reports exact stage and stops downstream work",()=>{const x=structuredClone(input);x.copy_request.locale="en-US";assert.throws(()=>runMarketplacePipeline(x,{clock}),e=>e.message.includes("PIPELINE_STAGE_FAILED:copy")&&e.stages.length===2&&e.stages[1].status==="failed");});
test("artifacts preserve cross-stage source identifiers",()=>{const r=runMarketplacePipeline(input,{clock});assert.equal(r.artifacts.copy.source.strategy_id,r.artifacts.strategy.strategy_id);assert.equal(r.artifacts.carousel.source.copy_id,r.artifacts.copy.copy_id);});