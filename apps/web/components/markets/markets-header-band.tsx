"use client";

import { cn } from "@/lib/utils";
import type { Trade } from "@/lib/prediction/api";
import type { Category, Filter, SortOptionValue } from "@/lib/prediction/constants";
import { BrowseToolbar } from "./browse-toolbar";
import { CategoryBar } from "./category-bar";

type MarketsHeaderBandProps = Readonly<{
  category: Category;
  onCategoryChange: (category: Category) => void;
  sortOption: SortOptionValue;
  onSortChange: (value: SortOptionValue) => void;
  filter?: Filter;
  onFilterChange: (filter: Filter | undefined) => void;
  latestTrade?: Trade;
  tradesPanelOpen: boolean;
  onTradesPanelToggle: () => void;
  isBackgroundFetching?: boolean;
}>;

export function MarketsHeaderBand({
  category,
  onCategoryChange,
  sortOption,
  onSortChange,
  filter,
  onFilterChange,
  latestTrade,
  tradesPanelOpen,
  onTradesPanelToggle,
  isBackgroundFetching = false,
}: MarketsHeaderBandProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <CategoryBar
        category={category}
        onCategoryChange={onCategoryChange}
        className="md:flex-1"
      />
      <BrowseToolbar
        sortOption={sortOption}
        onSortChange={onSortChange}
        filter={filter}
        onFilterChange={onFilterChange}
        latestTrade={latestTrade}
        tradesPanelOpen={tradesPanelOpen}
        onTradesPanelToggle={onTradesPanelToggle}
        className={cn(isBackgroundFetching && "opacity-60")}
      />
    </div>
  );
}
