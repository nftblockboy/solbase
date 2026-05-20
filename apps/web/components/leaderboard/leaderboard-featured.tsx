"use client";

import type { LeaderboardRow } from "@/lib/mock/leaderboard";
import { LeaderboardSectionHeading } from "./leaderboard-section-heading";
import { LeaderboardTraderRow } from "./leaderboard-trader-row";

type LeaderboardFeaturedProps = Readonly<{
  traders: LeaderboardRow[];
  isFollowing: (id: string) => boolean;
  onToggleFollow: (id: string) => void;
}>;

export function LeaderboardFeatured({
  traders,
  isFollowing,
  onToggleFollow,
}: LeaderboardFeaturedProps) {
  if (traders.length === 0) return null;

  return (
    <section>
      <LeaderboardSectionHeading
        title="Featured traders"
        subtitle="Top performers this period"
      />
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
        {traders.map((row) => (
          <LeaderboardTraderRow
            key={row.id}
            row={row}
            variant="featured"
            isFollowing={isFollowing(row.id)}
            onToggleFollow={() => onToggleFollow(row.id)}
          />
        ))}
      </div>
    </section>
  );
}
