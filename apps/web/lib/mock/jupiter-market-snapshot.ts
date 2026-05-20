/**
 * Curated Jupiter Prediction market IDs for mock social/portfolio links.
 * Snapshot: 2026-05-20 — verify against live browse if titles drift.
 * Unmapped slugs render as non-clickable "market unavailable" chips.
 */
export type JupiterMarketSnapshotEntry = {
  marketId: string;
  eventId: string;
};

export const JUPITER_MARKET_SNAPSHOT: Record<string, JupiterMarketSnapshotEntry> =
  {
    /** Fed Decision in July? */
    "fed-cut-jul26": {
      eventId: "POLY-287395",
      marketId: "POLY-1654958",
    },
    /** When will Bitcoin hit $150k? — Dec 31 2026 outcome */
    "btc-150k": {
      eventId: "POLY-36173",
      marketId: "POLY-573656",
    },
    /** Presidential Election Winner 2028 (politics proxy for Senate control mock) */
    "senate-2026": {
      eventId: "POLY-31552",
      marketId: "POLY-561229",
    },
    /** 2026 NBA Champion (sports proxy for UCL mock) */
    "ucl-2026-rm": {
      eventId: "POLY-27830",
      marketId: "POLY-553856",
    },
    /** Will OpenAI's valuation hit __ by December 31? */
    "openai-agi": {
      eventId: "POLY-500775",
      marketId: "POLY-2299991",
    },
    /** Fed Decision in June? */
    "fed-decision-june": {
      eventId: "POLY-101772",
      marketId: "POLY-906974",
    },
    /** 2026 FIFA World Cup Winner — France */
    "fifa-wc-2026": {
      eventId: "POLY-30615",
      marketId: "POLY-558936",
    },
    /** US x Iran permanent peace deal */
    "iran-peace-2026": {
      eventId: "POLY-357807",
      marketId: "POLY-2155052",
    },
  };
