import type { Market } from "./api";
import { toRawUsd } from "./utils";

export function getMarketPricing(market: Market) {
  const pricing = market.pricing;
  const yesPrice = toRawUsd(pricing?.buyYesPriceUsd ?? 500_000);
  const noPrice = toRawUsd(pricing?.buyNoPriceUsd ?? 500_000);
  const chance = Math.round(yesPrice * 100);
  const yesCents = (yesPrice * 100).toFixed(1);
  const noCents = (noPrice * 100).toFixed(1);
  return { yesPrice, noPrice, chance, yesCents, noCents };
}
