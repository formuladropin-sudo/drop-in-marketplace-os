import { defineMarketplaceAdapter } from "../adapter-interface.mjs";
import { adaptShopeeBr } from "./shopee-adapter.mjs";

export { adaptShopeeBr };
export const shopeeBrAdapter = defineMarketplaceAdapter({
  id: "shopee-br",
  channel: "shopee",
  country: "BR",
  version: "0.9.1",
  adapt: adaptShopeeBr
});