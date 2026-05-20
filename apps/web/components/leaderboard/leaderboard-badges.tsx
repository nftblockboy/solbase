import type { TraderBadge } from "@/lib/mock/leaderboard";
import { cn } from "@/lib/utils";

type LeaderboardBadgesProps = Readonly<{
  badges: TraderBadge[];
  className?: string;
}>;

export function LeaderboardBadges({ badges, className }: LeaderboardBadgesProps) {
  if (badges.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {badges.map((badge) => (
        <span
          key={badge.id}
          className={cn(
            "inline-flex px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide",
            badge.variant === "warning" && "bg-amber-500/15 text-amber-500",
            badge.variant === "accent" && "bg-accent/15 text-accent",
            (!badge.variant || badge.variant === "default") &&
              "bg-cream text-muted"
          )}
        >
          {badge.label}
        </span>
      ))}
    </div>
  );
}
