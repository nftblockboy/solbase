import type { Market, PredictionEvent } from "./api";
import { formatSubcategoryLabel } from "./category-sidebar-config";

export function getEventTitle(event: PredictionEvent): string {
  return event.metadata?.title ?? "Untitled event";
}

function firstNonEmpty(...values: (string | undefined | null)[]): string | undefined {
  for (const v of values) {
    const trimmed = v?.trim();
    if (trimmed) return trimmed;
  }
  return undefined;
}

export function getMarketTitle(market: Market, event?: PredictionEvent): string {
  const fromApi = firstNonEmpty(
    market.title,
    market.metadata?.title,
    market.metadata?.subtitle,
    market.team ?? undefined,
    market.sportsLine
      ? `${market.sportsMarketType ?? "Line"} ${market.sportsLine}`
      : undefined
  );
  if (fromApi) return fromApi;

  const rules = market.rulesPrimary ?? market.metadata?.rulesPrimary;
  if (rules) {
    const quoted = rules.match(/["“]([^"”]+)["”]/);
    if (quoted?.[1] && quoted[1].length < 80) return quoted[1];
  }

  if (event?.subcategory) {
    return formatSubcategoryLabel(event.subcategory);
  }

  return market.marketId?.slice(0, 12) ?? "Outcome";
}

/** Markets the UI can render without throwing. */
export function getRenderableMarkets(event: PredictionEvent): Market[] {
  return (event.markets ?? []).filter(
    (market) => Boolean(market.marketId) && market.pricing != null
  );
}

export function isMultiOutcomeEvent(event: PredictionEvent): boolean {
  return getRenderableMarkets(event).length > 1;
}

export function findMarketInEvent(
  event: PredictionEvent,
  marketId: string
): Market | undefined {
  return getRenderableMarkets(event).find((m) => m.marketId === marketId);
}
