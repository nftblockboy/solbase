import { MOCK_TRADERS, type LeaderboardCategory } from "@/lib/mock/leaderboard";
import type { TraderBadge } from "@/lib/mock/leaderboard";

export type CommunityCategoryFilter =
  | "all"
  | "crypto"
  | "sports"
  | "politics"
  | "macro"
  | "culture"
  | "following";

export type CommunityReactionKind = "bullish" | "bearish" | "insight" | "fire";

export type CommunityReaction = {
  kind: CommunityReactionKind;
  count: number;
};

export type CommunityAuthor = {
  id: string;
  displayName: string;
  walletAddress: string;
  initials: string;
  avatarColor?: string;
  traderBadge?: TraderBadge;
  isFollowedSeed?: boolean;
};

export type CommunityTopic = {
  id: string;
  label: string;
  category: LeaderboardCategory;
};

export type CommunityMarketRef = {
  /** Key into {@link JUPITER_MARKET_SNAPSHOT} for live detail links */
  slug: string;
  title: string;
  outcome?: string;
};

export type CommunityPost = {
  id: string;
  author: CommunityAuthor;
  topic: CommunityTopic;
  category: LeaderboardCategory;
  body: string;
  timestamp: number;
  reactions: CommunityReaction[];
  replyCount: number;
  marketRef?: CommunityMarketRef;
};

export type TrendingDiscussion = {
  id: string;
  title: string;
  category: LeaderboardCategory;
  postCount: number;
  lastActivityAt: number;
  marketRef?: CommunityMarketRef;
};

export type MarketDiscussionThread = {
  id: string;
  marketTitle: string;
  slug: string;
  replyCount: number;
  heatScore: number;
  category: LeaderboardCategory;
};

export type CommunityContributor = {
  rank: number;
  author: CommunityAuthor;
  postCount: number;
  reputationNote: string;
};

export const COMMUNITY_CATEGORY_FILTERS: {
  id: CommunityCategoryFilter;
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "crypto", label: "Crypto" },
  { id: "sports", label: "Sports" },
  { id: "politics", label: "Politics" },
  { id: "macro", label: "Macro" },
  { id: "culture", label: "Culture" },
  { id: "following", label: "Following" },
];

const now = Date.now();
const HOUR = 3_600_000;

function traderToAuthor(
  traderId: string,
  opts?: { isFollowedSeed?: boolean }
): CommunityAuthor {
  const t = MOCK_TRADERS.find((x) => x.id === traderId);
  if (!t) {
    return {
      id: traderId,
      displayName: "Anon Trader",
      walletAddress: "unknown",
      initials: "AT",
      avatarColor: "#7C3AED",
    };
  }
  return {
    id: t.id,
    displayName: t.displayName,
    walletAddress: t.walletAddress,
    initials: t.initials,
    avatarColor: t.avatarColor,
    traderBadge: t.badges[0],
    isFollowedSeed: opts?.isFollowedSeed,
  };
}

function topic(id: string, label: string, category: LeaderboardCategory): CommunityTopic {
  return { id, label, category };
}

function reactions(
  bullish: number,
  bearish: number,
  insight: number,
  fire: number
): CommunityReaction[] {
  return [
    { kind: "bullish", count: bullish },
    { kind: "bearish", count: bearish },
    { kind: "insight", count: insight },
    { kind: "fire", count: fire },
  ];
}

