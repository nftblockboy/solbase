type MarketDetailPriceStripProps = Readonly<{
  yesCents: string;
  noCents: string;
  chance: number;
  volumeLabel: string;
}>;

export function MarketDetailPriceStrip({
  yesCents,
  noCents,
  chance,
  volumeLabel,
}: MarketDetailPriceStripProps) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-none border border-primary/30 bg-primary/10 py-4 text-center">
          <p className="text-xs font-medium text-muted">Yes</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-primary">
            {yesCents}¢
          </p>
        </div>
        <div className="rounded-none border border-border-low bg-cream py-4 text-center">
          <p className="text-xs font-medium text-muted">No</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
            {noCents}¢
          </p>
        </div>
      </div>
      <p className="text-center text-sm text-muted">
        Implied chance:{" "}
        <span className="font-mono text-foreground">{chance}%</span>
        {" · "}
        <span className="tabular-nums">${volumeLabel} vol</span>
      </p>
    </div>
  );
}
