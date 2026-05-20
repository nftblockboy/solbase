import type { PositionRecord } from "@/lib/positions/types";

export type PortfolioSummary = {
  totalValueUsd: number;
  unrealizedPnlUsd: number;
  realizedPnlUsd: number;
  winRate: number;
  openPositionsCount: number;
  largestExposureUsd: number;
  largestExposureLabel: string;
  riskScore: number;
  updatedAt: string;
};

/** @deprecated Prefer `PositionRecord` from `@/lib/positions/types` */
export type PortfolioPosition = PositionRecord;

export type RecentTrade = {
  id: string;
  marketTitle: string;
  outcome: string;
  side: "yes" | "no";
  amountUsd: number;
  price: number;
  pnlUsd?: number;
  timestamp: number;
};

export type RiskExposure = {
  category: string;
  exposureUsd: number;
  exposurePct: number;
  positionCount: number;
};

export type AiInsightKind =
  | "high_conviction"
  | "concentration_risk"
  | "watchlist"
  | "sentiment";

export type AiPortfolioInsight = {
  id: string;
  kind: AiInsightKind;
  title: string;
  body: string;
  severity?: "info" | "warning" | "positive";
};

export type PnlHistoryPoint = {
  date: string;
  dailyPnlUsd: number;
  cumulativePnlUsd: number;
};

export type PortfolioMockData = {
  summary: PortfolioSummary;
  positions: PortfolioPosition[];
  recentTrades: RecentTrade[];
  riskExposures: RiskExposure[];
  aiInsights: AiPortfolioInsight[];
  pnlHistory: PnlHistoryPoint[];
};

const now = Date.now();

