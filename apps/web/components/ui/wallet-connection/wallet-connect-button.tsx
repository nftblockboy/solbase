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
import { navControlClassName } from "@/components/core/nav-control-styles";
import { cn } from "@/lib/utils";
import { WalletConnectionDialogContent } from "./wallet-connection-dialog-content";

function truncate(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export function WalletConnectButton({content = "Connect"}: {content?: React.ReactNode}) {
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
        className={cn(navControlClassName, "whitespace-nowrap px-3")}
      >
        {address ? (
          <span className="font-mono">{truncate(address)}</span>
        ) : (
          <span>{content}</span>
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-md bg-card p-6">
          <DialogHeader>
            <DialogTitle className="text-foreground">Wallet</DialogTitle>
            <DialogDescription className="text-muted">
              Connect, switch, or disconnect your wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <WalletConnectionDialogContent
              title="Wallet connection"
              description="Pick any discovered connector and manage connect / disconnect."
              onConnected={() => setOpen(false)}
            />
          </div>
          <DialogClose />
        </DialogContent>
      </Dialog>
    </>
  );
}