import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

function Shimmer({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-none bg-cream", className)} />;
}

export function CommunityLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 pb-6">
      <Shimmer className="h-24 w-full" />
      <Shimmer className="h-10 w-full" />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-3 lg:col-span-2">
          <Surface variant="panel" className="h-96 p-4">
            <Shimmer className="h-full w-full" />
          </Surface>
        </div>
        <div className="flex flex-col gap-3">
          <Surface variant="panel" className="h-48 p-4">
            <Shimmer className="h-full w-full" />
          </Surface>
          <Surface variant="panel" className="h-40 p-4">
            <Shimmer className="h-full w-full" />
          </Surface>
        </div>
      </div>
    </div>
  );
}
