import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Market, PredictionEvent } from "@/lib/prediction/api";
import {
  getMarketTitle,
  getRenderableMarkets,
} from "@/lib/prediction/market-display";
import { getMarketPricing } from "@/lib/prediction/market-pricing";
import { Surface } from "@/components/ui/surface";
import { MarketDetailSectionHeading } from "./market-detail-section-heading";

type MarketDetailOutcomesProps = Readonly<{
  event: PredictionEvent;
  activeMarketId: string;
}>;

export function MarketDetailOutcomes({ event, activeMarketId }: MarketDetailOutcomesProps) {
  const allMarkets = getRenderableMarkets(event);
  if (allMarkets.length <= 1) return null;

  return (
    <Surface variant="panel" className="min-w-0 p-4">
      <MarketDetailSectionHeading className="mb-2">All outcomes</MarketDetailSectionHeading>
      <ul className="divide-y divide-border-low rounded-none border border-border">
        {allMarkets.map((m) => {
          const pricing = getMarketPricing(m);
          const active = m.marketId === activeMarketId;
          return (
            <li key={m.marketId}>
              <Link
                href={`/markets/market/${m.marketId}?event=${event.eventId}`}
                className={cn(
                  "flex items-center justify-between gap-3 px-3 py-2 text-sm transition hover:bg-cream/50",
                  active && "bg-cream"
                )}
              >
                <span className="truncate font-medium text-foreground">
                  {getMarketTitle(m, event)}
                </span>
                <span className="shrink-0 font-mono tabular-nums text-muted">
                  {pricing.chance}%
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Surface>
  );
}
