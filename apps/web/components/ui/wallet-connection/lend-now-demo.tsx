"use client";

import { WalletGatedButton } from "./wallet-gated-button";

export function LendNowDemo() {
  return (
    <WalletGatedButton
      onConnectedClick={() => {
        console.log("Lend flow started");
      }}
      className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
      dialogTitle="Connect wallet"
      dialogDescription="Choose a wallet to lend with."
    >
      Lend Now
    </WalletGatedButton>
  );
}
