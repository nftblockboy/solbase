import { Surface } from "@/components/ui/surface";

export function PortfolioEmptyState() {
  return (
    <Surface
      variant="panel"
      className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center"
    >
      <h2 className="text-lg font-semibold text-foreground">No open positions</h2>
      <p className="mt-2 max-w-md text-sm text-muted">
        Your wallet is connected but there are no positions to display. Browse
        markets to take your first prediction position.
      </p>
    </Surface>
  );
}
