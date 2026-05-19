"use client";

import { WalletGatedButton } from "@/components/ui/wallet-connection/wallet-gated-button";
import { cn } from "@/lib/utils";

type SwapPrimaryActionProps = Readonly<{
  sellAmount: string;
  className?: string;
}>;

function parseAmount(value: string): number {
  const parsed = Number.parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function SwapPrimaryAction({
  sellAmount,
  className,
}: SwapPrimaryActionProps) {
  const hasAmount = parseAmount(sellAmount) > 0;

  const label = hasAmount ? "Swap" : "Enter an amount";

  const buttonClassName = cn(
    "h-11 w-full rounded-none text-sm font-semibold transition",
    hasAmount
      ? "bg-primary text-accent-foreground hover:opacity-90"
      : "cursor-not-allowed bg-primary/40 text-accent-foreground/80",
    className
  );

  if (!hasAmount) {
    return (
      <button type="button" disabled className={buttonClassName}>
        {label}
      </button>
    );
  }

  return (
    <WalletGatedButton
      className={cn(
        "h-11 w-full rounded-none bg-primary text-sm font-semibold text-accent-foreground hover:opacity-90",
        className
      )}
      dialogTitle="Connect wallet"
      dialogDescription="Connect a wallet to swap tokens."
      onConnectedClick={() => {
        // Future: trigger swap execution
      }}
    >
      {label}
    </WalletGatedButton>
  );
}