const MOCK_POSTS: CommunityPost[] = [
  {
    id: "p1",
    author: traderToAuthor("t1", { isFollowedSeed: true }),
    topic: topic("t-macro", "Rates", "macro"),
    category: "macro",
    body: "Fed cut pricing still too aggressive for June. I'm adding NO exposure into CPI — desk flow agrees.",
    timestamp: now - 2 * HOUR,
    reactions: reactions(42, 8, 19, 5),
    replyCount: 24,
    marketRef: {
      slug: "fed-cut-jul26",
      title: "Fed cut before July 2026",
      outcome: "No",
    },
  },
  {
    id: "p2",
    author: traderToAuthor("t2", { isFollowedSeed: true }),
    topic: topic("t-pol", "Elections", "politics"),
    category: "politics",
    body: "Senate odds moved 3pts on a single poll. Fade the move unless you see cross-tabs confirming independents.",
    timestamp: now - 4 * HOUR,
    reactions: reactions(28, 12, 31, 2),
    replyCount: 18,
    marketRef: {
      slug: "senate-2026",
      title: "2026 US Senate control",
    },
  },
  {
    id: "p3",
    author: traderToAuthor("t4"),
    topic: topic("t-crypto", "BTC", "crypto"),
    category: "crypto",
    body: "150k by EOY is a narrative trade, not a flows trade. Spot ETF inflows matter more than CT threads this week.",
    timestamp: now - 5 * HOUR,
    reactions: reactions(55, 22, 14, 9),
    replyCount: 41,
    marketRef: {
      slug: "btc-150k",
      title: "Bitcoin above $150k by EOY 2026",
    },
  },
  {
    id: "p4",
    author: traderToAuthor("t3", { isFollowedSeed: true }),
    topic: topic("t-sports", "UCL", "sports"),
    category: "sports",
    body: "Real Madrid UCL YES still mispriced vs injury news. Small size — variance is brutal in knockout legs.",
    timestamp: now - 7 * HOUR,
    reactions: reactions(19, 4, 8, 3),
    replyCount: 12,
    marketRef: {
      slug: "ucl-2026-rm",
      title: "Champions League 2026 winner",
      outcome: "Real Madrid",
    },
  },
  {
    id: "p5",
    author: traderToAuthor("t7"),
    topic: topic("t-macro2", "CPI", "macro"),
    category: "macro",
    body: "Core services sticky → CPI YES below 2.5% looks rich. Watching shelter lag for the next print.",
    timestamp: now - 9 * HOUR,
    reactions: reactions(33, 6, 27, 1),
    replyCount: 15,
    marketRef: {
      slug: "cpi-q2-26",
      title: "US CPI below 2.5% in Q2 2026",
    },
  },
  {
    id: "p6",
    author: traderToAuthor("t11"),
    topic: topic("t-pol2", "Polls", "politics"),
    category: "politics",
    body: "Cross-tabs from the weekend poll are out — lean R+1 in the toss-ups. Not updating full book yet.",
    timestamp: now - 11 * HOUR,
    reactions: reactions(14, 9, 22, 0),
    replyCount: 9,
  },
  {
    id: "p7",
    author: traderToAuthor("t13", { isFollowedSeed: true }),
    topic: topic("t-meme", "Meme", "culture"),
    category: "culture",
    body: "Oscar upset market is pure liquidity farming. Fun for 0.5% of bankroll, not a thesis.",
    timestamp: now - 13 * HOUR,
    reactions: reactions(8, 2, 5, 18),
    replyCount: 33,
  },
  {
    id: "p8",
    author: traderToAuthor("t12"),
    topic: topic("t-eth", "ETH", "crypto"),
    category: "crypto",
    body: "ETH/BTC ratio bounce + ETF narrative = crowded long. I'm flat until we clear last week's high.",
    timestamp: now - 16 * HOUR,
    reactions: reactions(21, 15, 11, 4),
    replyCount: 7,
  },
  {
    id: "p9",
    author: traderToAuthor("t8"),
    topic: topic("t-degen", "High risk", "crypto"),
    category: "crypto",
    body: "Alts ripping on thin books. Size down or get sized out — slippage on Jupiter prediction books is real.",
    timestamp: now - 20 * HOUR,
    reactions: reactions(12, 18, 3, 7),
    replyCount: 21,
  },
  {
    id: "p10",
    author: traderToAuthor("t9", { isFollowedSeed: true }),
    topic: topic("t-lowrisk", "Risk-off", "macro"),
    category: "macro",
    body: "Keeping book balanced: 60% macro, 40% politics. No single-market >8% NAV — sleep > hero trades.",
    timestamp: now - 24 * HOUR,
    reactions: reactions(38, 1, 45, 2),
    replyCount: 6,
  },
  {
    id: "p11",
    author: traderToAuthor("t10"),
    topic: topic("t-nfl", "NFL", "sports"),
    category: "sports",
    body: "Super Bowl YES on Chiefs drifted without injury report confirmation. Wait for practice window.",
    timestamp: now - 28 * HOUR,
    reactions: reactions(9, 5, 6, 1),
    replyCount: 11,
  },
  {
    id: "p12",
    author: traderToAuthor("t14"),
    topic: topic("t-global", "FX", "macro"),
    category: "macro",
    body: "DXY and rates markets disagree with prediction books on cut path. Arb is messy but watch both.",
    timestamp: now - 32 * HOUR,
    reactions: reactions(17, 7, 29, 0),
    replyCount: 8,
  },
  {
    id: "p13",
    author: traderToAuthor("t6"),
    topic: topic("t-pop", "Pop culture", "culture"),
    category: "culture",
    body: "Taylor #1 week market: streaming data lag means late sellers get punished. Early info edge only.",
    timestamp: now - 36 * HOUR,
    reactions: reactions(6, 3, 4, 12),
    replyCount: 19,
  },
  {
    id: "p14",
    author: traderToAuthor("t5"),
    topic: topic("t-vote", "Ballots", "politics"),
    category: "politics",
    body: "UK snap election chatter is noise until whips confirm numbers. No position.",
    timestamp: now - 40 * HOUR,
    reactions: reactions(5, 4, 12, 0),
    replyCount: 4,
  },
  {
    id: "p15",
    author: traderToAuthor("t15"),
    topic: topic("t-tennis", "Tennis", "sports"),
    category: "sports",
    body: "Clay season variance is huge — fading any >70c favorite without surface-specific form.",
    timestamp: now - 44 * HOUR,
    reactions: reactions(7, 2, 9, 1),
    replyCount: 5,
  },
  {
    id: "p16",
    author: traderToAuthor("t16"),
    topic: topic("t-policy", "Policy", "politics"),
    category: "politics",
    body: "Budget reconciliation timeline matters more than headline tweets for these markets.",
    timestamp: now - 48 * HOUR,
    reactions: reactions(11, 6, 18, 0),
    replyCount: 10,
  },
  {
    id: "p17",
    author: traderToAuthor("t17"),
    topic: topic("t-alts", "Alts", "crypto"),
    category: "crypto",
    body: "SOL ecosystem catalysts priced in after the conference. Taking profit on YES legs.",
    timestamp: now - 52 * HOUR,
    reactions: reactions(24, 9, 8, 6),
    replyCount: 14,
  },
  {
    id: "p18",
    author: traderToAuthor("t18"),
    topic: topic("t-box", "Box office", "culture"),
    category: "culture",
    body: "Opening weekend tracking vs market implied — small edge on under if previews soft.",
    timestamp: now - 56 * HOUR,
    reactions: reactions(4, 1, 7, 2),
    replyCount: 3,
  },
  {
    id: "p19",
    author: traderToAuthor("t1"),
    topic: topic("t-ai", "AI", "culture"),
    category: "culture",
    body: "AGI benchmark market is a long-dated vol play. Treat as optionality, not conviction.",
    timestamp: now - 60 * HOUR,
    reactions: reactions(15, 11, 33, 4),
    replyCount: 27,
    marketRef: {
      slug: "openai-agi",
      title: "OpenAI ships AGI benchmark by 2027",
    },
  },
  {
    id: "p20",
    author: traderToAuthor("t2"),
    topic: topic("t-tech", "Tech policy", "culture"),
    category: "culture",
    body: "TikTok ban YES holding bid — legal calendar is the only signal that matters this month.",
    timestamp: now - 64 * HOUR,
    reactions: reactions(10, 14, 16, 1),
    replyCount: 16,
    marketRef: {
      slug: "tiktok-ban",
      title: "TikTok US ban upheld in 2026",
    },
  },
];

