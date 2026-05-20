"use client";

import { useMemo } from "react";
import type { Trade } from "@/lib/prediction/api";
import { truncateAddress, timeAgo } from "@/lib/prediction/utils";
import { Surface } from "@/components/ui/surface";
import { MarketDetailSectionHeading } from "./market-detail-section-heading";
import { useTrades } from "@/hooks/prediction/use-trades";

type MarketDetailRecentActivityProps = Readonly<{
  marketId: string;
  eventId: string;
}>;

function filterTrades(trades: Trade[], marketId: string, eventId: string): Trade[] {
  return trades
    .filter(
      (t) =>
        (t.marketId != null && t.marketId === marketId) ||
        (t.eventId != null && t.eventId === eventId)
    )
    .slice(0, 8);
}

export function MarketDetailRecentActivity({
  marketId,
  eventId,
}: MarketDetailRecentActivityProps) {
  const { data: trades = [], isLoading } = useTrades();
  const recent = useMemo(
    () => filterTrades(trades, marketId, eventId),
    [trades, marketId, eventId]
  );

  return (
    <Surface variant="panel" className="flex min-w-0 flex-col gap-2 p-4">
      <MarketDetailSectionHeading>Recent activity</MarketDetailSectionHeading>
      {isLoading ? (
        <p className="text-xs text-muted">Loading trades…</p>
      ) : recent.length === 0 ? (
        <p className="text-xs text-muted">No recent trades for this market.</p>
      ) : (
        <ul className="max-h-64 space-y-2 overflow-y-auto">
          {recent.map((t) => (
            <li
              key={t.id}
              className="flex items-start justify-between gap-2 border-b border-border-low pb-2 text-xs last:border-0"
            >
              <div className="min-w-0">
                <p className="font-medium text-foreground">
                  {t.side} · ${t.amountUsd}
                </p>
                <p className="truncate text-muted">{t.marketTitle}</p>
              </div>
              <div className="shrink-0 text-right text-muted">
                <p className="font-mono tabular-nums">{truncateAddress(t.ownerPubkey)}</p>
                <p className="tabular-nums">{timeAgo(t.timestamp)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Surface>
  );
}
