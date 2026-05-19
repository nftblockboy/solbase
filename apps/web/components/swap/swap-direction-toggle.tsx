"use client";

import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SwapDirectionToggleProps = Readonly<{
  onFlip: () => void;
  className?: string;
}>;

export function SwapDirectionToggle({
  onFlip,
  className,
}: SwapDirectionToggleProps) {
  return (
    <div className={cn("relative z-10 -my-3 flex justify-center", className)}>
      <button
        type="button"
        onClick={onFlip}
        aria-label="Flip swap direction"
        className="inline-flex size-8 items-center justify-center rounded-none border border-border bg-card text-foreground transition hover:border-accent hover:text-accent"
      >
        <ArrowUpDown className="size-4" aria-hidden />
      </button>
    </div>
  );
}
