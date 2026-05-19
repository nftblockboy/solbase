import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Surface } from "@/components/ui/surface";

type MarketCardFrameProps = PropsWithChildren<{
  className?: string;
}>;

export function MarketCardFrame({ children, className }: MarketCardFrameProps) {
  return (
    <Surface
      as="article"
      variant="card"
      className={cn(
        "flex flex-col p-3 transition hover:border-accent/50",
        className
      )}
    >
      {children}
    </Surface>
  );
}
