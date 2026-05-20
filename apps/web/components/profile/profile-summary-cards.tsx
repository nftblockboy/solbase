import type { TraderStatSummary } from "@/lib/mock/profile";
import { formatFollowers } from "@/lib/leaderboard/format";
import {
  formatPct,
  formatPnl,
  formatUsd,
  pnlToneClass,
  riskScoreTone,
} from "@/lib/portfolio/format";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

type ProfileSummaryCardsProps = Readonly<{
  stats: TraderStatSummary;
}>;

function MetricCard({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
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
    </Surface>
  );
}

export function ProfileSummaryCards({ stats }: ProfileSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
      <MetricCard
        label="ROI (7d)"
        value={formatPct(stats.roiPct, true)}
        valueClassName={pnlToneClass(stats.roiPct)}
      />
      <MetricCard
        label="P&L (7d)"
        value={formatPnl(stats.pnlUsd)}
        valueClassName={pnlToneClass(stats.pnlUsd)}
      />
      <MetricCard label="Win rate" value={formatPct(stats.winRate)} />
      <MetricCard
        label="Volume"
        value={formatUsd(stats.volumeUsd, { compact: true })}
      />
      <MetricCard label="Followers" value={formatFollowers(stats.followers)} />
      <MetricCard
        label="Risk score"
        value={`${stats.riskScore}/100`}
        valueClassName={riskScoreTone(stats.riskScore)}
      />
    </div>
  );
}