const TRENDING: TrendingDiscussion[] = [
  {
    id: "tr1",
    title: "Fed cut before July — desk consensus?",
    category: "macro",
    postCount: 128,
    lastActivityAt: now - HOUR,
    marketRef: {
      slug: "fed-cut-jul26",
      title: "Fed cut before July 2026",
    },
  },
  {
    id: "tr2",
    title: "2026 Senate control: poll vs prediction gap",
    category: "politics",
    postCount: 94,
    lastActivityAt: now - 2 * HOUR,
    marketRef: {
      slug: "senate-2026",
      title: "2026 US Senate control",
    },
  },
  {
    id: "tr3",
    title: "BTC 150k EOY — flows or narrative?",
    category: "crypto",
    postCount: 211,
    lastActivityAt: now - 30 * 60_000,
    marketRef: {
      slug: "btc-150k",
      title: "Bitcoin above $150k by EOY 2026",
    },
  },
  {
    id: "tr4",
    title: "UCL knockout injury news thread",
    category: "sports",
    postCount: 67,
    lastActivityAt: now - 3 * HOUR,
  },
  {
    id: "tr5",
    title: "CPI Q2 print positioning",
    category: "macro",
    postCount: 52,
    lastActivityAt: now - 5 * HOUR,
    marketRef: {
      slug: "cpi-q2-26",
      title: "US CPI below 2.5% in Q2 2026",
    },
  },
  {
    id: "tr6",
    title: "TikTok ban legal timeline",
    category: "culture",
    postCount: 41,
    lastActivityAt: now - 6 * HOUR,
    marketRef: {
      slug: "tiktok-ban",
      title: "TikTok US ban upheld in 2026",
    },
  },
];

