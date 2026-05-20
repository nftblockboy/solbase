"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEvent } from "@/hooks/prediction/use-events";
import { useMarketLocalPrefs } from "@/hooks/markets/use-market-local-prefs";
import { useMarketPositionContext } from "@/hooks/markets/use-market-position-context";
import { findMarketInEvent, getMarketTitle } from "@/lib/prediction/market-display";
import { getMarketPricing } from "@/lib/prediction/market-pricing";
import {
  buildMarketAiSummary,
  buildMarketMovement,
  getRelatedMarkets,
} from "@/lib/mock/market-intelligence";
import { formatNumber, toRawUsd } from "@/lib/prediction/utils";
import {
  MarketDetailActionBar,
  MarketDetailAiSummaryPanel,
  MarketDetailHeader,
  MarketDetailMetaPanel,
  MarketDetailMovementPanel,
  MarketDetailOutcomes,
  MarketDetailPositionPanel,
  MarketDetailPriceStrip,
  MarketDetailRecentActivity,
  MarketDetailRelatedMarkets,
  MarketDetailRules,
  MarketDetailShell,
  MarketDetailTradeCta,
} from "./market-detail";

type MarketDetailViewProps = Readonly<{
  marketId: string;
  eventId?: string;
}>;

export function MarketDetailView({ marketId, eventId }: MarketDetailViewProps) {
  const { data: event, isLoading, isError } = useEvent(eventId ?? "");

  if (!eventId) {
    return (
      <MarketDetailShell>
        <p className="text-sm text-muted">
          Missing event id. Open this market from the browse grid.
        </p>
        <BackLink />
      </MarketDetailShell>
    );
  }

  if (isLoading) {
    return (
      <MarketDetailShell>
        <Loader2 className="mx-auto size-8 animate-spin text-muted" aria-hidden />
      </MarketDetailShell>
    );
  }

  if (isError || !event) {
    return (
      <MarketDetailShell>
        <p className="text-sm text-muted">
          This market isn&apos;t available in the live feed.
        </p>
        <BackLink />
      </MarketDetailShell>
    );
  }

  const market = findMarketInEvent(event, marketId);
  if (!market) {
    return (
      <MarketDetailShell>
        <p className="text-sm text-muted">Market not found in this event.</p>
        <BackLink />
      </MarketDetailShell>
    );
  }

  return (
    <MarketDetailSuccess
      event={event}
      market={market}
      marketId={marketId}
      eventId={eventId}
    />
  );
}

function MarketDetailSuccess({
  event,
  market,
  marketId,
  eventId,
}: Readonly<{
  event: NonNullable<ReturnType<typeof useEvent>["data"]>;
  market: NonNullable<ReturnType<typeof findMarketInEvent>>;
  marketId: string;
  eventId: string;
}>) {
  const marketTitle = getMarketTitle(market, event);
  const { yesCents, noCents, chance } = getMarketPricing(market);
  const volume = event.volumeUsd
    ? formatNumber(toRawUsd(event.volumeUsd))
    : formatNumber(market.pricing?.volume ?? 0);

  const movement = buildMarketMovement(event, market);
  const aiSummary = buildMarketAiSummary(event, market, movement);
  const related = getRelatedMarkets(event, marketId);

  const {
    isWatchlisted,
    toggleWatchlist,
    marketAlerts,
    addAlert,
    removeAlert,
  } = useMarketLocalPrefs(eventId, marketId);

  const positionContext = useMarketPositionContext(event, market, marketId, eventId);

  return (
    <MarketDetailShell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <BackLink />
        <MarketDetailActionBar
          marketId={marketId}
          eventId={eventId}
          marketTitle={marketTitle}
          isWatchlisted={isWatchlisted}
          onToggleWatchlist={toggleWatchlist}
          alerts={marketAlerts}
          onAddAlert={(input) => addAlert({ ...input, marketTitle })}
          onRemoveAlert={removeAlert}
        />
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-8">
          <MarketDetailHeader event={event} market={market} />
          <MarketDetailPriceStrip
            yesCents={yesCents}
            noCents={noCents}
            chance={chance}
            volumeLabel={volume}
          />
          <MarketDetailTradeCta
            marketTitle={marketTitle}
            marketId={marketId}
            eventId={eventId}
            yesCents={yesCents}
            noCents={noCents}
            chance={chance}
          />
        </div>
        <div className="min-w-0 lg:col-span-4">
          <MarketDetailMetaPanel market={market} />
        </div>
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <MarketDetailMovementPanel movement={movement} />
        <MarketDetailPositionPanel context={positionContext} />
      </div>

      <MarketDetailAiSummaryPanel summary={aiSummary} />

      <div className="grid min-w-0 gap-4 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <MarketDetailRelatedMarkets items={related} />
        </div>
        <div className="min-w-0 lg:col-span-4">
          <MarketDetailRecentActivity marketId={marketId} eventId={eventId} />
        </div>
      </div>

      <MarketDetailOutcomes event={event} activeMarketId={marketId} />
      <MarketDetailRules market={market} />
    </MarketDetailShell>
  );
}

function BackLink() {
  return (
    <Link
      href="/markets"
      className="inline-flex w-fit items-center gap-1.5 text-sm text-muted transition hover:text-accent"
    >
      <ArrowLeft className="size-4" aria-hidden />
      Back to browse
    </Link>
  );
}
