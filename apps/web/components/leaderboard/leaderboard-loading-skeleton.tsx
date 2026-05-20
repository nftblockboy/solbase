import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

function Shimmer({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-none bg-cream", className)} />
  );
}

export function LeaderboardLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 pb-6">
      <Shimmer className="h-8 w-48" />
      <Surface variant="panel" className="h-32 p-4">
        <Shimmer className="h-full w-full" />
      </Surface>
      <div className="flex gap-3">
        {[1, 2, 3].map((i) => (
          <Surface key={i} variant="card" className="h-48 min-w-[260px] flex-1 p-4">
            <Shimmer className="h-full w-full" />
          </Surface>
        ))}
      </div>
      <Surface variant="panel" className="p-4">
        <Shimmer className="mb-4 h-4 w-32" />
        <Shimmer className="h-64 w-full" />
      </Surface>
    </div>
  );
}
