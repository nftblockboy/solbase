"use client";

import { useState, type ReactNode } from "react";
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

type WalletGatedButtonProps = Readonly<{
  children: ReactNode;
  onConnectedClick?: () => void;
  className?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>;

export function WalletGatedButton({
  children,
  onConnectedClick,
  className,
  dialogTitle = "Connect wallet",
  dialogDescription = "Choose a wallet to use this feature.",
  open: controlledOpen,
  onOpenChange,
}: WalletGatedButtonProps) {
  const wallet = useWallet();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (value: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(value);
    }
    onOpenChange?.(value);
  };

  const isConnected = wallet.status === "connected";

  function handleTriggerClick() {
    if (isConnected) {
      onConnectedClick?.();
      return;
    }
    setOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleTriggerClick}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-hidden focus-visible:ring-offset-2",
          className
        )}
      >
        {children}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-md bg-white p-6 dark:bg-zinc-900">
          <DialogHeader>
            <DialogTitle className="text-zinc-900 dark:text-white">
              {dialogTitle}
            </DialogTitle>
            <DialogDescription className="text-zinc-600 dark:text-zinc-400">
              {dialogDescription}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <WalletConnectionDialogContent onConnected={() => setOpen(false)} />
          </div>
          <DialogClose />
        </DialogContent>
      </Dialog>
    </>
  );
}
