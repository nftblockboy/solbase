import Link from "next/link";
import type { CommunityContributor } from "@/lib/mock/community";
import { traderPath } from "@/lib/mock/profile";
import { LeaderboardAvatar } from "@/components/leaderboard/leaderboard-avatar";
import { Surface } from "@/components/ui/surface";
import { CommunitySectionHeading } from "./community-section-heading";
import { cn } from "@/lib/utils";

type CommunityTopContributorsProps = Readonly<{
  contributors: CommunityContributor[];
}>;

export function CommunityTopContributors({
  contributors,
}: CommunityTopContributorsProps) {
  return (
    <Surface variant="panel" className="p-4">
      <CommunitySectionHeading title="Top contributors" />
      <ul className="flex flex-col gap-2">
        {contributors.map((c) => (
          <li key={c.author.id}>
            <Link
              href={traderPath(c.author.walletAddress)}
              className="flex items-center gap-2 rounded-none p-1 hover:bg-cream/50"
            >
              <span
                className={cn(
                  "w-5 shrink-0 text-center text-xs font-semibold tabular-nums",
                  c.rank <= 3 ? "text-accent" : "text-muted"
                )}
              >
                #{c.rank}
              </span>
              <LeaderboardAvatar
                initials={c.author.initials}
                avatarColor={c.author.avatarColor}
                size="sm"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {c.author.displayName}
                </p>
                <p className="truncate text-[10px] text-muted">
                  {c.postCount} posts · {c.reputationNote}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Surface>
  );
}
