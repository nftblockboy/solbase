import {
  getLeaderboardRows,
  MOCK_TRADERS,
  type LeaderboardCategory,
  type LeaderboardMetric,
  type TraderBadge,
  type TraderProfile,
} from "@/lib/mock/leaderboard";

export type TraderStatSummary = {
  roiPct: number;
  pnlUsd: number;
  winRate: number;
  volumeUsd: number;
  followers: number;
  riskScore: number;
};

export type TraderPrediction = {
  id: string;
  marketTitle: string;
  outcome: string;
  side: "yes" | "no";
  amountUsd: number;
  pnlUsd: number;
  timestamp: number;
};

export type TraderOpenPosition = {
  id: string;
  marketTitle: string;
  outcome: string;
  side: "yes" | "no";
  sizeUsd: number;
  markPrice: number;
  unrealizedPnlUsd: number;
  marketId?: string;
};

export type TraderReputationBadge = {
  id: string;
  label: string;
  description?: string;
  tier?: "bronze" | "silver" | "gold";
};

export type TraderAiSummary = {
  headline: string;
  body: string;
  bullets: string[];
  generatedAt: string;
};

export type TraderProfileDetails = {
  id: string;
  displayName: string;
  walletAddress: string;
  initials: string;
  avatarColor?: string;
  badges: TraderBadge[];
  activeCategories: LeaderboardCategory[];
  bio: string;
  tradingStyle: string;
  topCategories: LeaderboardCategory[];
  stats: TraderStatSummary;
  recentPredictions: TraderPrediction[];
  openPositions: TraderOpenPosition[];
  reputationBadges: TraderReputationBadge[];
  aiSummary: TraderAiSummary;
  leaderboardRank?: number;
};

export const OWN_PROFILE_ID = "viewer";
export const OWN_PROFILE_WALLET =
  "So1baseViewer11111111111111111111111111111111";

const DEFAULT_WINDOW = "7d" as const;
const DEFAULT_CATEGORY = "all" as const;

