import Link from "next/link";
import { Surface } from "@/components/ui/surface";

export function ProfileNotFound() {
  return (
    <Surface variant="panel" className="flex flex-col items-center gap-4 p-8 text-center">
      <h1 className="text-lg font-semibold text-foreground">Trader not found</h1>
      <p className="max-w-md text-sm text-muted">
        No trader profile exists for this wallet address in mock data. Pick a
        trader from the leaderboard or browse rankings.
      </p>
      <Link
        href="/leaderboard"
        className="rounded-none border border-accent bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20"
      >
        Back to leaderboard
      </Link>
    </Surface>
  );
}
