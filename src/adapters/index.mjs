import { createAdapterRegistry } from "./adapter-interface.mjs";
import { shopeeBrAdapter } from "./shopee-br/index.mjs";

export { createAdapterRegistry, defineMarketplaceAdapter } from "./adapter-interface.mjs";
export { shopeeBrAdapter } from "./shopee-br/index.mjs";
export const defaultAdapterRegistry = createAdapterRegistry([shopeeBrAdapter]);