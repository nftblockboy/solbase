import type { Market } from "@/lib/prediction/api";
import { Surface } from "@/components/ui/surface";
import { MarketDetailSectionHeading } from "./market-detail-section-heading";

type MarketDetailRulesProps = Readonly<{
  market: Market;
}>;

export function MarketDetailRules({ market }: MarketDetailRulesProps) {
  if (!market.rulesPrimary) return null;

  return (
    <Surface variant="panel" className="min-w-0 p-4">
      <MarketDetailSectionHeading className="mb-2">Rules</MarketDetailSectionHeading>
      <p className="text-xs leading-relaxed text-muted">{market.rulesPrimary}</p>
    </Surface>
  );
}
