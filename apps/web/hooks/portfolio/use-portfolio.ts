"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/react-hooks";
import { mapMockPortfolioPosition } from "@/lib/positions/adapters";
import {
  getMockPortfolio,
  type PortfolioMockData,
} from "@/lib/mock/portfolio";

export type PortfolioStatus = "disconnected" | "loading" | "ready" | "empty";

const LOAD_DELAY_MS = 320;

export function usePortfolio() {
  const wallet = useWallet();
  const isConnected = wallet.status === "connected";
  const walletAddress = isConnected
    ? wallet.session.account.address.toString()
    : undefined;

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<PortfolioMockData | null>(null);

  useEffect(() => {
    if (!isConnected) {
      setIsLoading(false);
      setData(null);
      return;
    }

    setIsLoading(true);
    const timer = window.setTimeout(() => {
      // TODO: replace mock source with Jupiter positions when API is wired
      const portfolio = getMockPortfolio();
      const normalized: PortfolioMockData = {
        ...portfolio,
        positions: portfolio.positions.map(mapMockPortfolioPosition),
      };
      setData(normalized.positions.length === 0 ? null : normalized);
      setIsLoading(false);
    }, LOAD_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [isConnected, walletAddress]);

  let status: PortfolioStatus;
  if (!isConnected) {
    status = "disconnected";
  } else if (isLoading) {
    status = "loading";
  } else if (!data) {
    status = "empty";
  } else {
    status = "ready";
  }

  return {
    status,
    isLoading,
    data,
    walletAddress,
  };
}
