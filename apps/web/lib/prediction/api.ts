import { API_BASE_URL, API_KEY } from "./constants";

export interface EventMetadata {
  title: string;
  slug?: string;
  subtitle?: string;
  imageUrl?: string;
  isLive?: boolean;
  series?: string;
  eventId?: string;
  closeTime?: string;
}

export interface MarketMetadata {
  marketId?: string;
  eventId?: string;
  title: string;
  subtitle?: string;
  description?: string;
  closeTime?: number;
  openTime?: number;
  settlementTime?: number;
  isTeamMarket?: boolean;
  isTradable?: boolean;
  rulesPrimary?: string;
  rulesSecondary?: string;
  status?: string;
  result?: string;
}

export interface MarketPricing {
  buyYesPriceUsd: number | null;
  buyNoPriceUsd: number | null;
  sellYesPriceUsd: number | null;
  sellNoPriceUsd: number | null;
  volume: number;
  openInterest?: number;
  volume24h?: number;
  liquidityDollars?: number;
  notionalValueDollars?: number;
}

export interface Market {
  marketId: string;
  eventId?: string;
  provider?: string;
  status: "open" | "closed";
  result: "yes" | "no" | null;
  openTime: number;
  closeTime: number;
  resolveAt: number | null;
  /** Jupiter returns outcome label at market root (not only under metadata). */
  title?: string;
  imageUrl?: string;
  rulesPrimary?: string;
  rulesSecondary?: string;
  isTeamMarket?: boolean;
  team?: string | null;
  sportsMarketType?: string | null;
  sportsLine?: string | null;
  outcomes?: string[];
  metadata?: MarketMetadata;
  pricing?: MarketPricing;
}

export interface PredictionEvent {
  eventId: string;
  isActive: boolean;
  isLive?: boolean;
  isTrending?: boolean;
  isRecommended?: boolean;
  category: string;
  subcategory: string;
  series?: string;
  winner?: string;
  multipleWinners?: boolean;
  metadata?: EventMetadata;
  markets?: Market[];
  volumeUsd?: string;
  tvlDollars?: string;
  closeCondition?: string;
  beginAt: string | null;
  rulesPdf?: string;
}

export interface Trade {
  id: number;
  action: string;
  side: string;
  amountUsd: string;
  priceUsd: string;
  ownerPubkey: string;
  eventTitle: string;
  marketTitle: string;
  eventImageUrl?: string;
  eventId?: string;
  marketId?: string;
  message?: string;
  timestamp: number;
}

export interface EventsPaginatedResponse<T> {
  data: T[];
  pagination: { start: number; end: number; total: number; hasNext: boolean };
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(
      (error as { message?: string }).message || `API error: ${res.status}`
    );
  }

  return res.json() as Promise<T>;
}

async function apiFetchList<T>(
  path: string,
  options?: RequestInit
): Promise<T[]> {
  const result = await apiFetch<{ data: T[] } | T[]>(path, options);
  if (Array.isArray(result)) return result;
  if (result && typeof result === "object" && "data" in result) {
    return result.data;
  }
  return [];
}

function qs(params: Record<string, unknown>): string {
  const filtered = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== ""
  );
  if (filtered.length === 0) return "";
  return (
    "?" +
    new URLSearchParams(filtered.map(([k, v]) => [k, String(v)])).toString()
  );
}

async function apiFetchPaginated<T>(
  path: string,
  options?: RequestInit
): Promise<EventsPaginatedResponse<T>> {
  const result = await apiFetch<{
    data: T[];
    total?: number;
    start?: number;
    end?: number;
  }>(path, options);
  const data = Array.isArray(result) ? result : (result.data ?? []);
  const total = Array.isArray(result) ? data.length : (result.total ?? data.length);
  const start = Array.isArray(result) ? 0 : (result.start ?? 0);
  const end = Array.isArray(result) ? data.length : (result.end ?? start + data.length);
  return {
    data,
    pagination: { start, end, total, hasNext: end < total },
  };
}

export type EventsParams = {
  provider?: string;
  includeMarkets?: boolean;
  start?: number;
  end?: number;
  category?: string;
  subcategory?: string;
  sortBy?: string;
  sortDirection?: string;
  filter?: string;
};

export async function getEventsPaginated(params?: EventsParams) {
  return apiFetchPaginated<PredictionEvent>(
    `/events${qs((params ?? {}) as Record<string, unknown>)}`
  );
}

export async function getEvent(eventId: string, includeMarkets?: boolean) {
  return apiFetch<PredictionEvent>(
    `/events/${eventId}${qs({ includeMarkets })}`
  );
}

export async function searchEvents(
  query: string,
  params?: { provider?: string; limit?: number }
) {
  return apiFetchList<PredictionEvent>(
    `/events/search${qs({ query, ...params })}`
  );
}

export async function getTrades() {
  return apiFetchList<Trade>("/trades");
}
