#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { runMarketplacePipeline } from "../application/index.mjs";
import { validatePipelineInput } from "./input-validator.mjs";

const command = ["run", "validate"].includes(process.argv[2]) ? process.argv[2] : "run";
const file = command === "run" && process.argv[2] !== "run" ? process.argv[2] : process.argv[3];
if (!file) {
  console.error("Usage: drop-in-marketplace-os [run|validate] <pipeline-input.json>");
  process.exit(2);
}

try {
  const input = JSON.parse(await readFile(resolve(file), "utf8"));
  const validation = validatePipelineInput(input);
  if (!validation.valid) {
    console.error(JSON.stringify({ status: "invalid", ...validation }, null, 2));
    process.exit(1);
  }
  if (command === "validate") {
    process.stdout.write(`${JSON.stringify({ status: "valid", valid: true }, null, 2)}\n`);
    process.exit(0);
  }
  process.stdout.write(`${JSON.stringify(runMarketplacePipeline(input), null, 2)}\n`);
} catch (error) {
  console.error(JSON.stringify({ status: "failed", error: error.message, stages: error.stages ?? [] }, null, 2));
  process.exit(1);
}