const MARKET_TITLES: Record<LeaderboardCategory, string[]> = {
  all: ["Fed rate cut by June?", "BTC above $100k EOY?"],
  crypto: ["ETH ETF inflows beat BTC?", "SOL flips BNB market cap?"],
  sports: ["Chiefs win Super Bowl?", "Real Madrid UCL winner?"],
  politics: ["US Senate flips in 2026?", "UK snap election called?"],
  macro: ["CPI below 2.5% next print?", "Unemployment above 4.5%?"],
  culture: ["Oscar Best Picture upset?", "Taylor album #1 week?"],
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function normalizeWallet(input: string): string {
  return input.trim().toLowerCase();
}

export function traderPath(walletAddress: string): string {
  return `/trader/${encodeURIComponent(walletAddress)}`;
}

/** @deprecated Use traderPath */
export const traderProfilePath = traderPath;

function resolveDefaultMetrics(trader: TraderProfile): LeaderboardMetric | null {
  const exact = trader.performances.find(
    (p) => p.window === DEFAULT_WINDOW && p.category === DEFAULT_CATEGORY
  );
  if (exact) return exact.metrics;

  const fallback = trader.performances.find(
    (p) => p.window === DEFAULT_WINDOW && p.category === "all"
  );
  return fallback?.metrics ?? null;
}

function toStatSummary(metrics: LeaderboardMetric): TraderStatSummary {
  return {
    roiPct: metrics.roiPct,
    pnlUsd: metrics.pnlUsd,
    winRate: metrics.winRate,
    volumeUsd: metrics.volumeUsd,
    followers: metrics.followers,
    riskScore: metrics.riskScore,
  };
}

function getLeaderboardRank(traderId: string): number | undefined {
  const rows = getLeaderboardRows({
    window: DEFAULT_WINDOW,
    category: DEFAULT_CATEGORY,
    sortKey: "roi",
  });
  const row = rows.find((r) => r.id === traderId);
  return row?.rank;
}

function pickCategories(trader: TraderProfile): LeaderboardCategory[] {
  return trader.activeCategories.filter((c) => c !== "all").slice(0, 3);
}

function buildPredictions(
  traderId: string,
  categories: LeaderboardCategory[]
): TraderPrediction[] {
  const now = Date.now();
  const cats =
    categories.length > 0 ? categories : (["crypto"] as LeaderboardCategory[]);
  const out: TraderPrediction[] = [];

  for (let i = 0; i < 5; i++) {
    const cat = cats[i % cats.length]!;
    const titles = MARKET_TITLES[cat];
    const seed = hash(`${traderId}-pred-${i}`);
    const side: "yes" | "no" = seed % 2 === 0 ? "yes" : "no";
    const amount = 400 + (seed % 40) * 120;
    const pnl = (seed % 7) - 2 === 0 ? -amount * 0.35 : amount * (0.15 + (seed % 10) * 0.04);

    out.push({
      id: `${traderId}-pred-${i}`,
      marketTitle: titles[seed % titles.length]!,
      outcome: side === "yes" ? "Yes" : "No",
      side,
      amountUsd: amount,
      pnlUsd: Math.round(pnl),
      timestamp: now - (i + 1) * 86_400_000 * (1 + (seed % 3)),
    });
  }

  return out;
}

function buildOpenPositions(
  traderId: string,
  categories: LeaderboardCategory[]
): TraderOpenPosition[] {
  const cats =
    categories.length > 0 ? categories : (["macro"] as LeaderboardCategory[]);
  const out: TraderOpenPosition[] = [];

  for (let i = 0; i < 3; i++) {
    const cat = cats[i % cats.length]!;
    const titles = MARKET_TITLES[cat];
    const seed = hash(`${traderId}-pos-${i}`);
    const side: "yes" | "no" = seed % 3 === 0 ? "no" : "yes";
    const size = 800 + (seed % 20) * 200;
    const mark = 0.42 + (seed % 15) * 0.03;
    const entry = mark - 0.08 + (seed % 5) * 0.02;
    const unrealized = Math.round(size * (mark - entry));

    out.push({
      id: `${traderId}-pos-${i}`,
      marketTitle: titles[(seed + 1) % titles.length]!,
      outcome: side === "yes" ? "Yes" : "No",
      side,
      sizeUsd: size,
      markPrice: mark,
      unrealizedPnlUsd: unrealized,
      marketId: `mock-${traderId}-${i}`,
    });
  }

  return out;
}

type ProfileExtension = {
  bio: string;
  tradingStyle: string;
  reputationBadges: TraderReputationBadge[];
  aiSummary: TraderAiSummary;
};

function buildExtension(trader: TraderProfile): ProfileExtension {
  const cats = pickCategories(trader);
  const catLabel =
    cats.length > 0 ? cats.join(", ") : "multi-category prediction markets";
  const seed = hash(trader.id);

  const styles = [
    "Event-driven with tight sizing on macro catalysts.",
    "Contrarian at extremes; scales in on liquidity spikes.",
    "Systematic category rotation with capped single-market risk.",
    "Momentum on resolved narratives; quick exits on thesis breaks.",
  ];

  return {
    bio: `${trader.displayName} focuses on ${catLabel}. Public track record is simulated for the Solbase MVP — rankings sync with leaderboard mock data.`,
    tradingStyle: styles[seed % styles.length]!,
    reputationBadges: [
      {
        id: `${trader.id}-rep-1`,
        label: "Verified PnL",
        description: "Mock attestation of historical performance window.",
        tier: seed % 3 === 0 ? "gold" : "silver",
      },
      {
        id: `${trader.id}-rep-2`,
        label: "Consistent Streak",
        description: "Positive weeks in the selected 7d window.",
        tier: "bronze",
      },
      ...(trader.featured
        ? [
            {
              id: `${trader.id}-rep-3`,
              label: "Featured Trader",
              description: "Highlighted on the Solbase leaderboard.",
              tier: "gold" as const,
            },
          ]
        : []),
    ],
    aiSummary: {
      headline: `${trader.displayName}: ${cats[0] ?? "cross-market"} bias with controlled risk`,
      body: `Mock AI summary for ${trader.displayName}. The model highlights category concentration, recent win rate, and open exposure — not financial advice.`,
      bullets: [
        `Top verticals: ${catLabel}.`,
        `Risk score ${resolveDefaultMetrics(trader)?.riskScore ?? 50}/100 vs cohort median.`,
        "Watch for oversized single-event exposure before copying size.",
      ],
      generatedAt: new Date().toISOString(),
    },
  };
}

function mergeTraderProfile(trader: TraderProfile): TraderProfileDetails | null {
  const metrics = resolveDefaultMetrics(trader);
  if (!metrics) return null;

  const ext = buildExtension(trader);
  const topCategories = pickCategories(trader);

  return {
    id: trader.id,
    displayName: trader.displayName,
    walletAddress: trader.walletAddress,
    initials: trader.initials,
    avatarColor: trader.avatarColor,
    badges: trader.badges,
    activeCategories: trader.activeCategories,
    bio: ext.bio,
    tradingStyle: ext.tradingStyle,
    topCategories,
    stats: toStatSummary(metrics),
    recentPredictions: buildPredictions(trader.id, topCategories),
    openPositions: buildOpenPositions(trader.id, topCategories),
    reputationBadges: ext.reputationBadges,
    aiSummary: ext.aiSummary,
    leaderboardRank: getLeaderboardRank(trader.id),
  };
}

const WALLET_INDEX = new Map<string, TraderProfile>(
  MOCK_TRADERS.map((t) => [normalizeWallet(t.walletAddress), t])
);

export function getTraderProfileByWallet(wallet: string): TraderProfileDetails | null {
  const trader = WALLET_INDEX.get(normalizeWallet(wallet));
  if (!trader) return null;
  return mergeTraderProfile(trader);
}

const MOCK_OWN_BASE: TraderProfileDetails = {
  id: OWN_PROFILE_ID,
  displayName: "You",
  walletAddress: OWN_PROFILE_WALLET,
  initials: "YO",
  avatarColor: "#7C3AED",
  badges: [{ id: "own-b1", label: "Early Adopter", variant: "accent" }],
  activeCategories: ["all", "crypto", "macro", "politics"],
  bio: "Your public Solbase trading profile. Connect a wallet to display your address; performance below is mock data for product preview.",
  tradingStyle:
    "Balanced macro and crypto exposure with medium hold times on high-conviction events.",
  topCategories: ["crypto", "macro", "politics"],
  stats: {
    roiPct: 34.6,
    pnlUsd: 12_450,
    winRate: 63,
    volumeUsd: 186_000,
    followers: 128,
    riskScore: 44,
  },
  recentPredictions: buildPredictions(OWN_PROFILE_ID, ["crypto", "macro"]),
  openPositions: buildOpenPositions(OWN_PROFILE_ID, ["crypto", "politics"]),
  reputationBadges: [
    {
      id: "own-rep-1",
      label: "Profile Activated",
      description: "Mock reputation surface enabled on Solbase.",
      tier: "silver",
    },
    {
      id: "own-rep-2",
      label: "Community Member",
      description: "Joined during MVP preview.",
      tier: "bronze",
    },
  ],
  aiSummary: {
    headline: "Your profile: diversified mock book with moderate risk",
    body: "Mock AI read on your trading persona. Replace with live indexer output when wallet history is available.",
    bullets: [
      "Crypto and macro dominate recent mock activity.",
      "Open positions are sized below leaderboard whales.",
      "Enable notifications when follow graph ships.",
    ],
    generatedAt: new Date().toISOString(),
  },
};

export function getOwnProfile(connectedAddress?: string): TraderProfileDetails {
  if (!connectedAddress) return { ...MOCK_OWN_BASE };

  return {
    ...MOCK_OWN_BASE,
    walletAddress: connectedAddress,
  };
}
