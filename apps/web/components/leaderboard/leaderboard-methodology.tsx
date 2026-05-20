import { Surface } from "@/components/ui/surface";
import { LeaderboardSectionHeading } from "./leaderboard-section-heading";

export function LeaderboardMethodology() {
  return (
    <Surface variant="panel" className="p-4">
      <LeaderboardSectionHeading title="Leaderboard methodology" />
      <div className="space-y-3 text-sm text-muted">
        <p>
          <strong className="text-foreground">Mock data.</strong> Rankings shown
          here are simulated for product development. They do not reflect live
          on-chain performance or verified trader identities.
        </p>
        <p>When live, scores will weight:</p>
        <ul className="list-inside list-disc space-y-1 pl-1">
          <li>
            <strong className="text-foreground">Performance</strong> — ROI and
            realized P&amp;L over the selected window
          </li>
          <li>
            <strong className="text-foreground">Consistency</strong> — win
            rate and drawdown stability
          </li>
          <li>
            <strong className="text-foreground">Volume</strong> — capital
            deployed and market participation
          </li>
          <li>
            <strong className="text-foreground">Risk</strong> — concentration
            and volatility-adjusted exposure
          </li>
        </ul>
        <p className="text-xs">
          Category filters scope metrics to markets tagged in that vertical.
          Follow actions are local UI state only until social graph ships.
        </p>
      </div>
    </Surface>
  );
}
