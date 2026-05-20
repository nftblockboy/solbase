import { JUPITER_MARKET_SNAPSHOT } from "@/lib/mock/jupiter-market-snapshot";

export type MarketLinkRef = Readonly<{
  slug?: string;
  marketId?: string;
  eventId?: string;
  title: string;
  outcome?: string;
}>;

export function buildMarketHref(marketId: string, eventId: string): string {
  return `/markets/market/${marketId}?event=${encodeURIComponent(eventId)}`;
}

/**
 * Resolve a mock market reference to a live Jupiter detail URL, or null if unavailable.
 */
export function resolveMarketLink(ref: MarketLinkRef): string | null {
  if (ref.slug) {
    const entry = JUPITER_MARKET_SNAPSHOT[ref.slug];
    if (entry) {
      return buildMarketHref(entry.marketId, entry.eventId);
    }
  }

  if (ref.marketId && ref.eventId) {
    const entry = Object.values(JUPITER_MARKET_SNAPSHOT).find(
      (e) => e.marketId === ref.marketId && e.eventId === ref.eventId
    );
    if (entry) {
      return buildMarketHref(entry.marketId, entry.eventId);
    }
  }

  return null;
}

export const MARKET_UNAVAILABLE_TITLE =
  "Market unavailable in the live feed";

/** Inverse lookup: Jupiter ids → mock slug used in portfolio/community. */
export function findSnapshotSlug(
  marketId: string,
  eventId: string
): string | undefined {
  for (const [slug, entry] of Object.entries(JUPITER_MARKET_SNAPSHOT)) {
    if (entry.marketId === marketId && entry.eventId === eventId) {
      return slug;
    }
  }
  return undefined;
}
