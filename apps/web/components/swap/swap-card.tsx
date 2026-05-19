import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Surface } from "@/components/ui/surface";

type SwapCardProps = PropsWithChildren<{
  className?: string;
}>;

export function SwapCard({ children, className }: SwapCardProps) {
  return (
    <Surface variant="card" className={cn("p-3", className)}>
      {children}
    </Surface>
  );
}
