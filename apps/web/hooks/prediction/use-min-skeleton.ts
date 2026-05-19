"use client";

import { useEffect, useRef, useState } from "react";

/** Keeps skeleton visible for at least minMs so loading state is perceptible. */
export function useMinSkeleton(active: boolean, minMs = 220): boolean {
  const [visible, setVisible] = useState(() => active);
  const shownAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (active) {
      shownAtRef.current = Date.now();
      setVisible(true);
      return;
    }

    const shownAt = shownAtRef.current;
    if (shownAt == null) {
      setVisible(false);
      return;
    }

    const elapsed = Date.now() - shownAt;
    const delay = Math.max(0, minMs - elapsed);
    const timer = window.setTimeout(() => {
      setVisible(false);
      shownAtRef.current = null;
    }, delay);

    return () => window.clearTimeout(timer);
  }, [active, minMs]);

  return visible;
}
