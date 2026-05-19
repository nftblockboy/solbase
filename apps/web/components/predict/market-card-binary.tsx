"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PredictionEvent } from "@/lib/prediction/api";
import { getEventTitle, getRenderableMarkets } from "@/lib/prediction/market-display";
import { getMarketPricing } from "@/lib/prediction/market-pricing";
import { formatNumber, toRawUsd } from "@/lib/prediction/utils";

type MarketCardBinaryProps = Readonly<{
  event: PredictionEvent;
  className?: string;
}>;

export function MarketCardBinary({ event, className }: MarketCardBinaryProps) {
  const market = getRenderableMarkets(event)[0];
  if (!market) return null;

  const eventTitle = getEventTitle(event);
  const { yesCents, noCents } = getMarketPricing(market);
  const volume = event.volumeUsd
    ? formatNumber(toRawUsd(event.volumeUsd))
    : formatNumber(market.pricing?.volume ?? 0);
  const href = `/predict/market/${market.marketId}?event=${event.eventId}`;

  return (
    <article
      className={cn(
        "flex flex-col rounded-none border border-border bg-card p-3 transition hover:border-accent/50",
        className
      )}
    >
      <Link href={href} className="flex items-start gap-3">
        {event.metadata?.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.metadata.imageUrl}
            alt=""
            className="size-10 shrink-0 rounded-none object-cover"
          />
        ) : (
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-none bg-cream text-sm font-bold text-muted">
            {eventTitle.charAt(0).toUpperCase()}
          </span>
        )}
        <h3 className="min-w-0 flex-1 text-sm font-semibold leading-snug text-foreground line-clamp-2">
          {eventTitle}
        </h3>
      </Link>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link
          href={href}
          className="rounded-none border border-border-low bg-primary/10 py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary/15"
        >
          Yes {yesCents}¢
        </Link>
        <Link
          href={href}
          className="rounded-none border border-border-low bg-cream py-3 text-center text-sm font-semibold text-muted transition hover:border-accent/40 hover:text-foreground"
        >
          No {noCents}¢
        </Link>
      </div>

      <footer className="mt-3 flex items-center justify-between text-xs text-muted">
        <Link
          href={href}
          className="inline-flex items-center gap-0.5 font-medium hover:text-accent"
        >
          Show more
          <ChevronRight className="size-3" aria-hidden />
        </Link>
        <span className="tabular-nums">${volume} vol</span>
      </footer>
    </article>
  );
}
