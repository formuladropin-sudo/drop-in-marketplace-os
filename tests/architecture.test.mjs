import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createAdapterRegistry, defineMarketplaceAdapter, defaultAdapterRegistry } from "../src/adapters/index.mjs";
import { runMarketplacePipeline } from "../src/application/index.mjs";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const engineFiles = (await readdir(new URL("../src/engines", import.meta.url), { recursive: true })).filter((f) => f.endsWith(".mjs"));

test("engines do not import other engines, adapters, application or interfaces", async () => {
  for (const relative of engineFiles) {
    const source = await read(`src/engines/${relative}`);
    assert.doesNotMatch(source, /from\s+["'][^"']*(?:engines|adapters|application|interfaces)\//, relative);
  }
});

test("orchestrator depends on registry, not a concrete marketplace", async () => {
  const source = await read("src/application/orchestrator.mjs");
  assert.match(source, /adapterRegistry\.resolve/);
  assert.doesNotMatch(source, /shopee|mercado.?livre|amazon|magalu|tiktok/i);
});

test("new marketplace can be registered without changing core", () => {
  const mock = defineMarketplaceAdapter({ id: "mock-us", channel: "mock", country: "US", version: "1.0.0", adapt: () => ({ ok: true }) });
  const registry = createAdapterRegistry([mock]);
  assert.equal(registry.resolve("mock", "US").adapt().ok, true);
  assert.throws(() => registry.resolve("unknown", "US"), /ADAPTER_NOT_FOUND/);
});

test("default registry exposes Shopee only through metadata", () => {
  assert.deepEqual(defaultAdapterRegistry.list().map((a) => a.id), ["shopee-br"]);
  assert.equal("adapt" in defaultAdapterRegistry.list()[0], false);
});

test("pipeline accepts an injected marketplace plugin", () => {
  const registry = createAdapterRegistry([{ id: "generic-br", channel: "shopee", country: "BR", version: "test", adapt: () => ({ status: "ready", marker: "injected" }) }]);
  assert.equal(typeof runMarketplacePipeline, "function");
  assert.equal(registry.resolve("shopee", "BR").adapt().marker, "injected");
});

test("every versioned schema appears in the contract registry", async () => {
  const schemas = (await readdir(new URL("../schemas", import.meta.url), { recursive: true }))
    .filter((name) => /^v\d+\.\d+\.\d+\/.+\.schema\.json$/.test(name));
  const registry = await read("docs/contracts/CONTRACT_REGISTRY.md");
  for (const schema of schemas) assert.match(registry, new RegExp(schema.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), schema);
});