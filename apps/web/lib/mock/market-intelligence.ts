import type { Market, PredictionEvent } from "@/lib/prediction/api";
import { getMarketTitle, getRenderableMarkets } from "@/lib/prediction/market-display";
import { getMarketPricing } from "@/lib/prediction/market-pricing";
import { buildMarketHref } from "@/lib/markets/market-link";
import { formatNumber, toRawUsd } from "@/lib/prediction/utils";

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export type MarketMovement = {
  chancePct: number;
  change24hPct: number;
  change7dPct: number;
  volumeTotal: number | null;
  volume24h: number | null;
  liquidity: number | null;
  openInterest: number | null;
  activityCount: number;
  change24hIsMock: boolean;
  change7dIsMock: boolean;
};

export type MarketAiSummary = {
  headline: string;
  bullCase: string;
  bearCase: string;
  keyCatalyst: string;
  riskFactor: string;
  generatedAt: string;
};

export type RelatedMarketItem = {
  marketId: string;
  eventId: string;
  title: string;
  chancePct: number;
  href: string;
};

export function buildMarketKey(eventId: string, marketId: string): string {
  return `${eventId}:${marketId}`;
}

export function buildMarketMovement(
  event: PredictionEvent,
  market: Market
): MarketMovement {
  const { chance } = getMarketPricing(market);
  const pricing = market.pricing;
  const seed = hashString(market.marketId);

  const volumeFromMarket = pricing?.volume ?? 0;
  const volumeFromEvent = event.volumeUsd
    ? toRawUsd(event.volumeUsd)
    : 0;
  const volumeTotal = volumeFromMarket > 0 ? volumeFromMarket : volumeFromEvent;

  const change24hPct = ((seed % 17) - 8) * 0.5;
  const change7dPct = ((seed % 23) - 11) * 0.4;

  return {
    chancePct: chance,
    change24hPct,
    change7dPct,
    volumeTotal: volumeTotal > 0 ? volumeTotal : null,
    volume24h: pricing?.volume24h ?? null,
    liquidity: pricing?.liquidityDollars ?? null,
    openInterest: pricing?.openInterest ?? null,
    activityCount: 12 + (seed % 48),
    change24hIsMock: true,
    change7dIsMock: true,
  };
}

export function buildMarketAiSummary(
  event: PredictionEvent,
  market: Market,
  movement: MarketMovement
): MarketAiSummary {
  const marketTitle = getMarketTitle(market, event);
  const category = event.category;
  const volLabel =
    movement.volumeTotal != null
      ? formatNumber(movement.volumeTotal)
      : "thin";

  const closeMs = market.closeTime ? market.closeTime * 1000 : null;
  const daysToClose =
    closeMs != null
      ? Math.max(0, Math.ceil((closeMs - Date.now()) / 86_400_000))
      : null;

  const horizon =
    daysToClose != null ? `${daysToClose}d to resolution` : "open-ended horizon";

  return {
    headline: `${marketTitle} — desk read`,
    bullCase: `YES at ${movement.chancePct}% with ${volLabel} book depth in ${category}; flow can accelerate if catalysts align before ${horizon}.`,
    bearCase: `Crowded side risk: a ${Math.abs(movement.change24hPct).toFixed(1)}pt-style 24h drift (mock) suggests repricing risk if liquidity thins or news reverses.`,
    keyCatalyst: `Resolution path tied to ${event.closeCondition?.slice(0, 120) ?? "event rules"} — watch headline risk and cross-market correlation.`,
    riskFactor: `Binary tail risk on ${marketTitle}; size for gap risk near close and verify rules for edge cases.`,
    generatedAt: new Date().toISOString(),
  };
}

export function getRelatedMarkets(
  event: PredictionEvent,
  currentMarketId: string,
  limit = 6
): RelatedMarketItem[] {
  return getRenderableMarkets(event)
    .filter((m) => m.marketId !== currentMarketId)
    .slice(0, limit)
    .map((m) => {
      const { chance } = getMarketPricing(m);
      return {
        marketId: m.marketId,
        eventId: event.eventId,
        title: getMarketTitle(m, event),
        chancePct: chance,
        href: buildMarketHref(m.marketId, event.eventId),
      };
    });
}
