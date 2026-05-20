"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FILTERS,
  SORT_OPTIONS,
  type Filter,
  type SortOptionValue,
} from "@/lib/prediction/constants";
import type { Trade } from "@/lib/prediction/api";
import { truncateAddress, toRawUsd } from "@/lib/prediction/utils";

type BrowseToolbarProps = Readonly<{
  sortOption: SortOptionValue;
  onSortChange: (value: SortOptionValue) => void;
  filter?: Filter;
  onFilterChange: (filter: Filter | undefined) => void;
  latestTrade?: Trade;
  tradesPanelOpen: boolean;
  onTradesPanelToggle: () => void;
  className?: string;
}>;

export function BrowseToolbar({
  sortOption,
  onSortChange,
  filter,
  onFilterChange,
  latestTrade,
  tradesPanelOpen,
  onTradesPanelToggle,
  className,
}: BrowseToolbarProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-wrap items-center justify-end gap-2",
        className
      )}
    >
      <div className="relative">
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOptionValue)}
          className="h-8 appearance-none rounded-none border border-border bg-card py-1 pr-8 pl-3 text-xs font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Sort by volume"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-muted"
          aria-hidden
        />
      </div>

      {latestTrade ? (
        <button
          type="button"
          onClick={onTradesPanelToggle}
          aria-expanded={tradesPanelOpen}
          aria-label={tradesPanelOpen ? "Hide trades feed" : "Show trades feed"}
          className={cn(
            "hidden max-w-[280px] items-center gap-1 truncate rounded-none border px-2 py-1 text-[10px] transition sm:inline-flex",
            tradesPanelOpen
              ? "border-primary bg-primary/10 text-primary"
              : "border-border-low bg-card text-muted hover:border-primary/40 hover:text-foreground"
          )}
        >
          <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          <span className="truncate">
            <span className="font-mono">{truncateAddress(latestTrade.ownerPubkey, 3)}</span>{" "}
            just {latestTrade.action}{" "}
            <span className="font-semibold text-foreground">
              ${toRawUsd(latestTrade.amountUsd).toFixed(2)}
            </span>{" "}
            of {latestTrade.side}
          </span>
          {tradesPanelOpen ? (
            <ChevronUp className="size-3 shrink-0" aria-hidden />
          ) : (
            <ChevronDown className="size-3 shrink-0" aria-hidden />
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={onTradesPanelToggle}
          aria-expanded={tradesPanelOpen}
          className={cn(
            "hidden items-center gap-1 rounded-none border px-2 py-1 text-xs font-medium transition sm:inline-flex",
            tradesPanelOpen
              ? "border-primary bg-primary/10 text-primary"
              : "border-border-low text-muted hover:text-foreground"
          )}
        >
          Trades
          {tradesPanelOpen ? (
            <ChevronUp className="size-3" aria-hidden />
          ) : (
            <ChevronDown className="size-3" aria-hidden />
          )}
        </button>
      )}

      <div className="flex flex-wrap gap-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => onFilterChange(filter === f ? undefined : f)}
            className={cn(
              "rounded-none border px-2 py-1 text-xs font-medium capitalize transition",
              filter === f
                ? "border-primary bg-primary/10 text-primary"
                : "border-border-low text-muted hover:text-foreground"
            )}
          >
            {f === "live" ? (
              <span className="inline-flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                Live
              </span>
            ) : (
              f
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
