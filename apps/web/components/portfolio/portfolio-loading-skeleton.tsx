import { Surface } from "@/components/ui/surface";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-none bg-cream ${className ?? ""}`}
    />
  );
}

export function PortfolioLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 pb-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Shimmer className="h-8 w-40" />
        <Shimmer className="h-6 w-56" />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Surface key={i} variant="card" className="p-3">
            <Shimmer className="mb-2 h-3 w-16" />
            <Shimmer className="h-6 w-20" />
          </Surface>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Surface variant="panel" className="h-52 p-4 lg:col-span-2">
          <Shimmer className="mb-4 h-4 w-32" />
          <Shimmer className="h-32 w-full" />
        </Surface>
        <Surface variant="panel" className="h-52 p-4">
          <Shimmer className="mb-4 h-4 w-32" />
          <Shimmer className="h-24 w-full" />
        </Surface>
      </div>
      <Surface variant="panel" className="p-4">
        <Shimmer className="mb-4 h-4 w-36" />
        <Shimmer className="h-40 w-full" />
      </Surface>
    </div>
  );
}
