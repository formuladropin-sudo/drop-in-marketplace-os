export function defineMarketplaceAdapter(definition) {
  const required = ["id", "channel", "country", "version", "adapt"];
  for (const field of required) {
    if (definition?.[field] === undefined) throw new Error(`ADAPTER_DEFINITION_INVALID:${field}`);
  }
  if (typeof definition.adapt !== "function") throw new Error("ADAPTER_DEFINITION_INVALID:adapt");
  return Object.freeze({ ...definition });
}

export function createAdapterRegistry(adapters = []) {
  const entries = new Map();
  for (const adapter of adapters) {
    const validated = defineMarketplaceAdapter(adapter);
    const key = `${validated.channel}:${validated.country}`;
    if (entries.has(key)) throw new Error(`ADAPTER_DUPLICATE:${key}`);
    entries.set(key, validated);
  }
  return Object.freeze({
    resolve(channel, country) {
      const adapter = entries.get(`${channel}:${country}`);
      if (!adapter) throw new Error(`ADAPTER_NOT_FOUND:${channel}:${country}`);
      return adapter;
    },
    list() { return [...entries.values()].map(({ adapt: _, ...metadata }) => metadata); }
  });
}