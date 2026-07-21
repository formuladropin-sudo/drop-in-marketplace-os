import { readFile } from "node:fs/promises";
const files=["README.md","CHANGELOG.md","VERSION.md","SECURITY.md","docs/operations/RUNBOOK.md","docs/operations/OBSERVABILITY.md","docs/operations/RELEASE_CHECKLIST.md"];
let failed=false;
for(const file of files){const text=await readFile(file,"utf8");if(!text.trim()||/\b(?:TODO|TBD)\b/.test(text)||/lorem ipsum/i.test(text)){console.error(`INVALID_RELEASE_DOCUMENT:${file}`);failed=true;}}
const pkg=JSON.parse(await readFile("package.json","utf8"));const version=await readFile("VERSION.md","utf8");
if(!version.includes(`\`${pkg.version}\``)){console.error("VERSION_MISMATCH");failed=true;}
if(failed)process.exit(1);console.log(`Release documents verified for ${pkg.version}.`);