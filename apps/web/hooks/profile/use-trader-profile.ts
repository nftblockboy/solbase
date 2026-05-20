"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getTraderProfileByWallet,
  type TraderProfileDetails,
} from "@/lib/mock/profile";

const LOAD_DELAY_MS = 300;

export type TraderProfileStatus = "loading" | "ready" | "not_found";

export function useTraderProfile(wallet: string) {
  const [status, setStatus] = useState<TraderProfileStatus>("loading");
  const [profile, setProfile] = useState<TraderProfileDetails | null>(null);
  const [followedIds, setFollowedIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setStatus("loading");

    const timer = globalThis.setTimeout(() => {
      const resolved = getTraderProfileByWallet(wallet);
      if (!resolved) {
        setProfile(null);
        setStatus("not_found");
        return;
      }

      setProfile(resolved);
      setStatus("ready");
    }, LOAD_DELAY_MS);

    return () => globalThis.clearTimeout(timer);
  }, [wallet]);

  const toggleFollow = useCallback((id: string) => {
    setFollowedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isFollowing = useCallback(
    (id: string) => followedIds.has(id),
    [followedIds]
  );

  return {
    status,
    profile,
    isFollowing,
    toggleFollow,
  };
}
