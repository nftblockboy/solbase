"use client";

import type { TraderProfileDetails } from "@/lib/mock/profile";
import { truncateAddress } from "@/lib/prediction/utils";
import { LeaderboardAvatar } from "@/components/leaderboard/leaderboard-avatar";
import { LeaderboardBadges } from "@/components/leaderboard/leaderboard-badges";
import { LeaderboardFollowButton } from "@/components/leaderboard/leaderboard-follow-button";
import { Surface } from "@/components/ui/surface";

type ProfileHeaderProps = Readonly<{
  profile: TraderProfileDetails;
  isOwnProfile: boolean;
  isFollowing: boolean;
  onToggleFollow: () => void;
}>;

export function ProfileHeader({
  profile,
  isOwnProfile,
  isFollowing,
  onToggleFollow,
}: ProfileHeaderProps) {
  return (
    <Surface variant="panel" className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-4">
        <LeaderboardAvatar
          initials={profile.initials}
          avatarColor={profile.avatarColor}
          size="lg"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold text-foreground">
              {profile.displayName}
            </h1>
            {profile.leaderboardRank !== undefined ? (
              <span className="rounded-none border border-border-low bg-cream px-2 py-0.5 text-xs font-medium tabular-nums text-accent">
                #{profile.leaderboardRank} leaderboard
              </span>
            ) : null}
          </div>
          <p className="mt-1 font-mono text-xs text-muted">
            {truncateAddress(profile.walletAddress, 8)}
          </p>
          <div className="mt-2">
            <LeaderboardBadges badges={profile.badges} />
          </div>
        </div>
      </div>
      {!isOwnProfile ? (
        <LeaderboardFollowButton
          isFollowing={isFollowing}
          onToggle={onToggleFollow}
        />
      ) : null}
    </Surface>
  );
}
