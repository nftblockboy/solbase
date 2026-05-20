"use client";

import Link from "next/link";
import { useTraderProfile } from "@/hooks/profile/use-trader-profile";
import { ProfileAiSummary } from "./profile-ai-summary";
import { ProfileBioPanel } from "./profile-bio-panel";
import { ProfileHeader } from "./profile-header";
import { ProfileLoadingSkeleton } from "./profile-loading-skeleton";
import { ProfileNotFound } from "./profile-not-found";
import { ProfileOpenPositions } from "./profile-open-positions";
import { ProfileRecentPredictions } from "./profile-recent-predictions";
import { ProfileReputation } from "./profile-reputation";
import { ProfileSummaryCards } from "./profile-summary-cards";
import { ProfileTopCategories } from "./profile-top-categories";

type ProfileShellProps = Readonly<{
  wallet: string;
}>;

export function ProfileShell({ wallet }: ProfileShellProps) {
  const { status, profile, isFollowing, toggleFollow } = useTraderProfile(wallet);

  if (status === "loading") {
    return <ProfileLoadingSkeleton />;
  }

  if (status === "not_found" || !profile) {
    return (
      <div className="flex flex-col gap-4 pb-6">
        <ProfileNotFound />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4 pb-6">
      <header className="border-b border-border pb-3">
        <nav
          className="mb-2 flex flex-wrap items-center gap-1.5 text-xs text-muted"
          aria-label="Breadcrumb"
        >
          <Link href="/leaderboard" className="font-medium hover:text-accent">
            Leaderboard
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground">{profile.displayName}</span>
        </nav>
        <h1 className="text-xl font-semibold text-foreground">Trader profile</h1>
        <p className="mt-1 text-xs text-muted">
          Public reputation · 7d performance · simulated track record for product
          preview
        </p>
      </header>

      <ProfileHeader
        profile={profile}
        isOwnProfile={false}
        isFollowing={isFollowing(profile.id)}
        onToggleFollow={() => toggleFollow(profile.id)}
      />

      <ProfileSummaryCards stats={profile.stats} />

      <div className="grid gap-4 lg:grid-cols-2">
        <ProfileBioPanel bio={profile.bio} tradingStyle={profile.tradingStyle} />
        <ProfileTopCategories categories={profile.topCategories} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ProfileRecentPredictions predictions={profile.recentPredictions} />
        <ProfileOpenPositions positions={profile.openPositions} />
      </div>

      <ProfileAiSummary summary={profile.aiSummary} />

      <ProfileReputation badges={profile.reputationBadges} />
    </div>
  );
}
