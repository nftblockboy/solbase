"use client";

import { useCallback, useMemo, useRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PredictionEvent } from "@/lib/prediction/api";
import { getRenderableMarkets, isMultiOutcomeEvent } from "@/lib/prediction/market-display";
import { MarketCardBinary } from "./market-card-binary";
import { MarketCardMulti } from "./market-card-multi";
import { MarketCardSkeletonGrid } from "./market-card-skeleton";

type MarketCardGridProps = Readonly<{
  events: PredictionEvent[];
  isLoading?: boolean;
  isRefetching?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  tradesPanelOpen?: boolean;
}>;

export function MarketCardGrid({
  events,
  isLoading,
  isRefetching = false,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  tradesPanelOpen = false,
}: MarketCardGridProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const displayEvents = useMemo(
    () => events.filter((e) => getRenderableMarkets(e).length > 0),
    [events]
  );

  const gridClassName = tradesPanelOpen
    ? "grid grid-cols-1 gap-3 md:grid-cols-2"
    : "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3";

  const sentinelCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node) return;
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { rootMargin: "200px" }
      );
      observerRef.current.observe(node);
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  if (isLoading) {
    return (
      <div className={gridClassName}>
        <MarketCardSkeletonGrid count={8} />
      </div>
    );
  }

  if (displayEvents.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted">
        No markets found. Check your API key or try another category.
      </p>
    );
  }

  return (
    <>
      <div className={cn(gridClassName, isRefetching && "opacity-60")}>
        {displayEvents.map((event) =>
          isMultiOutcomeEvent(event) ? (
            <MarketCardMulti key={event.eventId} event={event} />
          ) : (
            <MarketCardBinary key={event.eventId} event={event} />
          )
        )}
      </div>

      {hasNextPage ? (
        <div ref={sentinelCallback} className="flex justify-center py-4">
          {isFetchingNextPage ? (
            <Loader2 className="size-6 animate-spin text-muted" aria-hidden />
          ) : null}
        </div>
      ) : null}
    </>
  );
}
