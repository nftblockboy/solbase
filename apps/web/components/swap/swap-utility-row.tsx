"use client";

import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

type SwapUtilityRowProps = Readonly<{
  className?: string;
}>;

function UtilityButton({
  label,
  className,
}: Readonly<{ label: string; className?: string }>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-none border border-border bg-card text-xs font-medium text-foreground transition hover:border-accent hover:text-accent",
        className
      )}
    >
      <Eye className="size-3.5 text-muted" aria-hidden />
      {label}
    </button>
  );
}

export function SwapUtilityRow({ className }: SwapUtilityRowProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      <UtilityButton label="Show Chart" />
      <UtilityButton label="Show History" />
    </div>
  );
}
