"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrades } from "@/lib/prediction/api";

export function useTrades() {
  return useQuery({
    queryKey: ["prediction-trades"],
    queryFn: getTrades,
    refetchInterval: 15_000,
    staleTime: 10_000,
  });
}
