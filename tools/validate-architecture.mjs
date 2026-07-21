import { readFile, readdir } from "node:fs/promises";
const engineFiles=(await readdir(new URL("../src/engines",import.meta.url),{recursive:true})).filter(f=>f.endsWith(".mjs"));let failed=false;
for(const relative of engineFiles){const source=await readFile(new URL(`../src/engines/${relative}`,import.meta.url),"utf8");if(/from\s+["'][^"']*(?:engines|adapters|application|interfaces)\//.test(source)){console.error(`FORBIDDEN_ENGINE_DEPENDENCY:${relative}`);failed=true;}}
const orchestrator=await readFile(new URL("../src/application/orchestrator.mjs",import.meta.url),"utf8");if(/shopee|mercado.?livre|amazon|magalu|tiktok/i.test(orchestrator)){console.error("CONCRETE_MARKETPLACE_IN_ORCHESTRATOR");failed=true;}
if(failed)process.exit(1);console.log("Architecture dependencies verified.");