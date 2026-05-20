"use client";

import { useState } from "react";
import { useWallet } from "@solana/react-hooks";
import { useMounted } from "@/hooks/use-mounted";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/motion-primitives/dialog";
import { navControlClassName } from "@/components/core/nav-control-styles";
import { walletNavIdentity } from "@/lib/wallet/nav-identity";
import { cn } from "@/lib/utils";
import { WalletConnectionDialogContent } from "./wallet-connection-dialog-content";

function WalletNavAddress({ address }: { address: string }) {
  const start = address.slice(0, 4);
  const end = address.slice(-4);

  return (
    <span className="inline-flex items-center font-mono tabular-nums">
      <span>{start}</span>
      <span
        className="mx-0.5 inline-flex gap-0.5 text-muted"
        aria-hidden
      >
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
      <span>{end}</span>
    </span>
  );
}

function WalletNavOnlineDot() {
  return (
    <span
      className="relative inline-flex h-2 w-2 shrink-0"
      aria-hidden
    >
      <span
        className={cn(
          "absolute inline-flex h-full w-full rounded-full bg-emerald-400/40 motion-safe:animate-ping"
        )}
      />
      <span
        className={cn(
          "relative inline-flex h-2 w-2 rounded-full bg-emerald-500",
          "shadow-[0_0_6px_2px_rgba(52,211,153,0.55)]"
        )}
      />
    </span>
  );
}

function WalletNavAvatar({ address }: { address: string }) {
  const { initials, color } = walletNavIdentity(address);

  return (
    <span
      className="inline-flex size-5 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold leading-none text-white"
      style={{ backgroundColor: color }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

export function WalletConnectButton({
  content = "Connect",
}: {
  content?: React.ReactNode;
}) {
  const mounted = useMounted();
  const wallet = useWallet();
  const [open, setOpen] = useState(false);

  const isConnected = mounted && wallet.status === "connected";
  const address = isConnected
    ? wallet.session.account.address.toString()
    : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          navControlClassName,
          address
            ? "gap-2 whitespace-nowrap px-2.5"
            : "whitespace-nowrap px-3"
        )}
        aria-label={address ? `Wallet ${address}` : "Connect wallet"}
      >
        {address ? (
          <>
            <WalletNavOnlineDot />
            <WalletNavAddress address={address} />
            <WalletNavAvatar address={address} />
          </>
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
