"use client";

import { useState } from "react";
import { useWallet, useWalletConnection } from "@solana/react-hooks";
import { SettingsField } from "./settings-field";
import { cn } from "@/lib/utils";

export function SettingsTabWallet() {
  const wallet = useWallet();
  const { disconnect } = useWalletConnection();
  const [copied, setCopied] = useState(false);

  const isConnected = wallet.status === "connected";
  const address = isConnected
    ? wallet.session.account.address.toString()
    : null;

  const copyAddress = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    globalThis.setTimeout(() => setCopied(false), 2000);
  };

  if (!isConnected || !address) {
    return (
      <p className="text-sm text-muted">
        No wallet connected. Use Connect in the navigation bar.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <SettingsField label="Connected address">
        <p className="break-all font-mono text-xs text-foreground">{address}</p>
      </SettingsField>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => void copyAddress()}
          className={cn(
            "rounded-none border border-border-low bg-cream px-3 py-1.5 text-xs font-medium",
            "text-foreground hover:border-accent hover:text-accent"
          )}
        >
          {copied ? "Copied" : "Copy address"}
        </button>
        <button
          type="button"
          onClick={() => void disconnect()}
          className={cn(
            "rounded-none border border-red-400/40 bg-red-400/10 px-3 py-1.5 text-xs font-medium",
            "text-red-400 hover:bg-red-400/20"
          )}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
