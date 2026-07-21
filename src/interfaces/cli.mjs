#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { runMarketplacePipeline } from "../application/index.mjs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: drop-in-marketplace-os <pipeline-input.json>");
  process.exit(2);
}

try {
  const input = JSON.parse(await readFile(resolve(file), "utf8"));
  process.stdout.write(`${JSON.stringify(runMarketplacePipeline(input), null, 2)}\n`);
} catch (error) {
  console.error(JSON.stringify({ status: "failed", error: error.message, stages: error.stages ?? [] }, null, 2));
  process.exit(1);
}