const MARKET_THREADS: MarketDiscussionThread[] = [
  {
    id: "mt1",
    marketTitle: "Fed cut before July 2026",
    slug: "fed-cut-jul26",
    replyCount: 342,
    heatScore: 98,
    category: "macro",
  },
  {
    id: "mt2",
    marketTitle: "2026 US Senate control",
    slug: "senate-2026",
    replyCount: 256,
    heatScore: 91,
    category: "politics",
  },
  {
    id: "mt3",
    marketTitle: "Bitcoin above $150k by EOY 2026",
    slug: "btc-150k",
    replyCount: 489,
    heatScore: 99,
    category: "crypto",
  },
  {
    id: "mt4",
    marketTitle: "Champions League 2026 winner",
    slug: "ucl-2026-rm",
    replyCount: 118,
    heatScore: 72,
    category: "sports",
  },
  {
    id: "mt5",
    marketTitle: "OpenAI AGI benchmark by 2027",
    slug: "openai-agi",
    replyCount: 203,
    heatScore: 85,
    category: "culture",
  },
];

const TOP_CONTRIBUTORS: CommunityContributor[] = [
  { rank: 1, author: traderToAuthor("t2"), postCount: 142, reputationNote: "Politics specialist · high reply rate" },
  { rank: 2, author: traderToAuthor("t1"), postCount: 128, reputationNote: "Macro maven · featured trader" },
  { rank: 3, author: traderToAuthor("t4"), postCount: 119, reputationNote: "Crypto flow reads" },
  { rank: 4, author: traderToAuthor("t9"), postCount: 98, reputationNote: "Consistent win rate" },
  { rank: 5, author: traderToAuthor("t3"), postCount: 87, reputationNote: "Sports edge UCL" },
  { rank: 6, author: traderToAuthor("t11"), postCount: 76, reputationNote: "Poll cross-tab analysis" },
  { rank: 7, author: traderToAuthor("t13"), postCount: 71, reputationNote: "Culture + meme markets" },
  { rank: 8, author: traderToAuthor("t7"), postCount: 64, reputationNote: "Rates desk commentary" },
];

function matchesCategory(
  post: CommunityPost,
  filter: CommunityCategoryFilter,
  followedAuthorIds: Set<string>
): boolean {
  if (filter === "all") return true;
  if (filter === "following") {
    return (
      post.author.isFollowedSeed === true || followedAuthorIds.has(post.author.id)
    );
  }
  return post.category === filter;
}

export function getCommunityPosts(
  filter: CommunityCategoryFilter,
  followedAuthorIds: Set<string> = new Set()
): CommunityPost[] {
  return MOCK_POSTS.filter((p) => matchesCategory(p, filter, followedAuthorIds)).sort(
    (a, b) => b.timestamp - a.timestamp
  );
}

export function getTrendingDiscussions(
  filter: CommunityCategoryFilter = "all"
): TrendingDiscussion[] {
  const list =
    filter === "all" || filter === "following"
      ? TRENDING
      : TRENDING.filter((t) => t.category === filter);
  return [...list].sort((a, b) => b.lastActivityAt - a.lastActivityAt);
}

export function getMarketThreads(): MarketDiscussionThread[] {
  return [...MARKET_THREADS].sort((a, b) => b.heatScore - a.heatScore);
}

export function getTopContributors(): CommunityContributor[] {
  return TOP_CONTRIBUTORS;
}

export function getMockCommunity() {
  return {
    posts: MOCK_POSTS,
    trending: TRENDING,
    marketThreads: MARKET_THREADS,
    contributors: TOP_CONTRIBUTORS,
  };
}

export function getBaseReactionCount(
  post: CommunityPost,
  kind: CommunityReactionKind
): number {
  return post.reactions.find((r) => r.kind === kind)?.count ?? 0;
}
