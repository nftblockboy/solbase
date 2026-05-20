"use client";

import { useLeaderboard } from "@/hooks/leaderboard/use-leaderboard";
import { LeaderboardFeatured } from "./leaderboard-featured";
import { LeaderboardFilters } from "./leaderboard-filters";
import { LeaderboardLoadingSkeleton } from "./leaderboard-loading-skeleton";
import { LeaderboardMethodology } from "./leaderboard-methodology";
import { LeaderboardTable } from "./leaderboard-table";

export function LeaderboardShell() {
  const {
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
  } = useLeaderboard();

  if (isLoading) {
    return <LeaderboardLoadingSkeleton />;
  }

  return (
    <div className="flex w-full flex-col gap-4 pb-6">
      <header className="border-b border-border pb-3">
        <h1 className="text-xl font-semibold text-foreground">Leaderboard</h1>
        <p className="mt-1 text-xs text-muted">
          Discover top prediction traders by performance, consistency, and risk
        </p>
      </header>

      <LeaderboardFilters
        timeWindow={timeWindow}
        category={category}
        sortKey={sortKey}
        onTimeWindowChange={setTimeWindow}
        onCategoryChange={setCategory}
        onSortKeyChange={setSortKey}
      />

      <LeaderboardFeatured
        traders={featured}
        isFollowing={isFollowing}
        onToggleFollow={toggleFollow}
      />

      <LeaderboardTable
        rows={rows}
        isFollowing={isFollowing}
        onToggleFollow={toggleFollow}
      />

      <LeaderboardMethodology />
    </div>
  );
}
