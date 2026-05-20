import type { MarketMovement } from "@/lib/mock/market-intelligence";
import { formatNumber } from "@/lib/prediction/utils";
import { formatPct } from "@/lib/portfolio/format";
import { Surface } from "@/components/ui/surface";
import { MarketDetailSectionHeading } from "./market-detail-section-heading";
type MarketDetailMovementPanelProps = Readonly<{
  movement: MarketMovement;
}>;

function MetricRow({
  label,
  value,
  sub,
}: Readonly<{ label: string; value: string; sub?: string }>) {
  return (
    <div className="flex items-baseline justify-between gap-2 border-b border-border-low py-2 last:border-0">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-right">
        <span className="font-mono text-sm tabular-nums text-foreground">{value}</span>
        {sub ? <span className="ml-1 text-[10px] text-muted">{sub}</span> : null}
      </span>
    </div>
  );
}

export function MarketDetailMovementPanel({ movement }: MarketDetailMovementPanelProps) {
  const fmtUsd = (n: number | null) =>
    n != null && n > 0 ? `$${formatNumber(n)}` : "—";

  return (
    <Surface variant="panel" className="flex min-w-0 flex-col gap-2 p-4">
      <MarketDetailSectionHeading>Market movement</MarketDetailSectionHeading>
      <div className="min-w-0">
        <MetricRow label="Implied chance" value={`${movement.chancePct}%`} />
        <MetricRow
          label="24h change"
          value={formatPct(movement.change24hPct, true)}
          sub={movement.change24hIsMock ? "mock" : undefined}
        />
        <MetricRow
          label="7d change"
          value={formatPct(movement.change7dPct, true)}
          sub={movement.change7dIsMock ? "mock" : undefined}
        />
        <MetricRow label="Volume" value={fmtUsd(movement.volumeTotal)} />
        <MetricRow label="24h volume" value={fmtUsd(movement.volume24h)} />
        <MetricRow label="Liquidity" value={fmtUsd(movement.liquidity)} />
        <MetricRow label="Open interest" value={fmtUsd(movement.openInterest)} />
        <MetricRow
          label="Activity (mock)"
          value={String(movement.activityCount)}
        />
      </div>
    </Surface>
  );
}
