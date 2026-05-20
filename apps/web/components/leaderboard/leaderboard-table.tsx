"use client";

import Link from "next/link";
import type { LeaderboardRow } from "@/lib/mock/leaderboard";
import { traderPath } from "@/lib/mock/profile";
import { formatFollowers } from "@/lib/leaderboard/format";
import {
  formatPct,
  formatPnl,
  formatUsd,
  pnlToneClass,
  riskScoreTone,
} from "@/lib/portfolio/format";
import { truncateAddress } from "@/lib/prediction/utils";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";
import { LeaderboardSectionHeading } from "./leaderboard-section-heading";
import { LeaderboardAvatar } from "./leaderboard-avatar";
import { LeaderboardBadges } from "./leaderboard-badges";
import { LeaderboardFollowButton } from "./leaderboard-follow-button";
import { LeaderboardTraderRow } from "./leaderboard-trader-row";

type LeaderboardTableProps = Readonly<{
  rows: LeaderboardRow[];
  isFollowing: (id: string) => boolean;
  onToggleFollow: (id: string) => void;
}>;

export function LeaderboardTable({
  rows,
  isFollowing,
  onToggleFollow,
}: LeaderboardTableProps) {
  return (
    <Surface variant="panel" className="p-4">
      <LeaderboardSectionHeading
        title="Rankings"
        subtitle={`${rows.length} traders`}
      />

      <div className="flex flex-col gap-2 lg:hidden">
        {rows.map((row) => (
          <LeaderboardTraderRow
            key={row.id}
            row={row}
            variant="card"
            isFollowing={isFollowing(row.id)}
            onToggleFollow={() => onToggleFollow(row.id)}
          />
        ))}
      </div>

      <div className="scrollbar-hide hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border-low text-[10px] uppercase tracking-wider text-muted">
              <th className="pb-2 pr-2 font-medium">Rank</th>
              <th className="pb-2 pr-3 font-medium">Trader</th>
              <th className="pb-2 pr-3 text-right font-medium">ROI</th>
              <th className="pb-2 pr-3 text-right font-medium">P&L</th>
              <th className="pb-2 pr-3 text-right font-medium">Win rate</th>
              <th className="pb-2 pr-3 text-right font-medium">Volume</th>
              <th className="pb-2 pr-3 text-right font-medium">Followers</th>
              <th className="pb-2 pr-3 text-right font-medium">Risk</th>
              <th className="pb-2 pr-3 font-medium">Badges</th>
              <th className="pb-2 text-right font-medium" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const { metrics } = row;
              return (
                <tr
                  key={row.id}
                  className="border-b border-border-low/60 hover:bg-cream/50"
                >
                  <td className="py-2.5 pr-2">
                    <span
                      className={cn(
                        "tabular-nums font-semibold",
                        row.rank <= 3 ? "text-accent" : "text-muted"
                      )}
                    >
                      #{row.rank}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3">
                    <Link
                      href={traderPath(row.walletAddress)}
                      className="flex items-center gap-2 hover:text-accent"
                    >
                      <LeaderboardAvatar
                        initials={row.initials}
                        avatarColor={row.avatarColor}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">
                          {row.displayName}
                        </p>
                        <p className="font-mono text-[10px] text-muted">
                          {truncateAddress(row.walletAddress, 4)}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td
                    className={cn(
                      "py-2.5 pr-3 text-right tabular-nums font-medium",
                      pnlToneClass(metrics.roiPct)
                    )}
                  >
                    {formatPct(metrics.roiPct, true)}
                  </td>
                  <td
                    className={cn(
                      "py-2.5 pr-3 text-right tabular-nums font-medium",
                      pnlToneClass(metrics.pnlUsd)
                    )}
                  >
                    {formatPnl(metrics.pnlUsd)}
                  </td>
                  <td className="py-2.5 pr-3 text-right tabular-nums text-foreground">
                    {formatPct(metrics.winRate)}
                  </td>
                  <td className="py-2.5 pr-3 text-right tabular-nums text-muted">
                    {formatUsd(metrics.volumeUsd, { compact: true })}
                  </td>
                  <td className="py-2.5 pr-3 text-right tabular-nums text-muted">
                    {formatFollowers(metrics.followers)}
                  </td>
                  <td
                    className={cn(
                      "py-2.5 pr-3 text-right tabular-nums font-medium",
                      riskScoreTone(metrics.riskScore)
                    )}
                  >
                    {metrics.riskScore}
                  </td>
                  <td className="py-2.5 pr-3">
                    <LeaderboardBadges badges={row.badges} />
                  </td>
                  <td className="py-2.5 text-right">
                    <LeaderboardFollowButton
                      isFollowing={isFollowing(row.id)}
                      onToggle={() => onToggleFollow(row.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Surface>
  );
}
