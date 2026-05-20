"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { useWallet } from "@solana/react-hooks";
import { navControlClassName } from "@/components/core/nav-control-styles";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { SettingsDialog } from "./settings-dialog";

export function SettingsGearButton() {
  const mounted = useMounted();
  const wallet = useWallet();
  const [open, setOpen] = useState(false);

  if (!mounted) {
    return (
      <span
        className={cn(navControlClassName, "min-w-8 px-2 opacity-0")}
        aria-hidden
      />
    );
  }

  if (wallet.status !== "connected") {
    return (
      <span
        className={cn(navControlClassName, "min-w-8 px-2 opacity-0")}
        aria-hidden
      />
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(navControlClassName, "min-w-8 px-2")}
        aria-label="Settings"
      >
        <Settings className="h-4 w-4" aria-hidden />
      </button>
      <SettingsDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
