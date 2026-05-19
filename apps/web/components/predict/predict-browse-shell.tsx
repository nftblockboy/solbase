"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useEvents } from "@/hooks/prediction/use-events";
import { useBrowseTransitionLoading } from "@/hooks/prediction/use-browse-transition-loading";
import { useMinSkeleton } from "@/hooks/prediction/use-min-skeleton";
import { useTrades } from "@/hooks/prediction/use-trades";
import type { Category, Filter, SortOptionValue } from "@/lib/prediction/constants";
import { categoryHasSidebar } from "@/lib/prediction/category-sidebar-config";
import {
  isBrowseBackgroundFetching,
  isBrowseGridLoading,
} from "@/lib/prediction/query-status";
import {
  filterSportsEvents,
  type SportsView,
} from "@/lib/prediction/sports-filters";
import { CategorySidebar } from "./category-sidebar";
import { MarketCardGrid } from "./market-card-grid";
import { PredictComingSoon } from "./predict-coming-soon";
import { PredictHeaderBand } from "./predict-header-band";
import { PredictSubNav, type PredictSubNavTab } from "./predict-sub-nav";
import { TradesFeed } from "./trades-feed";

export function PredictBrowseShell() {
  const [subNav, setSubNav] = useState<PredictSubNavTab>("browse");
  const [category, setCategory] = useState<Category>("all");
  const [filter, setFilter] = useState<Filter | undefined>();
  const [subcategory, setSubcategory] = useState<string | undefined>();
  const [sortOption, setSortOption] = useState<SortOptionValue>("default");
  const [tradesPanelOpen, setTradesPanelOpen] = useState(false);
  const [sportsView, setSportsView] = useState<SportsView>("games");
  const [sportsViewLoading, setSportsViewLoading] = useState(false);

  const {
    data,
    isLoading,
    isPending,
    isFetching,
    isFetchingNextPage,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useEvents({ category, filter, sortOption, subcategory });

  const { data: trades } = useTrades();
  const latestTrade = trades?.[0];

  const hasData = Boolean(
    data?.pages?.some((page) => (page.data?.length ?? 0) > 0)
  );
  const browseKey = `${category}|${subcategory ?? ""}|${filter ?? ""}|${sortOption}`;
  const isTransitioning = useBrowseTransitionLoading(
    browseKey,
    isFetching,
    isPending
  );
  const isQueryGridLoading =
    isTransitioning ||
    isBrowseGridLoading(
      isLoading,
      isPending,
      isFetching,
      isFetchingNextPage,
      hasData,
      isPlaceholderData
    );

  useEffect(() => {
    if (category !== "sports") {
      setSportsViewLoading(false);
      return;
    }
    setSportsViewLoading(true);
    const timer = window.setTimeout(() => setSportsViewLoading(false), 220);
    return () => window.clearTimeout(timer);
  }, [sportsView, category]);

  const isGridLoading = useMinSkeleton(
    isQueryGridLoading || (category === "sports" && sportsViewLoading)
  );

  const isBackgroundFetching = isBrowseBackgroundFetching(
    isLoading,
    isPending,
    isFetching,
    isFetchingNextPage,
    hasData,
    isPlaceholderData
  );

  const events = useMemo(() => {
    const flat = data?.pages.flatMap((page) => page.data) ?? [];
    if (category !== "sports") return flat;
    return filterSportsEvents(flat, sportsView);
  }, [data, category, sportsView]);

  const showSidebar = categoryHasSidebar(category);

  function handleCategoryChange(next: Category) {
    setCategory(next);
    setSubcategory(undefined);
    setSportsView("games");
    setTradesPanelOpen(false);
  }

  function handleTradesPanelToggle() {
    setTradesPanelOpen((open) => !open);
  }

  const bodyGridClassName = cn(
    "grid min-h-0 flex-1 gap-0",
    showSidebar && tradesPanelOpen &&
      "lg:grid-cols-[minmax(200px,220px)_minmax(0,1fr)_minmax(260px,300px)]",
    showSidebar && !tradesPanelOpen &&
      "lg:grid-cols-[minmax(200px,220px)_minmax(0,1fr)]",
    !showSidebar && tradesPanelOpen &&
      "lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)]",
    !showSidebar && !tradesPanelOpen && "grid-cols-1"
  );

  if (subNav !== "browse") {
    const labels: Record<Exclude<PredictSubNavTab, "browse">, string> = {
      degen: "Degen",
      "for-you": "For You",
      leaderboard: "Leaderboard",
      profile: "Profile",
    };
    return (
      <div className="flex w-full flex-col pb-4">
        <div className="flex flex-col gap-2 border-b border-border pb-3">
          <PredictSubNav active={subNav} onChange={setSubNav} />
        </div>
        <PredictComingSoon label={labels[subNav]} />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col pb-4">
      <div className="mb-3 flex flex-col gap-2 border-b border-border pb-3">
        <PredictSubNav active={subNav} onChange={setSubNav} />
        <PredictHeaderBand
          category={category}
          onCategoryChange={handleCategoryChange}
          sortOption={sortOption}
          onSortChange={setSortOption}
          filter={filter}
          onFilterChange={setFilter}
          latestTrade={latestTrade}
          tradesPanelOpen={tradesPanelOpen}
          onTradesPanelToggle={handleTradesPanelToggle}
          isBackgroundFetching={isBackgroundFetching}
        />
      </div>

      {isError ? (
        <p className="mb-3 rounded-none border border-border-low bg-cream px-4 py-6 text-center text-sm text-muted">
          Failed to load markets. Set{" "}
          <code className="text-foreground">NEXT_PUBLIC_JUPITER_API_KEY</code> in{" "}
          <code className="text-foreground">apps/web/.env.local</code>.
        </p>
      ) : null}

      <div className={bodyGridClassName}>
        {showSidebar ? (
          <CategorySidebar
            category={category}
            events={events}
            subcategory={subcategory}
            onSubcategoryChange={setSubcategory}
            filter={filter}
            onFilterChange={setFilter}
            isLoading={isGridLoading}
          />
        ) : null}

        <section
          className="min-w-0 px-0 lg:px-3"
          aria-busy={isGridLoading}
        >
          {category === "sports" ? (
            <div className="mb-3 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  if (sportsView !== "games") setSportsView("games");
                }}
                className={cn(
                  "rounded-none border px-3 py-1 text-xs font-medium transition",
                  sportsView === "games"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border-low text-muted hover:text-foreground"
                )}
              >
                Games
              </button>
              <button
                type="button"
                onClick={() => {
                  if (sportsView !== "props") setSportsView("props");
                }}
                className={cn(
                  "rounded-none border px-3 py-1 text-xs font-medium transition",
                  sportsView === "props"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border-low text-muted hover:text-foreground"
                )}
              >
                Props
              </button>
            </div>
          ) : null}

          <MarketCardGrid
            events={events}
            isLoading={isGridLoading}
            isRefetching={isBackgroundFetching}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            fetchNextPage={() => fetchNextPage()}
            tradesPanelOpen={tradesPanelOpen}
          />
        </section>

        <TradesFeed open={tradesPanelOpen} onClose={() => setTradesPanelOpen(false)} />
      </div>
    </div>
  );
}
