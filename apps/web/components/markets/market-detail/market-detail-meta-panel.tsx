import type { Market } from "@/lib/prediction/api";
import { Surface } from "@/components/ui/surface";
import { MarketDetailSectionHeading } from "./market-detail-section-heading";

type MarketDetailMetaPanelProps = Readonly<{
  market: Market;
}>;

function formatCloseTime(closeTime: number): string {
  return new Date(closeTime * 1000).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function MarketDetailMetaPanel({ market }: MarketDetailMetaPanelProps) {
  return (
    <Surface variant="panel" className="flex h-full flex-col gap-3 p-4">
      <MarketDetailSectionHeading>Market meta</MarketDetailSectionHeading>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between gap-2">
          <dt className="text-muted">Status</dt>
          <dd className="font-medium capitalize tabular-nums text-foreground">
            {market.status}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-muted">Closes</dt>
          <dd className="text-right text-xs tabular-nums text-foreground">
            {market.closeTime ? formatCloseTime(market.closeTime) : "—"}
          </dd>
        </div>
        {market.result ? (
          <div className="flex justify-between gap-2">
            <dt className="text-muted">Result</dt>
            <dd className="font-medium uppercase text-foreground">{market.result}</dd>
          </div>
        ) : null}
      </dl>
    </Surface>
  );
}
