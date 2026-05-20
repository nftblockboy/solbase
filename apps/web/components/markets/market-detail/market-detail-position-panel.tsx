import type { MarketPositionContext } from "@/hooks/markets/use-market-position-context";
import {
  formatPct,
  formatPnl,
  formatUsd,
  pnlToneClass,
} from "@/lib/portfolio/format";
import { Surface } from "@/components/ui/surface";
import { WalletConnectButton } from "@/components/ui/wallet-connection";
import { MarketDetailSectionHeading } from "./market-detail-section-heading";
import { cn } from "@/lib/utils";

type MarketDetailPositionPanelProps = Readonly<{
  context: MarketPositionContext;
}>;

export function MarketDetailPositionPanel({ context }: MarketDetailPositionPanelProps) {
  return (
    <Surface variant="panel" className="flex min-w-0 flex-col gap-3 p-4">
      <MarketDetailSectionHeading>Your position</MarketDetailSectionHeading>
      {context.status === "disconnected" ? (
        <div className="space-y-3">
          <p className="text-xs text-muted">
            Connect a wallet to see mock desk positions for mapped markets.
          </p>
          <WalletConnectButton />
        </div>
      ) : null}
      {context.status === "none" ? (
        <p className="text-xs text-muted">
          No mock position for this market in your connected portfolio.
        </p>
      ) : null}
      {context.status === "position" ? (
        <div className="space-y-2 text-sm">
          <p className="font-medium text-foreground">{context.position.marketTitle}</p>
          <p className="text-xs text-muted">
            {context.position.side.toUpperCase()} · {context.position.outcome}
          </p>
          <dl className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <dt className="text-muted">Size</dt>
              <dd className="font-mono tabular-nums">{formatUsd(context.position.sizeUsd)}</dd>
            </div>
            <div>
              <dt className="text-muted">Mark</dt>
              <dd className="font-mono tabular-nums">
                {(context.position.markPrice * 100).toFixed(0)}¢
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted">Unrealized P&amp;L</dt>
              <dd
                className={cn(
                  "font-mono tabular-nums",
                  pnlToneClass(context.position.unrealizedPnlUsd)
                )}
              >
                {formatPnl(context.position.unrealizedPnlUsd)} (
                {formatPct(context.position.unrealizedPnlPct, true)})
              </dd>
            </div>
          </dl>
          <p className="text-[10px] text-muted">Mock portfolio · not on-chain</p>
        </div>
      ) : null}
    </Surface>
  );
}
