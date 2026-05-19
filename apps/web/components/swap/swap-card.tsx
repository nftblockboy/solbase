import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type SwapCardProps = PropsWithChildren<{
  className?: string;
}>;

export function SwapCard({ children, className }: SwapCardProps) {
  return (
    <div
      className={cn(
        "rounded-none border border-border bg-card p-3 shadow-[0_20px_80px_-50px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      {children}
    </div>
  );
}
