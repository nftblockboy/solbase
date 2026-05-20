export type LeaderboardTimeWindow = "24h" | "7d" | "30d" | "all";
export type LeaderboardCategory =
  | "all"
  | "crypto"
  | "sports"
  | "politics"
  | "macro"
  | "culture";
export type LeaderboardSortKey =
  | "roi"
  | "pnl"
  | "winRate"
  | "volume"
  | "followers";

export type LeaderboardMetric = {
  roiPct: number;
  pnlUsd: number;
  winRate: number;
  volumeUsd: number;
  followers: number;
  riskScore: number;
};

export type TraderBadge = {
  id: string;
  label: string;
  variant?: "default" | "accent" | "warning";
};

export type TraderPerformanceWindow = {
  window: LeaderboardTimeWindow;
  category: LeaderboardCategory;
  metrics: LeaderboardMetric;
};

export type TraderProfile = {
  id: string;
  displayName: string;
  walletAddress: string;
  initials: string;
  avatarColor?: string;
  badges: TraderBadge[];
  featured?: boolean;
  activeCategories: LeaderboardCategory[];
  performances: TraderPerformanceWindow[];
};

export type LeaderboardRow = TraderProfile & {
  rank: number;
  metrics: LeaderboardMetric;
};

export type LeaderboardFilters = {
  window: LeaderboardTimeWindow;
  category: LeaderboardCategory;
  sortKey: LeaderboardSortKey;
};

export const TIME_WINDOWS: { id: LeaderboardTimeWindow; label: string }[] = [
  { id: "24h", label: "24H" },
  { id: "7d", label: "7D" },
  { id: "30d", label: "30D" },
  { id: "all", label: "All time" },
];

export const CATEGORIES: { id: LeaderboardCategory; label: string }[] = [
  { id: "all", label: "All categories" },
  { id: "crypto", label: "Crypto" },
  { id: "sports", label: "Sports" },
  { id: "politics", label: "Politics" },
  { id: "macro", label: "Macro" },
  { id: "culture", label: "Culture" },
];

export const SORT_OPTIONS: { id: LeaderboardSortKey; label: string }[] = [
  { id: "roi", label: "ROI" },
  { id: "pnl", label: "P&L" },
  { id: "winRate", label: "Win Rate" },
  { id: "volume", label: "Volume" },
  { id: "followers", label: "Followers" },
];

