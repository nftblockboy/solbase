"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEvent } from "@/hooks/prediction/use-events";
import {
  findMarketInEvent,
  getEventTitle,
  getMarketTitle,
  getRenderableMarkets,
} from "@/lib/prediction/market-display";
import { getMarketPricing } from "@/lib/prediction/market-pricing";
import { formatNumber, toRawUsd } from "@/lib/prediction/utils";

type MarketDetailViewProps = Readonly<{
  marketId: string;
  eventId?: string;
}>;

export function MarketDetailView({ marketId, eventId }: MarketDetailViewProps) {
  const { data: event, isLoading, isError } = useEvent(eventId ?? "");

  if (!eventId) {
    return (
      <DetailShell>
        <p className="text-sm text-muted">
          Missing event id. Open this market from the browse grid.
        </p>
        <BackLink />
      </DetailShell>
    );
  }

  if (isLoading) {
    return (
      <DetailShell>
        <Loader2 className="mx-auto size-8 animate-spin text-muted" aria-hidden />
      </DetailShell>
    );
  }

  if (isError || !event) {
    return (
      <DetailShell>
        <p className="text-sm text-muted">Could not load this market.</p>
        <BackLink />
      </DetailShell>
    );
  }

  const market = findMarketInEvent(event, marketId);
  if (!market) {
    return (
      <DetailShell>
        <p className="text-sm text-muted">Market not found in this event.</p>
        <BackLink />
      </DetailShell>
    );
  }

  const eventTitle = getEventTitle(event);
  const marketTitle = getMarketTitle(market, event);
  const { yesCents, noCents, chance } = getMarketPricing(market);
  const volume = event.volumeUsd
    ? formatNumber(toRawUsd(event.volumeUsd))
    : formatNumber(market.pricing?.volume ?? 0);
  const allMarkets = getRenderableMarkets(event);

  return (
    <DetailShell>
      <BackLink />

      <header className="flex items-start gap-4">
        {event.metadata?.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.metadata.imageUrl}
            alt=""
            className="size-14 shrink-0 rounded-none object-cover"
          />
        ) : (
          <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-none bg-cream text-lg font-bold text-muted">
            {eventTitle.charAt(0).toUpperCase()}
          </span>
        )}
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {event.category}
            {event.subcategory ? ` · ${event.subcategory}` : ""}
          </p>
          <h1 className="text-xl font-semibold leading-snug text-foreground">
            {eventTitle}
          </h1>
          {marketTitle !== eventTitle ? (
            <p className="text-sm text-muted">{marketTitle}</p>
          ) : null}
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-none border border-primary/30 bg-primary/10 py-4 text-center">
          <p className="text-xs font-medium text-muted">Yes</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-primary">
            {yesCents}¢
          </p>
        </div>
        <div className="rounded-none border border-border-low bg-cream py-4 text-center">
          <p className="text-xs font-medium text-muted">No</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
            {noCents}¢
          </p>
        </div>
      </div>

      <p className="text-center text-sm text-muted">
        Implied chance: <span className="font-mono text-foreground">{chance}%</span>
        {" · "}
        <span className="tabular-nums">${volume} vol</span>
      </p>

      {allMarkets.length > 1 ? (
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-foreground">All outcomes</h2>
          <ul className="divide-y divide-border-low rounded-none border border-border">
            {allMarkets.map((m) => {
              const pricing = getMarketPricing(m);
              const active = m.marketId === marketId;
              return (
                <li key={m.marketId}>
                  <Link
                    href={`/predict/market/${m.marketId}?event=${event.eventId}`}
                    className={cn(
                      "flex items-center justify-between gap-3 px-3 py-2 text-sm transition hover:bg-cream/50",
                      active && "bg-cream"
                    )}
                  >
                    <span className="truncate font-medium text-foreground">
                      {getMarketTitle(m, event)}
                    </span>
                    <span className="shrink-0 font-mono tabular-nums text-muted">
                      {pricing.chance}%
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {market.rulesPrimary ? (
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-foreground">Rules</h2>
          <p className="text-xs leading-relaxed text-muted">{market.rulesPrimary}</p>
        </section>
      ) : null}
    </DetailShell>
  );
}

function DetailShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 py-4">{children}</div>
  );
}

function BackLink() {
  return (
    <Link
      href="/predict"
      className="inline-flex w-fit items-center gap-1.5 text-sm text-muted transition hover:text-accent"
    >
      <ArrowLeft className="size-4" aria-hidden />
      Back to browse
    </Link>
  );
}
