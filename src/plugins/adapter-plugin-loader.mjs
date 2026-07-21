import { pathToFileURL, fileURLToPath } from "node:url";
import { resolve, sep } from "node:path";
import { createAdapterRegistry } from "../adapters/adapter-interface.mjs";

function safeModuleUrl(specifier, baseUrl) {
  if (typeof specifier !== "string" || !specifier.startsWith("./") || specifier.includes("..") || /^[a-z]+:/i.test(specifier)) {
    throw new Error(`PLUGIN_SPECIFIER_FORBIDDEN:${specifier}`);
  }
  const root = resolve(fileURLToPath(baseUrl));
  const target = resolve(root, specifier);
  if (!(target === root || target.startsWith(`${root}${sep}`))) throw new Error(`PLUGIN_PATH_OUTSIDE_ROOT:${specifier}`);
  return pathToFileURL(target).href;
}

export async function loadAdapterPlugins(manifest, options = {}) {
  if (manifest?.schema_version !== "0.9.2" || manifest?.contract_type !== "adapter_plugin_manifest" || !Array.isArray(manifest.plugins)) {
    throw new Error("PLUGIN_MANIFEST_INVALID");
  }
  const baseUrl = options.baseUrl ?? new URL("../../", import.meta.url);
  const adapters = [];
  for (const plugin of manifest.plugins) {
    if (plugin.enabled === false) continue;
    const module = await import(safeModuleUrl(plugin.module, baseUrl));
    const adapter = module[plugin.export];
    if (!adapter) throw new Error(`PLUGIN_EXPORT_NOT_FOUND:${plugin.id}:${plugin.export}`);
    if (adapter.id !== plugin.id) throw new Error(`PLUGIN_ID_MISMATCH:${plugin.id}:${adapter.id}`);
    adapters.push(adapter);
  }
  return createAdapterRegistry(adapters);
}