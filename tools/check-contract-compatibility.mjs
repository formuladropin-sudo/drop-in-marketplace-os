import { readFile, readdir } from "node:fs/promises";
const registry=await readFile(new URL("../docs/contracts/CONTRACT_REGISTRY.md",import.meta.url),"utf8");
const paths=(await readdir(new URL("../schemas",import.meta.url),{recursive:true})).filter(p=>/^v\d+\.\d+\.\d+\/.+\.schema\.json$/.test(p));
const ids=new Set();let failed=false;
for(const path of paths){const schema=JSON.parse(await readFile(new URL(`../schemas/${path}`,import.meta.url),"utf8"));const version=path.split("/")[0].slice(1);if(!schema.$id?.includes(`/v${version}/`)){console.error(`SCHEMA_ID_VERSION_MISMATCH:${path}`);failed=true;}if(ids.has(schema.$id)){console.error(`DUPLICATE_SCHEMA_ID:${schema.$id}`);failed=true;}ids.add(schema.$id);if(!registry.includes(path)){console.error(`SCHEMA_NOT_REGISTERED:${path}`);failed=true;}}
if(failed)process.exit(1);console.log(`${paths.length} public contracts verified.`);