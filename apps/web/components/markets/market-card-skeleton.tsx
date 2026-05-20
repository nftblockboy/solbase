import { cn } from "@/lib/utils";
import { MarketCardFrame } from "./market-card-frame";

type MarketCardSkeletonProps = Readonly<{
  className?: string;
}>;

export function MarketCardSkeleton({ className }: MarketCardSkeletonProps) {
  return (
    <MarketCardFrame
      className={cn("h-[200px] animate-pulse", className)}
      aria-hidden
    >
      <div className="flex items-start gap-3">
        <div className="size-10 shrink-0 bg-cream" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-4 w-3/4 bg-cream" />
          <div className="h-3 w-1/2 bg-cream/80" />
        </div>
      </div>
      <div className="mt-auto space-y-2 pt-4">
        <div className="h-8 w-full bg-cream/80" />
        <div className="h-8 w-full bg-cream/80" />
        <div className="flex justify-between pt-2">
          <div className="h-3 w-16 bg-cream/60" />
          <div className="h-3 w-20 bg-cream/60" />
        </div>
      </div>
    </MarketCardFrame>
  );
}

type MarketCardSkeletonGridProps = Readonly<{
  count?: number;
}>;

export function MarketCardSkeletonGrid({ count = 8 }: MarketCardSkeletonGridProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <MarketCardSkeleton key={i} />
      ))}
    </>
  );
}
