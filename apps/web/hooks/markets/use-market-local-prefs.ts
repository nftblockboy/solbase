"use client";

import { useCallback, useEffect, useState } from "react";
import { buildMarketKey } from "@/lib/mock/market-intelligence";

const WATCHLIST_KEY = "solbase:market-watchlist";
const ALERTS_KEY = "solbase:market-alerts";

export type MarketAlert = {
  id: string;
  marketKey: string;
  marketTitle: string;
  thresholdPct?: number;
  note?: string;
  createdAt: string;
};

function readWatchlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(WATCHLIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

function writeWatchlist(keys: string[]) {
  window.localStorage.setItem(WATCHLIST_KEY, JSON.stringify(keys));
}

function readAlerts(): MarketAlert[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ALERTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as MarketAlert[]) : [];
  } catch {
    return [];
  }
}

function writeAlerts(alerts: MarketAlert[]) {
  window.localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
}

export function useMarketLocalPrefs(eventId: string, marketId: string) {
  const marketKey = buildMarketKey(eventId, marketId);
  const [hydrated, setHydrated] = useState(false);
  const [watchlistKeys, setWatchlistKeys] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<MarketAlert[]>([]);

  useEffect(() => {
    setWatchlistKeys(readWatchlist());
    setAlerts(readAlerts());
    setHydrated(true);
  }, []);

  const isWatchlisted = watchlistKeys.includes(marketKey);

  const toggleWatchlist = useCallback(() => {
    setWatchlistKeys((prev) => {
      const next = prev.includes(marketKey)
        ? prev.filter((k) => k !== marketKey)
        : [...prev, marketKey];
      writeWatchlist(next);
      return next;
    });
  }, [marketKey]);

  const marketAlerts = alerts.filter((a) => a.marketKey === marketKey);

  const addAlert = useCallback(
    (input: { thresholdPct?: number; note?: string; marketTitle: string }) => {
      const entry: MarketAlert = {
        id: `${marketKey}-${Date.now()}`,
        marketKey,
        marketTitle: input.marketTitle,
        thresholdPct: input.thresholdPct,
        note: input.note,
        createdAt: new Date().toISOString(),
      };
      setAlerts((prev) => {
        const next = [entry, ...prev];
        writeAlerts(next);
        return next;
      });
    },
    [marketKey]
  );

  const removeAlert = useCallback(
    (alertId: string) => {
      setAlerts((prev) => {
        const next = prev.filter((a) => a.id !== alertId);
        writeAlerts(next);
        return next;
      });
    },
    []
  );

  return {
    hydrated,
    marketKey,
    isWatchlisted,
    toggleWatchlist,
    marketAlerts,
    addAlert,
    removeAlert,
  };
}
