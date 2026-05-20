"use client";

import { usePortfolio } from "@/hooks/portfolio/use-portfolio";
import { truncateAddress } from "@/lib/prediction/utils";
import { PortfolioAiInsights } from "./portfolio-ai-insights";
import { PortfolioDisconnectedState } from "./portfolio-disconnected-state";
import { PortfolioEmptyState } from "./portfolio-empty-state";
import { PortfolioLoadingSkeleton } from "./portfolio-loading-skeleton";
import { PortfolioPnlOverview } from "./portfolio-pnl-overview";
import { PortfolioPositionsTable } from "./portfolio-positions-table";
import { PortfolioRecentTrades } from "./portfolio-recent-trades";
import { PortfolioRiskBreakdown } from "./portfolio-risk-breakdown";
import { PortfolioSummaryCards } from "./portfolio-summary-cards";

function formatUpdatedAt(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function PortfolioShell() {
  const { status, data, walletAddress } = usePortfolio();

  if (status === "disconnected") {
    return <PortfolioDisconnectedState />;
  }

  if (status === "loading") {
    return <PortfolioLoadingSkeleton />;
  }

  if (status === "empty" || !data) {
    return <PortfolioEmptyState />;
  }

  const { summary, positions, recentTrades, riskExposures, aiInsights, pnlHistory } =
    data;

  return (
    <div className="flex w-full flex-col gap-4 pb-6">
      <header className="flex flex-col gap-2 border-b border-border pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Portfolio</h1>
          <p className="text-xs text-muted">
            Prediction positions · mock dashboard
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          {walletAddress ? (
            <span className="rounded-none border border-border-low bg-cream px-2 py-1 font-mono tabular-nums text-foreground">
              {truncateAddress(walletAddress, 6)}
            </span>
          ) : null}
          <span className="tabular-nums">
            Updated {formatUpdatedAt(summary.updatedAt)}
          </span>
        </div>
      </header>

      <PortfolioSummaryCards summary={summary} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PortfolioPnlOverview pnlHistory={pnlHistory} />
        </div>
        <PortfolioRiskBreakdown riskExposures={riskExposures} />
      </div>

      <PortfolioPositionsTable positions={positions} />

      <div className="grid gap-4 xl:grid-cols-2">
        <PortfolioAiInsights insights={aiInsights} />
        <PortfolioRecentTrades trades={recentTrades} />
      </div>
    </div>
  );
}
