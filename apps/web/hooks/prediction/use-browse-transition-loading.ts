"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * True from browse-param change until the matching query finishes fetching.
 * Covers gaps where keepPreviousData shows stale cards before isPlaceholderData flips.
 */
export function useBrowseTransitionLoading(
  browseKey: string,
  isFetching: boolean,
  isPending: boolean
): boolean {
  // Start true so the first paint uses skeletons, not a faded empty/stale grid.
  const [transitioning, setTransitioning] = useState(true);
  const prevKeyRef = useRef(browseKey);

  useLayoutEffect(() => {
    if (prevKeyRef.current === browseKey) return;
    prevKeyRef.current = browseKey;
    setTransitioning(true);
  }, [browseKey]);

  useLayoutEffect(() => {
    if (!transitioning) return;
    if (!isFetching && !isPending) {
      setTransitioning(false);
    }
  }, [browseKey, transitioning, isFetching, isPending]);

  return transitioning;
}
