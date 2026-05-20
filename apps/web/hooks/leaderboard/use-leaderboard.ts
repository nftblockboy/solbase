"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getLeaderboardRows,
  type LeaderboardCategory,
  type LeaderboardRow,
  type LeaderboardSortKey,
  type LeaderboardTimeWindow,
} from "@/lib/mock/leaderboard";

const LOAD_DELAY_MS = 300;

export function useLeaderboard() {
  const [timeWindow, setTimeWindow] = useState<LeaderboardTimeWindow>("7d");
  const [category, setCategory] = useState<LeaderboardCategory>("all");
  const [sortKey, setSortKey] = useState<LeaderboardSortKey>("roi");
  const [followedIds, setFollowedIds] = useState<Set<string>>(() => new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<LeaderboardRow[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const timer = globalThis.setTimeout(() => {
      setRows(getLeaderboardRows({ window: timeWindow, category, sortKey }));
      setIsLoading(false);
    }, LOAD_DELAY_MS);
    return () => globalThis.clearTimeout(timer);
  }, [timeWindow, category, sortKey]);

  const featured = useMemo(
    () =>
      rows
        .filter((r) => r.featured)
        .slice(0, 3)
        .sort((a, b) => a.rank - b.rank),
    [rows]
  );

  const toggleFollow = useCallback((id: string) => {
    setFollowedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isFollowing = useCallback(
    (id: string) => followedIds.has(id),
    [followedIds]
  );

  return {
    timeWindow,
    category,
    sortKey,
    setTimeWindow,
    setCategory,
    setSortKey,
    rows,
    featured,
    isLoading,
    toggleFollow,
    isFollowing,
  };
}
