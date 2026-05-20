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
} from "@/lib/portfolio/format";
import { truncateAddress } from "@/lib/prediction/utils";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";
import { LeaderboardAvatar } from "./leaderboard-avatar";
import { LeaderboardBadges } from "./leaderboard-badges";
import { LeaderboardFollowButton } from "./leaderboard-follow-button";

type LeaderboardTraderRowProps = Readonly<{
  row: LeaderboardRow;
  isFollowing: boolean;
  onToggleFollow: () => void;
  variant: "card" | "featured";
}>;

function RankBadge({ rank }: { rank: number }) {
  return (
    <span
      className={cn(
        "inline-flex min-w-[1.75rem] justify-center tabular-nums font-semibold",
        rank <= 3 ? "text-accent" : "text-muted"
      )}
    >
      #{rank}
    </span>
  );
}

export function LeaderboardTraderRow({
  row,
  isFollowing,
  onToggleFollow,
  variant,
}: LeaderboardTraderRowProps) {
  const { metrics } = row;
  const profileHref = traderPath(row.walletAddress);

  if (variant === "featured") {
    return (
      <Surface variant="card" className="flex min-w-[260px] flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={profileHref}
            className="flex items-center gap-3 hover:text-accent"
          >
            <LeaderboardAvatar
              initials={row.initials}
              avatarColor={row.avatarColor}
              size="lg"
            />
            <div>
              <p className="font-semibold text-foreground">{row.displayName}</p>
              <p className="font-mono text-xs text-muted">
                {truncateAddress(row.walletAddress, 6)}
              </p>
            </div>
          </Link>
          <RankBadge rank={row.rank} />
        </div>
        <LeaderboardBadges badges={row.badges} />
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-muted">ROI</span>
            <p
              className={cn(
                "tabular-nums font-semibold",
                pnlToneClass(metrics.roiPct)
              )}
            >
              {formatPct(metrics.roiPct, true)}
            </p>
          </div>
          <div>
            <span className="text-muted">P&L</span>
            <p
              className={cn(
                "tabular-nums font-semibold",
                pnlToneClass(metrics.pnlUsd)
              )}
            >
              {formatPnl(metrics.pnlUsd)}
            </p>
          </div>
          <div>
            <span className="text-muted">Win rate</span>
            <p className="tabular-nums font-medium">
              {formatPct(metrics.winRate)}
            </p>
          </div>
          <div>
            <span className="text-muted">Volume</span>
            <p className="tabular-nums font-medium">
              {formatUsd(metrics.volumeUsd, { compact: true })}
            </p>
          </div>
        </div>
        <LeaderboardFollowButton
          isFollowing={isFollowing}
          onToggle={onToggleFollow}
          className="w-full"
        />
      </Surface>
    );
  }

  return (
    <Surface variant="card" className="flex flex-col gap-3 p-3 lg:hidden">
      <div className="flex items-start justify-between gap-2">
        <Link
          href={profileHref}
          className="flex items-center gap-2 hover:text-accent"
        >
          <RankBadge rank={row.rank} />
          <LeaderboardAvatar
            initials={row.initials}
            avatarColor={row.avatarColor}
          />
          <div>
            <p className="text-sm font-semibold text-foreground">
              {row.displayName}
            </p>
            <p className="font-mono text-[10px] text-muted">
              {truncateAddress(row.walletAddress, 4)}
            </p>
          </div>
        </Link>
        <LeaderboardFollowButton
          isFollowing={isFollowing}
          onToggle={onToggleFollow}
        />
      </div>
      <LeaderboardBadges badges={row.badges} />
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-muted">ROI</span>
          <p
            className={cn("tabular-nums font-medium", pnlToneClass(metrics.roiPct))}
          >
            {formatPct(metrics.roiPct, true)}
          </p>
        </div>
        <div>
          <span className="text-muted">P&L</span>
          <p
            className={cn("tabular-nums font-medium", pnlToneClass(metrics.pnlUsd))}
          >
            {formatPnl(metrics.pnlUsd)}
          </p>
        </div>
        <div>
          <span className="text-muted">Win rate</span>
          <p className="tabular-nums">{formatPct(metrics.winRate)}</p>
        </div>
        <div>
          <span className="text-muted">Followers</span>
          <p className="tabular-nums">{formatFollowers(metrics.followers)}</p>
        </div>
      </div>
    </Surface>
  );
}
