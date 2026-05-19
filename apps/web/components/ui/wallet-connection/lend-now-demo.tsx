"use client";

import { WalletGatedButton } from "./wallet-gated-button";

export function LendNowDemo() {
  return (
    <WalletGatedButton
      onConnectedClick={() => {
        console.log("Lend flow started");
      }}
      className="rounded-none bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:opacity-90"
      dialogTitle="Connect wallet"
      dialogDescription="Choose a wallet to lend with."
    >
      Lend Now
    </WalletGatedButton>
  );
}
