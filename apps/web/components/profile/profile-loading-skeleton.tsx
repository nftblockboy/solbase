import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

function Shimmer({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-none bg-cream", className)} />;
}

export function ProfileLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 pb-6">
      <Shimmer className="h-24 w-full" />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Surface key={i} variant="card" className="h-20 p-3">
            <Shimmer className="h-full w-full" />
          </Surface>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Surface variant="panel" className="h-40 p-4">
          <Shimmer className="h-full w-full" />
        </Surface>
        <Surface variant="panel" className="h-40 p-4">
          <Shimmer className="h-full w-full" />
        </Surface>
      </div>
    </div>
  );
}
