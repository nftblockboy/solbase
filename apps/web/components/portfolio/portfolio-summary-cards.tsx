import type { PortfolioSummary } from "@/lib/mock/portfolio";
import {
  formatPct,
  formatPnl,
  formatUsd,
  pnlToneClass,
  riskScoreTone,
} from "@/lib/portfolio/format";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

type PortfolioSummaryCardsProps = Readonly<{
  summary: PortfolioSummary;
}>;

type MetricCardProps = Readonly<{
  label: string;
  value: string;
  valueClassName?: string;
  hint?: string;
}>;

function MetricCard({ label, value, valueClassName, hint }: MetricCardProps) {
  return (
    <Surface variant="card" className="flex flex-col gap-1 p-3">
      <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
      <span
        className={cn(
          "text-lg font-semibold tabular-nums text-foreground",
          valueClassName
        )}
      >
        {value}
      </span>
      {hint ? <span className="text-[10px] text-muted">{hint}</span> : null}
    </Surface>
  );
}

export function PortfolioSummaryCards({ summary }: PortfolioSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
      <MetricCard label="Total value" value={formatUsd(summary.totalValueUsd)} />
      <MetricCard
        label="Unrealized P&L"
        value={formatPnl(summary.unrealizedPnlUsd)}
        valueClassName={pnlToneClass(summary.unrealizedPnlUsd)}
      />
      <MetricCard
        label="Realized P&L"
        value={formatPnl(summary.realizedPnlUsd)}
        valueClassName={pnlToneClass(summary.realizedPnlUsd)}
      />
      <MetricCard label="Win rate" value={formatPct(summary.winRate)} />
      <MetricCard
        label="Open positions"
        value={String(summary.openPositionsCount)}
      />
      <MetricCard
        label="Largest exposure"
        value={formatUsd(summary.largestExposureUsd, { compact: true })}
        hint={summary.largestExposureLabel}
      />
      <MetricCard
        label="Risk score"
        value={`${summary.riskScore}/100`}
        valueClassName={riskScoreTone(summary.riskScore)}
      />
      <MetricCard
        label="Net P&L"
        value={formatPnl(
          summary.unrealizedPnlUsd + summary.realizedPnlUsd
        )}
        valueClassName={pnlToneClass(
          summary.unrealizedPnlUsd + summary.realizedPnlUsd
        )}
      />
    </div>
  );
}
