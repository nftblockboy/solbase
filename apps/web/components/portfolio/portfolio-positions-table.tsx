import Link from "next/link";
import type { PortfolioPosition } from "@/lib/mock/portfolio";
import { resolveMarketLink } from "@/lib/markets/market-link";
import {
  formatPct,
  formatPnl,
  formatUsd,
  pnlToneClass,
} from "@/lib/portfolio/format";
import { Surface } from "@/components/ui/surface";
import { PortfolioSectionHeading } from "./portfolio-section-heading";
import { cn } from "@/lib/utils";

type PortfolioPositionsTableProps = Readonly<{
  positions: PortfolioPosition[];
}>;

function SideBadge({ side }: { side: "yes" | "no" }) {
  return (
    <span
      className={cn(
        "inline-flex px-1.5 py-0.5 text-[10px] font-semibold uppercase",
        side === "yes"
          ? "bg-emerald-500/15 text-emerald-500"
          : "bg-red-400/15 text-red-400"
      )}
    >
      {side}
    </span>
  );
}

function positionMarketHref(position: PortfolioPosition): string | null {
  if (!position.marketSlug) return null;
  return resolveMarketLink({
    slug: position.marketSlug,
    title: position.marketTitle,
  });
}

function PositionCard({ position }: { position: PortfolioPosition }) {
  const marketHref = positionMarketHref(position);

  return (
    <Surface variant="card" className="flex flex-col gap-2 p-3 lg:hidden">
      <div className="flex items-start justify-between gap-2">
        {marketHref ? (
          <Link
            href={marketHref}
            className="text-sm font-medium text-foreground hover:text-accent"
          >
            {position.marketTitle}
          </Link>
        ) : (
          <span className="text-sm font-medium text-foreground">
            {position.marketTitle}
          </span>
        )}
        <SideBadge side={position.side} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-muted">Outcome</span>
          <p className="font-medium text-foreground">{position.outcome}</p>
        </div>
        <div>
          <span className="text-muted">Size</span>
          <p className="tabular-nums font-medium">{formatUsd(position.sizeUsd)}</p>
        </div>
        <div>
          <span className="text-muted">Avg → Mark</span>
          <p className="tabular-nums">
            {(position.avgPrice * 100).toFixed(0)}¢ →{" "}
            {(position.markPrice * 100).toFixed(0)}¢
          </p>
        </div>
        <div>
          <span className="text-muted">Unrealized</span>
          <p
            className={cn(
              "tabular-nums font-medium",
              pnlToneClass(position.unrealizedPnlUsd)
            )}
          >
            {formatPnl(position.unrealizedPnlUsd)} (
            {formatPct(position.unrealizedPnlPct, true)})
          </p>
        </div>
      </div>
    </Surface>
  );
}

export function PortfolioPositionsTable({
  positions,
}: PortfolioPositionsTableProps) {
  return (
    <Surface variant="panel" className="p-4">
      <PortfolioSectionHeading
        title="Open positions"
        subtitle={`${positions.length} active`}
      />

      <div className="flex flex-col gap-2 lg:hidden">
        {positions.map((p) => (
          <PositionCard key={p.id} position={p} />
        ))}
      </div>

      <div className="scrollbar-hide hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border-low text-[10px] uppercase tracking-wider text-muted">
              <th className="pb-2 pr-3 font-medium">Market</th>
              <th className="pb-2 pr-3 font-medium">Outcome</th>
              <th className="pb-2 pr-3 font-medium">Side</th>
              <th className="pb-2 pr-3 text-right font-medium">Size</th>
              <th className="pb-2 pr-3 text-right font-medium">Avg</th>
              <th className="pb-2 pr-3 text-right font-medium">Mark</th>
              <th className="pb-2 pr-3 text-right font-medium">Unrealized</th>
              <th className="pb-2 text-right font-medium">Exp %</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => {
              const marketHref = positionMarketHref(position);
              return (
                <tr
                  key={position.id}
                  className="border-b border-border-low/60 hover:bg-cream/50"
                >
                  <td className="max-w-[220px] py-2.5 pr-3">
                    {marketHref ? (
                      <Link
                        href={marketHref}
                        className="line-clamp-2 font-medium text-foreground hover:text-accent"
                      >
                        {position.marketTitle}
                      </Link>
                    ) : (
                      <span className="line-clamp-2 font-medium">
                        {position.marketTitle}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 pr-3 text-muted">{position.outcome}</td>
                  <td className="py-2.5 pr-3">
                    <SideBadge side={position.side} />
                  </td>
                  <td className="py-2.5 pr-3 text-right tabular-nums">
                    {formatUsd(position.sizeUsd)}
                  </td>
                  <td className="py-2.5 pr-3 text-right tabular-nums text-muted">
                    {(position.avgPrice * 100).toFixed(1)}¢
                  </td>
                  <td className="py-2.5 pr-3 text-right tabular-nums">
                    {(position.markPrice * 100).toFixed(1)}¢
                  </td>
                  <td
                    className={cn(
                      "py-2.5 pr-3 text-right tabular-nums font-medium",
                      pnlToneClass(position.unrealizedPnlUsd)
                    )}
                  >
                    {formatPnl(position.unrealizedPnlUsd)}
                    <span className="ml-1 text-xs font-normal text-muted">
                      ({formatPct(position.unrealizedPnlPct, true)})
                    </span>
                  </td>
                  <td className="py-2.5 text-right tabular-nums text-muted">
                    {formatPct(position.exposurePct)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Surface>
  );
}
