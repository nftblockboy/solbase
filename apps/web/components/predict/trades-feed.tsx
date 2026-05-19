"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Trade } from "@/lib/prediction/api";
import { truncateAddress, toRawUsd } from "@/lib/prediction/utils";
import { useTrades } from "@/hooks/prediction/use-trades";
import { Surface } from "@/components/ui/surface";

type TradesFeedProps = Readonly<{
  open: boolean;
  onClose: () => void;
}>;

function TradeRow({ trade }: Readonly<{ trade: Trade }>) {
  const isYes =
    trade.side.toLowerCase() === "yes" ||
    trade.side.toLowerCase() === "up" ||
    trade.side.toLowerCase().includes("over");
  const priceCents = (toRawUsd(trade.priceUsd) * 100).toFixed(0);
  const amount = toRawUsd(trade.amountUsd).toFixed(2);
  const outcomeLabel = trade.marketTitle || trade.side;

  return (
    <div className="flex gap-3 border-b border-border-low py-3 last:border-b-0">
      {trade.eventImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={trade.eventImageUrl}
          alt=""
          className="size-9 shrink-0 rounded-none object-cover"
        />
      ) : (
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-none bg-cream text-xs font-bold text-muted">
          {trade.eventTitle?.charAt(0) ?? "?"}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-foreground">
          {trade.eventTitle}
        </p>
        <p className="mt-0.5 text-[11px] leading-snug text-muted">
          <span className="font-mono">{truncateAddress(trade.ownerPubkey, 3)}</span>{" "}
          {trade.action}{" "}
          <span className={cn(isYes ? "text-primary" : "text-foreground/70")}>
            {outcomeLabel}
          </span>{" "}
          at {priceCents}¢ (${amount})
        </p>
      </div>
    </div>
  );
}

function TradesFeedPanel({
  onClose,
  className,
}: Readonly<{ onClose: () => void; className?: string }>) {
  const { data: trades, isLoading, isError, isFetching } = useTrades();

  return (
    <Surface
      as="aside"
      variant="panel"
      className={cn(
        "flex flex-col lg:max-h-[calc(100vh-12rem)] lg:overflow-hidden",
        className
      )}
    >
      <header className="flex shrink-0 items-center justify-between gap-2 border-b border-border-low px-3 py-2">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground">Trades</h2>
          <span className="inline-flex items-center gap-1 rounded-none border border-primary/30 bg-primary/5 px-1.5 py-0.5 text-[10px] font-medium text-primary">
            <span
              className="size-1.5 animate-pulse rounded-full bg-primary"
              aria-hidden
            />
            Live
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex size-7 items-center justify-center rounded-none text-muted transition hover:bg-cream hover:text-foreground"
          aria-label="Hide trades"
        >
          <X className="size-4" aria-hidden />
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-3">
        {isLoading ? (
          <div className="space-y-3 py-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded-none bg-cream"
              />
            ))}
          </div>
        ) : null}

        {isError ? (
          <p className="py-8 text-center text-xs text-muted">
            Could not load trades. Check your API key.
          </p>
        ) : null}

        {!isLoading && !isError && (!trades || trades.length === 0) ? (
          <p className="py-8 text-center text-xs text-muted">No recent trades</p>
        ) : null}

        {!isLoading && trades && trades.length > 0 ? (
          <div className={cn(isFetching && "opacity-60")}>
            {trades.map((trade: Trade, index: number) => (
              <TradeRow key={trade.id ?? index} trade={trade} />
            ))}
          </div>
        ) : null}
      </div>
    </Surface>
  );
}

export function TradesFeed({ open, onClose }: TradesFeedProps) {
  if (!open) return null;

  return (
    <>
      {/* Mobile overlay */}
      <button
        type="button"
        className="fixed inset-0 z-40 bg-background/80 lg:hidden"
        aria-label="Close trades panel"
        onClick={onClose}
      />
      <TradesFeedPanel
        onClose={onClose}
        className="fixed inset-y-0 right-0 z-50 w-[min(100%,320px)] shadow-lg lg:static lg:z-auto lg:w-full lg:shadow-none"
      />
    </>
  );
}
