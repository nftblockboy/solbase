"use client";

import Link from "next/link";
import { Bell, MessageSquare, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildCommunityDiscussHref } from "@/lib/markets/community-discuss-link";
import { MarketDetailAlertDialog } from "./market-detail-alert-dialog";
import type { MarketAlert } from "@/hooks/markets/use-market-local-prefs";

type MarketDetailActionBarProps = Readonly<{
  marketId: string;
  eventId: string;
  marketTitle: string;
  isWatchlisted: boolean;
  onToggleWatchlist: () => void;
  alerts: MarketAlert[];
  onAddAlert: (input: { thresholdPct?: number; note?: string }) => void;
  onRemoveAlert: (id: string) => void;
}>;

export function MarketDetailActionBar({
  marketId,
  eventId,
  marketTitle,
  isWatchlisted,
  onToggleWatchlist,
  alerts,
  onAddAlert,
  onRemoveAlert,
}: MarketDetailActionBarProps) {
  const discussHref = buildCommunityDiscussHref({ marketId, eventId, title: marketTitle });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onToggleWatchlist}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-none border px-3 py-1.5 text-xs font-medium transition",
          isWatchlisted
            ? "border-primary/40 bg-primary/10 text-primary"
            : "border-border bg-cream text-foreground hover:border-primary/30"
        )}
      >
        <Star className={cn("size-3.5", isWatchlisted && "fill-current")} aria-hidden />
        {isWatchlisted ? "Watchlisted" : "Watchlist"}
      </button>
      <MarketDetailAlertDialog
        marketTitle={marketTitle}
        alerts={alerts}
        onAddAlert={onAddAlert}
        onRemoveAlert={onRemoveAlert}
        trigger={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-none border border-border bg-cream px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/30"
          >
            <Bell className="size-3.5" aria-hidden />
            Set alert
          </button>
        }
      />
      <Link
        href={discussHref}
        className="inline-flex items-center gap-1.5 rounded-none border border-border bg-cream px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/30"
      >
        <MessageSquare className="size-3.5" aria-hidden />
        Discuss
      </Link>
    </div>
  );
}
