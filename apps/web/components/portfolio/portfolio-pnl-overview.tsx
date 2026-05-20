import type { PnlHistoryPoint } from "@/lib/mock/portfolio";
import { formatPnl, pnlToneClass } from "@/lib/portfolio/format";
import { Surface } from "@/components/ui/surface";
import { PortfolioSectionHeading } from "./portfolio-section-heading";
import { cn } from "@/lib/utils";

type PortfolioPnlOverviewProps = Readonly<{
  pnlHistory: PnlHistoryPoint[];
}>;

/** Total plot height; zero line sits at the vertical center. */
const CHART_HEIGHT_PX = 120;
const MIN_BAR_HEIGHT_PX = 4;
const VALUE_LABEL_HEIGHT_PX = 14;
const DAY_LABEL_HEIGHT_PX = 14;

function barHeightPx(value: number, maxAbs: number): number {
  const half = CHART_HEIGHT_PX / 2;
  return Math.max(
    MIN_BAR_HEIGHT_PX,
    Math.round((Math.abs(value) / maxAbs) * half)
  );
}

export function PortfolioPnlOverview({ pnlHistory }: PortfolioPnlOverviewProps) {
  const maxAbsDaily = Math.max(
    ...pnlHistory.map((p) => Math.abs(p.dailyPnlUsd)),
    1
  );
  const latest = pnlHistory[pnlHistory.length - 1];
  const halfHeight = CHART_HEIGHT_PX / 2;

  return (
    <Surface variant="panel" className="flex h-full flex-col p-4">
      <PortfolioSectionHeading
        title="P&L overview"
        subtitle={`7d cumulative ${formatPnl(latest?.cumulativePnlUsd ?? 0)}`}
      />
      <div className="mt-2 flex flex-col gap-2">
        <div className="flex gap-1">
          {/* Y-axis aligned with plot area */}
          <div
            className="flex shrink-0 flex-col items-end pr-1"
            aria-hidden
          >
            <span style={{ height: VALUE_LABEL_HEIGHT_PX }} />
            <div
              className="grid w-4 text-[9px] leading-none text-muted"
              style={{
                height: CHART_HEIGHT_PX,
                gridTemplateRows: "1fr auto 1fr",
              }}
            >
              <span className="self-start">+</span>
              <span className="border-t border-foreground/25 py-0.5 text-center tabular-nums text-foreground/60">
                0
              </span>
              <span className="self-end">-</span>
            </div>
            <span style={{ height: DAY_LABEL_HEIGHT_PX }} />
          </div>

          <div
            className="grid min-w-0 flex-1 gap-1"
            style={{
              gridTemplateColumns: `repeat(${pnlHistory.length}, minmax(0, 1fr))`,
            }}
          >
            {pnlHistory.map((point) => {
              const positive = point.dailyPnlUsd >= 0;
              const height = barHeightPx(point.dailyPnlUsd, maxAbsDaily);

              return (
                <div
                  key={point.date}
                  className="flex min-w-0 flex-col items-center gap-1"
                >
                  <span
                    className={cn(
                      "flex h-[14px] items-center whitespace-nowrap text-[9px] tabular-nums leading-none",
                      pnlToneClass(point.dailyPnlUsd)
                    )}
                  >
                    {formatPnl(point.dailyPnlUsd)}
                  </span>

                  <div
                    className="relative w-full"
                    style={{ height: CHART_HEIGHT_PX }}
                    title={`${point.date}: ${formatPnl(point.dailyPnlUsd)}`}
                  >
                    {/* Positive: grow upward from center */}
                    <div
                      className="absolute inset-x-0 top-0 flex items-end justify-center"
                      style={{ height: halfHeight }}
                    >
                      {positive ? (
                        <div
                          className="w-[70%] max-w-8 min-w-[6px] bg-emerald-500/80"
                          style={{ height }}
                        />
                      ) : null}
                    </div>

                    {/* Zero reference line */}
                    <div
                      className="pointer-events-none absolute inset-x-0 z-10 border-t-2 border-foreground/30"
                      style={{ top: halfHeight }}
                    />

                    {/* Negative: grow downward from center */}
                    <div
                      className="absolute inset-x-0 bottom-0 flex items-start justify-center"
                      style={{ height: halfHeight }}
                    >
                      {!positive ? (
                        <div
                          className="w-[70%] max-w-8 min-w-[6px] bg-red-400/80"
                          style={{ height }}
                        />
                      ) : null}
                    </div>
                  </div>

                  <span className="flex h-[14px] items-center text-[10px] text-muted">
                    {point.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-muted">
          Daily P&amp;L (mock). Green bars rise above zero; red bars fall below.
          Height scales to the largest daily move this week.
        </p>
      </div>
    </Surface>
  );
}
