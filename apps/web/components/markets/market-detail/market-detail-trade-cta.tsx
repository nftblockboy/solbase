"use client";

import { useState } from "react";
import { useWallet } from "@solana/react-hooks";
import { useMounted } from "@/hooks/use-mounted";
import { useMarketTradeTicket } from "@/hooks/markets/use-market-trade-ticket";
import type { TradeTicketSide } from "@/lib/positions/types";
import { Surface } from "@/components/ui/surface";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/motion-primitives/dialog";
import { WalletConnectionDialogContent } from "@/components/ui/wallet-connection/wallet-connection-dialog-content";
import { cn } from "@/lib/utils";
import { MarketDetailTradeTicket } from "./market-detail-trade-ticket";

type MarketDetailTradeCtaProps = Readonly<{
  marketTitle: string;
  marketId: string;
  eventId: string;
  yesCents: string;
  noCents: string;
  chance: number;
}>;

export function MarketDetailTradeCta({
  marketTitle,
  marketId,
  eventId,
  yesCents,
  noCents,
  chance,
}: MarketDetailTradeCtaProps) {
  const mounted = useMounted();
  const wallet = useWallet();
  const isConnected = mounted && wallet.status === "connected";
  const [walletOpen, setWalletOpen] = useState(false);
  const { open, setOpen, draft, openTicketSide, closeTicket } = useMarketTradeTicket();

  const ticketBase = {
    marketTitle,
    marketId,
    eventId,
    impliedChancePct: chance,
    yesCents,
    noCents,
  };

  const handleSideClick = (side: TradeTicketSide) => {
    if (!isConnected) {
      setWalletOpen(true);
      return;
    }
    openTicketSide(side, ticketBase);
  };

  return (
    <>
      <Surface variant="panel" className="flex min-w-0 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
            Trade
          </p>
          <span className="rounded-none border border-border bg-cream px-2 py-0.5 text-[10px] font-medium uppercase text-muted">
            Coming soon
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSideClick("yes")}
            className={cn(
              "rounded-none border border-primary/40 bg-primary/15 py-3 text-center transition",
              "hover:bg-primary/25 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary"
            )}
          >
            <span className="block text-xs font-medium text-muted">Buy YES</span>
            <span className="mt-1 block text-lg font-semibold tabular-nums text-primary">
              {yesCents}¢
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleSideClick("no")}
            className={cn(
              "rounded-none border border-border bg-cream py-3 text-center transition",
              "hover:border-red-400/40 hover:bg-red-400/5 focus-visible:outline focus-visible:ring-2 focus-visible:ring-red-400/50"
            )}
          >
            <span className="block text-xs font-medium text-muted">Buy NO</span>
            <span className="mt-1 block text-lg font-semibold tabular-nums text-foreground">
              {noCents}¢
            </span>
          </button>
        </div>

        <p className="text-center text-xs text-muted" role="status">
          {isConnected
            ? "Trading preview — execution disabled."
            : "Connect wallet to trade — preview only, no orders yet."}
        </p>
      </Surface>

      <MarketDetailTradeTicket
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) closeTicket();
        }}
        draft={draft}
      />

      <Dialog open={walletOpen} onOpenChange={setWalletOpen}>
        <DialogContent className="w-full max-w-md bg-card p-6">
          <DialogHeader>
            <DialogTitle className="text-foreground">Connect wallet</DialogTitle>
            <DialogDescription className="text-muted">
              Connect your wallet to open the trade ticket preview.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <WalletConnectionDialogContent
              title="Wallet connection"
              description="Pick a connector to continue."
              onConnected={() => setWalletOpen(false)}
            />
          </div>
          <DialogClose />
        </DialogContent>
      </Dialog>
    </>
  );
}
