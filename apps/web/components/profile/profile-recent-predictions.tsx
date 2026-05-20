import type { TraderPrediction } from "@/lib/mock/profile";
import { formatPnl, formatUsd, pnlToneClass } from "@/lib/portfolio/format";
import { timeAgo } from "@/lib/prediction/utils";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";
import { ProfileSectionHeading } from "./profile-section-heading";

type ProfileRecentPredictionsProps = Readonly<{
  predictions: TraderPrediction[];
}>;

export function ProfileRecentPredictions({
  predictions,
}: ProfileRecentPredictionsProps) {
  return (
    <Surface variant="panel" className="flex h-full flex-col p-4">
      <ProfileSectionHeading title="Recent predictions" subtitle="Mock settled trades" />
      <ul className="flex flex-1 flex-col divide-y divide-border-low overflow-y-auto">
        {predictions.map((trade) => (
          <li
            key={trade.id}
            className="flex flex-col gap-1 py-2.5 first:pt-0 last:pb-0"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="line-clamp-2 text-sm font-medium text-foreground">
                {trade.marketTitle}
              </span>
              <span className="shrink-0 text-[10px] tabular-nums text-muted">
                {timeAgo(trade.timestamp)}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">
              <span>
                {trade.outcome} ·{" "}
                <span
                  className={cn(
                    "font-semibold uppercase",
                    trade.side === "yes" ? "text-emerald-500" : "text-red-400"
                  )}
                >
                  {trade.side}
                </span>
              </span>
              <span className="tabular-nums">{formatUsd(trade.amountUsd)}</span>
              <span
                className={cn(
                  "tabular-nums font-medium",
                  pnlToneClass(trade.pnlUsd)
                )}
              >
                {formatPnl(trade.pnlUsd)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Surface>
  );
}
