import type { RiskExposure } from "@/lib/mock/portfolio";
import { formatPct, formatUsd } from "@/lib/portfolio/format";
import { Surface } from "@/components/ui/surface";
import { PortfolioSectionHeading } from "./portfolio-section-heading";

type PortfolioRiskBreakdownProps = Readonly<{
  riskExposures: RiskExposure[];
}>;

export function PortfolioRiskBreakdown({
  riskExposures,
}: PortfolioRiskBreakdownProps) {
  const sorted = [...riskExposures].sort(
    (a, b) => b.exposurePct - a.exposurePct
  );

  return (
    <Surface variant="panel" className="flex h-full flex-col p-4">
      <PortfolioSectionHeading
        title="Risk / exposure"
        subtitle="By category"
      />
      <ul className="flex flex-col gap-3">
        {sorted.map((row) => (
          <li key={row.category}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">{row.category}</span>
              <span className="tabular-nums text-muted">
                {formatUsd(row.exposureUsd, { compact: true })} ·{" "}
                {formatPct(row.exposurePct)} · {row.positionCount} pos
              </span>
            </div>
            <div className="h-1.5 w-full bg-cream">
              <div
                className="h-full bg-accent/80"
                style={{ width: `${Math.min(row.exposurePct, 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Surface>
  );
}
