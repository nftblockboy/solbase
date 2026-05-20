import type { TraderReputationBadge } from "@/lib/mock/profile";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";
import { ProfileSectionHeading } from "./profile-section-heading";

type ProfileReputationProps = Readonly<{
  badges: TraderReputationBadge[];
}>;

function tierClass(tier?: TraderReputationBadge["tier"]) {
  if (tier === "gold") return "border-amber-500/50 text-amber-400";
  if (tier === "silver") return "border-zinc-400/50 text-zinc-300";
  if (tier === "bronze") return "border-orange-700/50 text-orange-400";
  return "border-border-low text-foreground";
}

export function ProfileReputation({ badges }: ProfileReputationProps) {
  return (
    <Surface variant="panel" className="p-4">
      <ProfileSectionHeading title="Reputation" />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {badges.map((badge) => (
          <Surface
            key={badge.id}
            variant="card"
            className={cn("flex flex-col gap-1 border p-3", tierClass(badge.tier))}
          >
            <span className="text-sm font-semibold">{badge.label}</span>
            {badge.description ? (
              <p className="text-xs text-muted">{badge.description}</p>
            ) : null}
            {badge.tier ? (
              <span className="text-[10px] uppercase tracking-wider opacity-80">
                {badge.tier}
              </span>
            ) : null}
          </Surface>
        ))}
      </div>
    </Surface>
  );
}
