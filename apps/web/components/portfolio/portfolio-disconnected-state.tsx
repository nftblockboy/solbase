"use client";

import { Surface } from "@/components/ui/surface";

export function PortfolioDisconnectedState() {
  return (
    <Surface
      variant="panel"
      className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center"
    >
      <h1 className="text-2xl font-semibold text-foreground">Portfolio</h1>
      <p className="mt-2 max-w-md text-sm text-muted">
        Terminal view unlocks after wallet connect — positions, P&amp;L, risk
        exposure, and portfolio intelligence. Mock dashboard data loads when
        connected.
      </p>
      <p className="mt-4 text-sm text-muted">
        Connect your wallet using the button in the top bar.
      </p>
    </Surface>
  );
}