const WINDOWS: LeaderboardTimeWindow[] = ["24h", "7d", "30d", "all"];
const CATS: LeaderboardCategory[] = [
  "all",
  "crypto",
  "sports",
  "politics",
  "macro",
  "culture",
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function scaleMetrics(
  base: LeaderboardMetric,
  window: LeaderboardTimeWindow,
  category: LeaderboardCategory,
  seed: number
): LeaderboardMetric {
  const wMult =
    window === "24h" ? 0.35 : window === "7d" ? 1 : window === "30d" ? 2.2 : 4;
  const cMult = category === "all" ? 1 : 0.72 + (seed % 5) * 0.08;
  const jitter = 1 + ((seed % 11) - 5) * 0.02;
  return {
    roiPct: Math.round(base.roiPct * wMult * jitter * 10) / 10,
    pnlUsd: Math.round(base.pnlUsd * wMult * cMult * jitter),
    winRate: Math.min(98, Math.max(42, base.winRate + (seed % 7) - 3)),
    volumeUsd: Math.round(base.volumeUsd * wMult * cMult),
    followers: base.followers,
    riskScore: Math.min(99, Math.max(12, base.riskScore + (seed % 9) - 4)),
  };
}

function buildPerformances(
  traderId: string,
  base: LeaderboardMetric,
  activeCategories: LeaderboardCategory[]
): TraderPerformanceWindow[] {
  const out: TraderPerformanceWindow[] = [];
  for (const window of WINDOWS) {
    for (const category of CATS) {
      if (category !== "all" && !activeCategories.includes(category)) continue;
      const seed = hash(`${traderId}-${window}-${category}`);
      out.push({
        window,
        category,
        metrics: scaleMetrics(base, window, category, seed),
      });
    }
  }
  return out;
}

type TraderSeed = {
  id: string;
  displayName: string;
  walletAddress: string;
  initials: string;
  avatarColor: string;
  badges: TraderBadge[];
  featured?: boolean;
  activeCategories: LeaderboardCategory[];
  base: LeaderboardMetric;
};

const TRADER_SEEDS: TraderSeed[] = [
  {
    id: "t1",
    displayName: "MacroMaven",
    walletAddress: "7xKp9mN2vQwR4sT8uY1zA3bC5dE6fG7hJ8kL9mN0pQ",
    initials: "MM",
    avatarColor: "#7C3AED",
    featured: true,
    badges: [
      { id: "b1", label: "Hot Streak", variant: "accent" },
      { id: "b2", label: "Macro Specialist", variant: "default" },
    ],
    activeCategories: ["all", "macro", "politics"],
    base: {
      roiPct: 84.2,
      pnlUsd: 42_800,
      winRate: 71,
      volumeUsd: 520_000,
      followers: 12_400,
      riskScore: 52,
    },
  },
  {
    id: "t2",
    displayName: "PolyWhale",
    walletAddress: "9aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2wX3yZ4aB5cD",
    initials: "PW",
    avatarColor: "#6366F1",
    featured: true,
    badges: [{ id: "b3", label: "Whale", variant: "warning" }],
    activeCategories: ["all", "politics", "crypto"],
    base: {
      roiPct: 62.5,
      pnlUsd: 128_500,
      winRate: 64,
      volumeUsd: 2_100_000,
      followers: 28_900,
      riskScore: 68,
    },
  },
  {
    id: "t3",
    displayName: "SportsEdge",
    walletAddress: "3mN4oP5qR6sT7uV8wX9yZ0aB1cD2eF3gH4iJ5kL6mN7oP",
    initials: "SE",
    avatarColor: "#A78BFA",
    featured: true,
    badges: [{ id: "b4", label: "UCL Specialist", variant: "default" }],
    activeCategories: ["all", "sports"],
    base: {
      roiPct: 48.9,
      pnlUsd: 31_200,
      winRate: 68,
      volumeUsd: 890_000,
      followers: 9_800,
      riskScore: 44,
    },
  },
  {
    id: "t4",
    displayName: "CryptoOracle",
    walletAddress: "5qR6sT7uV8wX9yZ0aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT",
    initials: "CO",
    avatarColor: "#8B5CF6",
    badges: [{ id: "b5", label: "BTC Maxi", variant: "accent" }],
    activeCategories: ["all", "crypto"],
    base: {
      roiPct: 55.1,
      pnlUsd: 67_400,
      winRate: 59,
      volumeUsd: 1_450_000,
      followers: 18_200,
      riskScore: 61,
    },
  },
  {
    id: "t5",
    displayName: "VoteTracker",
    walletAddress: "1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2wX3yZ4aB",
    initials: "VT",
    avatarColor: "#6D28D9",
    badges: [],
    activeCategories: ["all", "politics"],
    base: {
      roiPct: 41.3,
      pnlUsd: 22_100,
      winRate: 66,
      volumeUsd: 410_000,
      followers: 5_600,
      riskScore: 38,
    },
  },
  {
    id: "t6",
    displayName: "CultureBets",
    walletAddress: "8wX9yZ0aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV1wX2y",
    initials: "CB",
    avatarColor: "#C4B5FD",
    badges: [{ id: "b6", label: "Pop Culture", variant: "default" }],
    activeCategories: ["all", "culture"],
    base: {
      roiPct: 36.7,
      pnlUsd: 14_800,
      winRate: 62,
      volumeUsd: 280_000,
      followers: 3_400,
      riskScore: 35,
    },
  },
  {
    id: "t7",
    displayName: "FedWatcher",
    walletAddress: "2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2wX3yZ4aB5cD6e",
    initials: "FW",
    avatarColor: "#5B21B6",
    badges: [{ id: "b7", label: "Rates", variant: "default" }],
    activeCategories: ["all", "macro"],
    base: {
      roiPct: 39.2,
      pnlUsd: 19_600,
      winRate: 63,
      volumeUsd: 350_000,
      followers: 4_100,
      riskScore: 41,
    },
  },
  {
    id: "t8",
    displayName: "DegenDuke",
    walletAddress: "4eF5gH6iJ7kL8mN9oP0qR1sT2uV3wX4yZ5aB6cD7eF8g",
    initials: "DD",
    avatarColor: "#7C3AED",
    badges: [{ id: "b8", label: "High Risk", variant: "warning" }],
    activeCategories: ["all", "crypto", "culture"],
    base: {
      roiPct: 92.4,
      pnlUsd: 8_200,
      winRate: 54,
      volumeUsd: 95_000,
      followers: 2_100,
      riskScore: 82,
    },
  },
  {
    id: "t9",
    displayName: "SteadyEddie",
    walletAddress: "6gH7iJ8kL9mN0oP1qR2sT3uV4wX5yZ6aB7cD8eF9gH0i",
    initials: "SE",
    avatarColor: "#4C1D95",
    badges: [{ id: "b9", label: "Low Risk", variant: "accent" }],
    activeCategories: ["all", "macro", "politics"],
    base: {
      roiPct: 22.1,
      pnlUsd: 11_400,
      winRate: 74,
      volumeUsd: 220_000,
      followers: 6_700,
      riskScore: 28,
    },
  },
  {
    id: "t10",
    displayName: "NFLProps",
    walletAddress: "0qR1sT2uV3wX4yZ5aB6cD7eF8gH9iJ0kL1mN2oP3qR4s",
    initials: "NP",
    avatarColor: "#8B5CF6",
    badges: [],
    activeCategories: ["all", "sports"],
    base: {
      roiPct: 33.8,
      pnlUsd: 9_800,
      winRate: 61,
      volumeUsd: 180_000,
      followers: 1_900,
      riskScore: 46,
    },
  },
  {
    id: "t11",
    displayName: "ElectionAlpha",
    walletAddress: "2sT3uV4wX5yZ6aB7cD8eF9gH0iJ1kL2mN3oP4qR5sT6u",
    initials: "EA",
    avatarColor: "#6D28D9",
    badges: [{ id: "b10", label: "Polls", variant: "default" }],
    activeCategories: ["all", "politics"],
    base: {
      roiPct: 28.4,
      pnlUsd: 16_200,
      winRate: 65,
      volumeUsd: 390_000,
      followers: 7_300,
      riskScore: 49,
    },
  },
  {
    id: "t12",
    displayName: "ETHFlow",
    walletAddress: "4wX5yZ6aB7cD8eF9gH0iJ1kL2mN3oP4qR5sT6uV7wX8y",
    initials: "EF",
    avatarColor: "#A78BFA",
    badges: [],
    activeCategories: ["all", "crypto"],
    base: {
      roiPct: 44.6,
      pnlUsd: 38_900,
      winRate: 57,
      volumeUsd: 760_000,
      followers: 11_500,
      riskScore: 58,
    },
  },
  {
    id: "t13",
    displayName: "MemeLord",
    walletAddress: "6aB7cD8eF9gH0iJ1kL2mN3oP4qR5sT6uV7wX8yZ9aB0c",
    initials: "ML",
    avatarColor: "#7C3AED",
    badges: [{ id: "b11", label: "Meme", variant: "accent" }],
    activeCategories: ["all", "culture", "crypto"],
    base: {
      roiPct: 71.2,
      pnlUsd: 5_400,
      winRate: 52,
      volumeUsd: 62_000,
      followers: 8_900,
      riskScore: 76,
    },
  },
  {
    id: "t14",
    displayName: "GlobalMacro",
    walletAddress: "8eF9gH0iJ1kL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2g",
    initials: "GM",
    avatarColor: "#5B21B6",
    badges: [],
    activeCategories: ["all", "macro"],
    base: {
      roiPct: 31.5,
      pnlUsd: 24_300,
      winRate: 67,
      volumeUsd: 480_000,
      followers: 5_200,
      riskScore: 43,
    },
  },
  {
    id: "t15",
    displayName: "TennisAce",
    walletAddress: "0iJ1kL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4k",
    initials: "TA",
    avatarColor: "#C4B5FD",
    badges: [],
    activeCategories: ["all", "sports"],
    base: {
      roiPct: 26.9,
      pnlUsd: 7_100,
      winRate: 60,
      volumeUsd: 140_000,
      followers: 1_200,
      riskScore: 40,
    },
  },
  {
    id: "t16",
    displayName: "PolicyWonka",
    walletAddress: "2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6o",
    initials: "PW",
    avatarColor: "#6366F1",
    badges: [],
    activeCategories: ["all", "politics", "macro"],
    base: {
      roiPct: 19.8,
      pnlUsd: 8_900,
      winRate: 69,
      volumeUsd: 210_000,
      followers: 2_800,
      riskScore: 32,
    },
  },
  {
    id: "t17",
    displayName: "AltSeason",
    walletAddress: "4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8s",
    initials: "AS",
    avatarColor: "#8B5CF6",
    badges: [{ id: "b12", label: "Alts", variant: "default" }],
    activeCategories: ["all", "crypto"],
    base: {
      roiPct: 58.3,
      pnlUsd: 21_700,
      winRate: 55,
      volumeUsd: 320_000,
      followers: 4_600,
      riskScore: 64,
    },
  },
  {
    id: "t18",
    displayName: "BoxOffice",
    walletAddress: "6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV0w",
    initials: "BO",
    avatarColor: "#6D28D9",
    badges: [],
    activeCategories: ["all", "culture"],
    base: {
      roiPct: 24.2,
      pnlUsd: 6_300,
      winRate: 58,
      volumeUsd: 98_000,
      followers: 980,
      riskScore: 37,
    },
  },
];

export const MOCK_TRADERS: TraderProfile[] = TRADER_SEEDS.map((seed) => ({
  id: seed.id,
  displayName: seed.displayName,
  walletAddress: seed.walletAddress,
  initials: seed.initials,
  avatarColor: seed.avatarColor,
  badges: seed.badges,
  featured: seed.featured,
  activeCategories: seed.activeCategories,
  performances: buildPerformances(seed.id, seed.base, seed.activeCategories),
}));

export const FEATURED_TRADER_IDS = MOCK_TRADERS.filter((t) => t.featured).map(
  (t) => t.id
);

function resolveMetrics(
  trader: TraderProfile,
  window: LeaderboardTimeWindow,
  category: LeaderboardCategory
): LeaderboardMetric | null {
  const exact = trader.performances.find(
    (p) => p.window === window && p.category === category
  );
  if (exact) return exact.metrics;

  if (category !== "all") {
    const fallback = trader.performances.find(
      (p) => p.window === window && p.category === "all"
    );
    if (fallback) return fallback.metrics;
    return null;
  }
  return null;
}

function sortValue(metrics: LeaderboardMetric, sortKey: LeaderboardSortKey): number {
  switch (sortKey) {
    case "roi":
      return metrics.roiPct;
    case "pnl":
      return metrics.pnlUsd;
    case "winRate":
      return metrics.winRate;
    case "volume":
      return metrics.volumeUsd;
    case "followers":
      return metrics.followers;
  }
}

export function getLeaderboardRows(filters: LeaderboardFilters): LeaderboardRow[] {
  const rows: LeaderboardRow[] = [];

  for (const trader of MOCK_TRADERS) {
    const metrics = resolveMetrics(trader, filters.window, filters.category);
    if (!metrics) continue;
    rows.push({ ...trader, metrics, rank: 0 });
  }

  rows.sort((a, b) => sortValue(b.metrics, filters.sortKey) - sortValue(a.metrics, filters.sortKey));

  return rows.map((row, index) => ({ ...row, rank: index + 1 }));
}

export function getMockLeaderboard(filters: LeaderboardFilters): LeaderboardRow[] {
  return getLeaderboardRows(filters);
}
