"use client";

import { useMemo } from "react";
import { useWallet } from "@solana/react-hooks";
import {
  findPositionForMarket,
  mapMockPortfolioPosition,
} from "@/lib/positions/adapters";
import type { MarketPositionContextState } from "@/lib/positions/types";
import { getMockPortfolio } from "@/lib/mock/portfolio";
import { getMarketTitle } from "@/lib/prediction/market-display";
import type { Market, PredictionEvent } from "@/lib/prediction/api";

/** @deprecated Use `MarketPositionContextState` from `@/lib/positions/types` */
export type MarketPositionContext = MarketPositionContextState;

export function useMarketPositionContext(
  event: PredictionEvent | undefined,
  market: Market | undefined,
  marketId: string,
  eventId: string
): MarketPositionContextState {
  const wallet = useWallet();
  const isConnected = wallet.status === "connected";

  return useMemo(() => {
    if (!isConnected) {
      return { status: "disconnected" };
    }

    if (!event || !market) {
      return { status: "none" };
    }

    // TODO: replace mock source with Jupiter positions when API is wired
    const positions = getMockPortfolio().positions.map(mapMockPortfolioPosition);
    const marketTitle = getMarketTitle(market, event);
    const position = findPositionForMarket(positions, {
      marketId,
      eventId,
      marketTitle,
    });

    if (!position) {
      return { status: "none" };
    }

    return { status: "position", position };
  }, [isConnected, event, market, marketId, eventId]);
}
