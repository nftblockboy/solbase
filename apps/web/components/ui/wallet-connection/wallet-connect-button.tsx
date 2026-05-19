"use client";

import { useState } from "react";
import { useWallet } from "@solana/react-hooks";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/motion-primitives/dialog";
import { cn } from "@/lib/utils";
import { WalletConnectionDialogContent } from "./wallet-connection-dialog-content";

function truncate(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export function WalletConnectButton() {
  const wallet = useWallet();
  const [open, setOpen] = useState(false);

  const isConnected = wallet.status === "connected";
  const address = isConnected
    ? wallet.session.account.address.toString()
    : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
        )}
      >
        {address ? (
          <span className="font-mono">{truncate(address)}</span>
        ) : (
          <span>Connect wallet</span>
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-md bg-white p-6 dark:bg-zinc-900">
          <DialogHeader>
            <DialogTitle className="text-zinc-900 dark:text-white">
              Wallet
            </DialogTitle>
            <DialogDescription className="text-zinc-600 dark:text-zinc-400">
              Connect, switch, or disconnect your wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <WalletConnectionDialogContent
              title="Wallet connection"
              description="Pick any discovered connector and manage connect / disconnect."
            />
          </div>
          <DialogClose />
        </DialogContent>
      </Dialog>
    </>
  );
}