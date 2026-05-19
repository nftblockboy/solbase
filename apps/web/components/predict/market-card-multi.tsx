"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PredictionEvent } from "@/lib/prediction/api";
import {
  getEventTitle,
  getMarketTitle,
  getRenderableMarkets,
} from "@/lib/prediction/market-display";
import { getMarketPricing } from "@/lib/prediction/market-pricing";
import { formatNumber, toRawUsd } from "@/lib/prediction/utils";
import { MarketCardFrame } from "./market-card-frame";

type MarketCardMultiProps = Readonly<{
  event: PredictionEvent;
  className?: string;
}>;

const MAX_ROWS = 3;

export function MarketCardMulti({ event, className }: MarketCardMultiProps) {
  const markets = getRenderableMarkets(event);
  const visible = markets.slice(0, MAX_ROWS);
  const hasMore = markets.length > MAX_ROWS;
  const eventTitle = getEventTitle(event);

  if (markets.length === 0) return null;
  const volume = event.volumeUsd
    ? formatNumber(toRawUsd(event.volumeUsd))
    : null;
  const firstMarket = markets[0];
  const href = firstMarket
    ? `/predict/market/${firstMarket.marketId}?event=${event.eventId}`
    : "/predict";

  return (
    <MarketCardFrame className={className}>
      <Link href={href} className="flex items-start gap-3">
        <EventThumbnail
          imageUrl={event.metadata?.imageUrl}
          title={eventTitle}
        />
        <h3 className="min-w-0 flex-1 text-sm font-semibold leading-snug text-foreground line-clamp-2">
          {eventTitle}
        </h3>
      </Link>

      <div className="mt-3 space-y-2">
        {visible.map((market) => {
          const { chance, yesCents, noCents } = getMarketPricing(market);
          return (
            <Link
              key={market.marketId}
              href={`/predict/market/${market.marketId}?event=${event.eventId}`}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-none border border-border-low bg-cream px-2 py-2 transition hover:border-accent/40"
            >
              <span className="truncate text-xs font-medium text-foreground">
                {getMarketTitle(market, event)}
              </span>
              <span className="w-10 text-center font-mono text-sm font-semibold tabular-nums text-foreground">
                {chance}%
              </span>
              <span className="inline-flex items-center rounded-none border border-border-low bg-card px-2 py-1 text-[10px] font-medium">
                <span className="text-primary">Yes</span>
                <span className="mx-1 text-muted">/</span>
                <span className="text-muted">No</span>
                <span className="sr-only">
                  {yesCents}c yes, {noCents}c no
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      <footer className="mt-3 flex items-center justify-between text-xs text-muted">
        {hasMore ? (
          <Link
            href={href}
            className="inline-flex items-center gap-0.5 font-medium hover:text-accent"
          >
            Show more
            <ChevronRight className="size-3" aria-hidden />
          </Link>
        ) : (
          <span />
        )}
        {volume ? <span className="tabular-nums">${volume} vol</span> : null}
      </footer>
    </MarketCardFrame>
  );
}

function EventThumbnail({
  imageUrl,
  title,
}: Readonly<{ imageUrl?: string; title: string }>) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt=""
        className="size-10 shrink-0 rounded-none object-cover"
      />
    );
  }
  return (
    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-none bg-cream text-sm font-bold text-muted">
      {title.charAt(0).toUpperCase()}
    </span>
  );
}
