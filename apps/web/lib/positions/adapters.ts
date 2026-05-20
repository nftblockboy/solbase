import { findSnapshotSlug } from "@/lib/markets/market-link";
import type {
  MarketPositionContextState,
  PositionRecord,
  PositionSide,
} from "./types";

/**
 * Placeholder for Jupiter Prediction positions API response.
 * TODO: align fields with real API once documented — expected source:
 * `apps/web/lib/prediction/api.ts` → `getPositions(wallet)` (not implemented).
 */
export type JupiterPositionStub = {
  id: string;
  marketId: string;
  eventId: string;
  marketTitle: string;
  outcome: string;
  outcomeSide: PositionSide;
  sizeUsd: number;
  avgEntryPrice: number;
  markPrice: number;
  unrealizedPnlUsd: number;
  unrealizedPnlPct?: number;
  exposurePct?: number;
};

export type FindPositionForMarketInput = {
  marketId: string;
  eventId: string;
  marketTitle: string;
};

/** Normalize mock portfolio rows to canonical `PositionRecord`. */
export function mapMockPortfolioPosition(raw: PositionRecord): PositionRecord {
  return { ...raw };
}

/**
 * Map Jupiter position → portfolio UI record.
 * TODO: call from `usePortfolio` / position fetch after `getPositions(wallet)` exists.
 */
export function mapJupiterPositionToPortfolioPosition(
  jupiter: JupiterPositionStub
): PositionRecord {
  return {
    id: jupiter.id,
    marketTitle: jupiter.marketTitle,
    outcome: jupiter.outcome,
    side: jupiter.outcomeSide,
    sizeUsd: jupiter.sizeUsd,
    avgPrice: jupiter.avgEntryPrice,
    markPrice: jupiter.markPrice,
    unrealizedPnlUsd: jupiter.unrealizedPnlUsd,
    unrealizedPnlPct: jupiter.unrealizedPnlPct ?? 0,
    exposurePct: jupiter.exposurePct ?? 0,
    marketId: jupiter.marketId,
    eventId: jupiter.eventId,
    marketSlug: findSnapshotSlug(jupiter.marketId, jupiter.eventId),
  };
}

/**
 * Map a single Jupiter position to market-detail context.
 * TODO: use when market detail loads wallet positions from Jupiter.
 */
export function mapJupiterPositionToMarketPositionContext(
  jupiter: JupiterPositionStub
): MarketPositionContextState {
  return {
    status: "position",
    position: mapJupiterPositionToPortfolioPosition(jupiter),
  };
}

export function findPositionForMarket(
  positions: PositionRecord[],
  input: FindPositionForMarketInput
): PositionRecord | undefined {
  const { marketId, eventId, marketTitle } = input;
  const slug = findSnapshotSlug(marketId, eventId);
  if (slug) {
    const bySlug = positions.find((p) => p.marketSlug === slug);
    if (bySlug) return bySlug;
  }

  const titleLower = marketTitle.toLowerCase();
  return positions.find((p) => {
    const pTitle = p.marketTitle.toLowerCase();
    return (
      pTitle === titleLower ||
      pTitle.includes(titleLower) ||
      titleLower.includes(pTitle)
    );
  });
}
