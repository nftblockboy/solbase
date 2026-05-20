import Link from "next/link";
import type { CommunityAuthor } from "@/lib/mock/community";
import { traderPath } from "@/lib/mock/profile";
import { truncateAddress } from "@/lib/prediction/utils";
import { LeaderboardAvatar } from "@/components/leaderboard/leaderboard-avatar";
import { LeaderboardBadges } from "@/components/leaderboard/leaderboard-badges";
type CommunityAuthorRowProps = Readonly<{
  author: CommunityAuthor;
  timestamp?: number;
  showTimestamp?: boolean;
  timestampLabel?: string;
}>;

export function CommunityAuthorRow({
  author,
  timestampLabel,
}: CommunityAuthorRowProps) {
  return (
    <div className="flex items-start gap-2">
      <LeaderboardAvatar
        initials={author.initials}
        avatarColor={author.avatarColor}
        size="sm"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={traderPath(author.walletAddress)}
            className="text-sm font-semibold text-foreground hover:text-accent"
          >
            {author.displayName}
          </Link>
          {author.traderBadge ? (
            <LeaderboardBadges badges={[author.traderBadge]} />
          ) : null}
        </div>
        <p className="font-mono text-[10px] text-muted">
          {truncateAddress(author.walletAddress, 4)}
          {timestampLabel ? (
            <span className="text-muted"> · {timestampLabel}</span>
          ) : null}
        </p>
      </div>
    </div>
  );
}
