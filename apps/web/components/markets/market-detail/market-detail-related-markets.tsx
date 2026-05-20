import Link from "next/link";
import type { RelatedMarketItem } from "@/lib/mock/market-intelligence";
import { Surface } from "@/components/ui/surface";
import { MarketDetailSectionHeading } from "./market-detail-section-heading";

type MarketDetailRelatedMarketsProps = Readonly<{
  items: RelatedMarketItem[];
}>;

export function MarketDetailRelatedMarkets({ items }: MarketDetailRelatedMarketsProps) {
  return (
    <Surface variant="panel" className="flex min-w-0 flex-col gap-2 p-4">
      <MarketDetailSectionHeading>Related markets</MarketDetailSectionHeading>
      {items.length === 0 ? (
        <p className="text-xs text-muted">No sibling outcomes in this event.</p>
      ) : (
        <ul className="divide-y divide-border-low">
          {items.map((item) => (
            <li key={item.marketId}>
              <Link
                href={item.href}
                className="flex items-center justify-between gap-2 py-2 text-sm transition hover:text-accent"
              >
                <span className="min-w-0 truncate font-medium text-foreground">
                  {item.title}
                </span>
                <span className="shrink-0 font-mono tabular-nums text-muted">
                  {item.chancePct}%
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Surface>
  );
}
