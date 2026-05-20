export type PositionSide = "yes" | "no";

/** Canonical position shape for portfolio table and market detail panel. */
export type PositionRecord = {
  id: string;
  marketTitle: string;
  outcome: string;
  side: PositionSide;
  sizeUsd: number;
  avgPrice: number;
  markPrice: number;
  unrealizedPnlUsd: number;
  unrealizedPnlPct: number;
  exposurePct: number;
  /** Key into Jupiter market snapshot for live detail links */
  marketSlug?: string;
  marketId?: string;
  eventId?: string;
};

export type MarketPositionContextState =
  | { status: "disconnected" }
  | { status: "none" }
  | { status: "position"; position: PositionRecord };

export type TradeTicketSide = PositionSide;

export type TradeTicketDraft = {
  side: TradeTicketSide;
  marketTitle: string;
  marketId: string;
  eventId: string;
  impliedChancePct: number;
  yesCents: string;
  noCents: string;
};