export const MOCK_PORTFOLIO: PortfolioMockData = {
  summary: {
    totalValueUsd: 24_850.42,
    unrealizedPnlUsd: 1_284.6,
    realizedPnlUsd: 3_412.18,
    winRate: 62.4,
    openPositionsCount: 7,
    largestExposureUsd: 6_200,
    largestExposureLabel: "US election — Yes",
    riskScore: 58,
    updatedAt: new Date(now).toISOString(),
  },
  positions: [
    {
      id: "pos-1",
      marketTitle: "Will the Fed cut rates before July 2026?",
      outcome: "Yes",
      side: "yes",
      sizeUsd: 4_200,
      avgPrice: 0.42,
      markPrice: 0.51,
      unrealizedPnlUsd: 900,
      unrealizedPnlPct: 21.4,
      exposurePct: 16.9,
      marketSlug: "fed-cut-jul26",
    },
    {
      id: "pos-2",
      marketTitle: "2026 US Senate control",
      outcome: "Republican majority",
      side: "yes",
      sizeUsd: 6_200,
      avgPrice: 0.38,
      markPrice: 0.44,
      unrealizedPnlUsd: 978.95,
      unrealizedPnlPct: 15.8,
      exposurePct: 24.9,
      marketSlug: "senate-2026",
    },
    {
      id: "pos-3",
      marketTitle: "Bitcoin above $150k by EOY 2026",
      outcome: "No",
      side: "no",
      sizeUsd: 3_100,
      avgPrice: 0.62,
      markPrice: 0.58,
      unrealizedPnlUsd: 200,
      unrealizedPnlPct: 6.5,
      exposurePct: 12.5,
      marketSlug: "btc-150k",
    },
    {
      id: "pos-4",
      marketTitle: "Champions League 2026 winner",
      outcome: "Real Madrid",
      side: "yes",
      sizeUsd: 2_400,
      avgPrice: 0.22,
      markPrice: 0.19,
      unrealizedPnlUsd: -327.27,
      unrealizedPnlPct: -13.6,
      exposurePct: 9.7,
      marketSlug: "ucl-2026-rm",
    },
    {
      id: "pos-5",
      marketTitle: "OpenAI ships AGI benchmark by 2027",
      outcome: "No",
      side: "no",
      sizeUsd: 1_850,
      avgPrice: 0.71,
      markPrice: 0.74,
      unrealizedPnlUsd: 78.17,
      unrealizedPnlPct: 4.2,
      exposurePct: 7.4,
      marketSlug: "openai-agi",
    },
    {
      id: "pos-6",
      marketTitle: "US CPI below 2.5% in Q2 2026",
      outcome: "Yes",
      side: "yes",
      sizeUsd: 3_800,
      avgPrice: 0.55,
      markPrice: 0.52,
      unrealizedPnlUsd: -207.27,
      unrealizedPnlPct: -5.5,
      exposurePct: 15.3,
      marketSlug: "cpi-q2-26",
    },
    {
      id: "pos-7",
      marketTitle: "TikTok US ban upheld in 2026",
      outcome: "Yes",
      side: "yes",
      sizeUsd: 3_300,
      avgPrice: 0.48,
      markPrice: 0.49,
      unrealizedPnlUsd: 68.75,
      unrealizedPnlPct: 2.1,
      exposurePct: 13.3,
      marketSlug: "tiktok-ban",
    },
  ],
  recentTrades: [
    {
      id: "tr-1",
      marketTitle: "Fed cut before July 2026",
      outcome: "Yes",
      side: "yes",
      amountUsd: 1_200,
      price: 0.49,
      timestamp: now - 3_600_000,
    },
    {
      id: "tr-2",
      marketTitle: "US Senate 2026",
      outcome: "Republican majority",
      side: "yes",
      amountUsd: 2_000,
      price: 0.41,
      pnlUsd: 340,
      timestamp: now - 7_200_000,
    },
    {
      id: "tr-3",
      marketTitle: "BTC above $150k EOY 2026",
      outcome: "No",
      side: "no",
      amountUsd: 800,
      price: 0.6,
      timestamp: now - 18_000_000,
    },
    {
      id: "tr-4",
      marketTitle: "Champions League 2026",
      outcome: "Real Madrid",
      side: "yes",
      amountUsd: 600,
      price: 0.21,
      pnlUsd: -120,
      timestamp: now - 86_400_000,
    },
    {
      id: "tr-5",
      marketTitle: "CPI below 2.5% Q2 2026",
      outcome: "Yes",
      side: "yes",
      amountUsd: 1_500,
      price: 0.54,
      timestamp: now - 172_800_000,
    },
    {
      id: "tr-6",
      marketTitle: "TikTok US ban 2026",
      outcome: "Yes",
      side: "yes",
      amountUsd: 950,
      price: 0.47,
      pnlUsd: 85,
      timestamp: now - 259_200_000,
    },
  ],
  riskExposures: [
    {
      category: "Politics",
      exposureUsd: 14_200,
      exposurePct: 57.1,
      positionCount: 3,
    },
    {
      category: "Macro",
      exposureUsd: 8_000,
      exposurePct: 32.2,
      positionCount: 2,
    },
    {
      category: "Crypto",
      exposureUsd: 3_100,
      exposurePct: 12.5,
      positionCount: 1,
    },
    {
      category: "Sports",
      exposureUsd: 2_400,
      exposurePct: 9.7,
      positionCount: 1,
    },
    {
      category: "Tech / AI",
      exposureUsd: 5_150,
      exposurePct: 20.7,
      positionCount: 2,
    },
  ],
  aiInsights: [
    {
      id: "ai-1",
      kind: "high_conviction",
      title: "High conviction exposure",
      body: "Your largest line is US Senate control (Yes) at $6.2k — 25% of portfolio. Fed rate-cut Yes is your second-largest macro thesis with strong mark-to-market gains (+21%).",
      severity: "info",
    },
    {
      id: "ai-2",
      kind: "concentration_risk",
      title: "Concentration risk",
      body: "57% of notional sits in Politics. Three positions share US electoral/macro narrative — a single surprise poll or CPI print could move multiple lines together.",
      severity: "warning",
    },
    {
      id: "ai-3",
      kind: "watchlist",
      title: "Suggested markets to watch",
      body: "Consider monitoring: (1) Fed dot-plot / FOMC markets for hedge vs your cut Yes, (2) House control 2026 for correlated election risk, (3) ETH ETF flow markets if you want crypto beta without adding BTC outright risk.",
      severity: "info",
    },
    {
      id: "ai-4",
      kind: "sentiment",
      title: "Portfolio sentiment",
      body: "Net bias: moderately bullish macro/politics (5 Yes vs 2 No). Sports and single-name tech positions are small hedges. Unrealized P&L positive — book leans risk-on with elevated political correlation.",
      severity: "positive",
    },
  ],
  pnlHistory: [
    { date: "Mon", dailyPnlUsd: 420, cumulativePnlUsd: 420 },
    { date: "Tue", dailyPnlUsd: -180, cumulativePnlUsd: 240 },
    { date: "Wed", dailyPnlUsd: 310, cumulativePnlUsd: 550 },
    { date: "Thu", dailyPnlUsd: 890, cumulativePnlUsd: 1_440 },
    { date: "Fri", dailyPnlUsd: -95, cumulativePnlUsd: 1_345 },
    { date: "Sat", dailyPnlUsd: 220, cumulativePnlUsd: 1_565 },
    { date: "Sun", dailyPnlUsd: 131.6, cumulativePnlUsd: 1_696.6 },
  ],
};

export function getMockPortfolio(): PortfolioMockData {
  return MOCK_PORTFOLIO;
}
