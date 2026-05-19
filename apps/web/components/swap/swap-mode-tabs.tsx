"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type SwapMode = "market" | "limit" | "recurring";

const MODES: { id: SwapMode; label: string }[] = [
  { id: "market", label: "Market" },
  { id: "limit", label: "Limit" },
  { id: "recurring", label: "Recurring" },
];

type SwapModeTabsProps = Readonly<{
  mode: SwapMode;
  onModeChange: (mode: SwapMode) => void;
}>;

export function SwapModeTabs({ mode, onModeChange }: SwapModeTabsProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div
        className="flex items-center gap-1"
        role="tablist"
        aria-label="Swap mode"
      >
        {MODES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={mode === id}
            onClick={() => onModeChange(id)}
            className={cn(
              "rounded-none px-3 py-1.5 text-sm font-medium transition",
              mode === id
                ? "bg-cream text-accent"
                : "text-muted hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-none border border-border px-2.5 text-xs font-medium text-foreground transition hover:border-accent hover:text-accent"
        aria-label="Ultra mode"
      >
        Ultra
        <Sparkles className="size-3.5" aria-hidden />
      </button>
    </div>
  );
}
