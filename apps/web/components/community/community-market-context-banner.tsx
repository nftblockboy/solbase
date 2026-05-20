"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { buildMarketHref } from "@/lib/markets/market-link";

export type CommunityMarketContext = Readonly<{
  marketId: string;
  eventId: string;
  marketTitle: string;
}>;

type CommunityMarketContextBannerProps = Readonly<{
  context: CommunityMarketContext;
  onDismiss?: () => void;
}>;

export function CommunityMarketContextBanner({
  context,
  onDismiss,
}: CommunityMarketContextBannerProps) {
  const marketHref = buildMarketHref(context.marketId, context.eventId);

  return (
    <div className="flex min-w-0 items-start justify-between gap-3 rounded-none border border-primary/30 bg-primary/5 px-3 py-2">
      <div className="min-w-0 space-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
          Discussing market
        </p>
        <p className="truncate text-sm font-medium text-foreground">
          {context.marketTitle}
        </p>
        <Link
          href={marketHref}
          className="text-xs text-accent hover:underline"
        >
          Back to market detail
        </Link>
      </div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-none p-1 text-muted transition hover:text-foreground"
          aria-label="Dismiss market context"
        >
          <X className="size-4" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
