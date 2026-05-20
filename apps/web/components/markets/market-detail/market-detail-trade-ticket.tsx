"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/motion-primitives/dialog";
import type { TradeTicketDraft } from "@/lib/positions/types";
import { formatUsd } from "@/lib/portfolio/format";
import { cn } from "@/lib/utils";

type MarketDetailTradeTicketProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  draft: TradeTicketDraft | null;
}>;

function parseMarkPrice(side: TradeTicketDraft["side"], chancePct: number): number {
  const yes = chancePct / 100;
  return side === "yes" ? Math.max(yes, 0.01) : Math.max(1 - yes, 0.01);
}

export function MarketDetailTradeTicket({
  open,
  onOpenChange,
  draft,
}: MarketDetailTradeTicketProps) {
  const [amountUsd, setAmountUsd] = useState("100");

  const markPrice = draft ? parseMarkPrice(draft.side, draft.impliedChancePct) : 0;
  const stake = Number(amountUsd);
  const estimatedPayout = useMemo(() => {
    if (!draft || !Number.isFinite(stake) || stake <= 0 || markPrice <= 0) {
      return null;
    }
    return stake / markPrice;
  }, [draft, stake, markPrice]);

  const sideLabel = draft?.side === "yes" ? "YES" : "NO";
  const displayCents = draft?.side === "yes" ? draft.yesCents : draft?.noCents;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "fixed inset-y-0 right-0 left-auto m-0 flex h-full max-h-full w-full max-w-md",
          "translate-x-0 translate-y-0 flex-col rounded-none border-l border-border p-0"
        )}
      >
        <div className="flex flex-1 flex-col overflow-y-auto p-4">
          <DialogHeader className="text-left">
            <DialogTitle className="text-foreground">Trade ticket</DialogTitle>
            <DialogDescription className="text-xs text-muted">
              Preview only — execution is not enabled
            </DialogDescription>
          </DialogHeader>
          <DialogClose />

          {draft ? (
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex px-2 py-0.5 text-[10px] font-semibold uppercase",
                    draft.side === "yes"
                      ? "bg-emerald-500/15 text-emerald-500"
                      : "bg-red-400/15 text-red-400"
                  )}
                >
                  Buy {sideLabel}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted">
                  Coming soon
                </span>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground">{draft.marketTitle}</p>
                <p className="mt-1 text-xs text-muted">
                  Implied {draft.impliedChancePct}% YES · {displayCents}¢ {sideLabel}
                </p>
              </div>

              <label className="block text-xs text-muted">
                Amount (USD, preview)
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={amountUsd}
                  onChange={(e) => setAmountUsd(e.target.value)}
                  className="mt-1 w-full rounded-none border border-border bg-background px-2 py-2 text-sm tabular-nums text-foreground"
                />
              </label>

              <dl className="space-y-2 rounded-none border border-border-low bg-cream/50 p-3 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-muted">Est. payout if correct</dt>
                  <dd className="font-mono tabular-nums text-foreground">
                    {estimatedPayout != null
                      ? formatUsd(estimatedPayout, { compact: true })
                      : "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted">Mark (preview)</dt>
                  <dd className="font-mono tabular-nums text-foreground">
                    {(markPrice * 100).toFixed(1)}¢
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-none bg-primary/50 px-3 py-2.5 text-sm font-medium text-primary-foreground opacity-80"
                aria-disabled
              >
                Execution not enabled yet
              </button>

              <p className="text-center text-[10px] text-muted">
                Preview ticket · no orders submitted
              </p>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
