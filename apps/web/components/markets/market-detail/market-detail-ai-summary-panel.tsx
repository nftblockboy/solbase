import type { MarketAiSummary } from "@/lib/mock/market-intelligence";
import { Surface } from "@/components/ui/surface";
import { MarketDetailSectionHeading } from "./market-detail-section-heading";

type MarketDetailAiSummaryPanelProps = Readonly<{
  summary: MarketAiSummary;
}>;

function SummaryBlock({ label, body }: Readonly<{ label: string; body: string }>) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-foreground">{body}</p>
    </div>
  );
}

export function MarketDetailAiSummaryPanel({ summary }: MarketDetailAiSummaryPanelProps) {
  return (
    <Surface variant="panel" className="flex min-w-0 flex-col gap-3 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <MarketDetailSectionHeading>AI market summary</MarketDetailSectionHeading>
        <span className="text-[10px] text-muted">
          Static desk summary · not a live model
        </span>
      </div>
      <p className="text-sm font-medium text-foreground">{summary.headline}</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryBlock label="Bull case" body={summary.bullCase} />
        <SummaryBlock label="Bear case" body={summary.bearCase} />
        <SummaryBlock label="Key catalyst" body={summary.keyCatalyst} />
        <SummaryBlock label="Risk factor" body={summary.riskFactor} />
      </div>
    </Surface>
  );
}
