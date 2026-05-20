"use client";

import { useState } from "react";
import { useCommunity } from "@/hooks/community/use-community";
import {
  CommunityMarketContextBanner,
  type CommunityMarketContext,
} from "./community-market-context-banner";
import { CommunityComposer } from "./community-composer";
import { CommunityFeed } from "./community-feed";
import { CommunityFilters } from "./community-filters";
import { CommunityLoadingSkeleton } from "./community-loading-skeleton";
import { CommunityMarketThreads } from "./community-market-threads";
import { CommunityTrending } from "./community-trending";
import { CommunityTopContributors } from "./community-top-contributors";

type CommunityShellProps = Readonly<{
  marketContext?: CommunityMarketContext | null;
}>;

export function CommunityShell({ marketContext }: CommunityShellProps) {
  const [contextDismissed, setContextDismissed] = useState(false);
  const {
    categoryFilter,
    setCategoryFilter,
    posts,
    trending,
    marketThreads,
    contributors,
    isLoading,
    toggleFollowAuthor,
    isFollowing,
    toggleReaction,
    hasReaction,
    getReactionCount,
  } = useCommunity();

  if (isLoading) {
    return <CommunityLoadingSkeleton />;
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 pb-6">
      <header className="border-b border-border pb-3">
        <h1 className="text-xl font-semibold text-foreground">Community</h1>
        <p className="mt-1 text-xs text-muted">
          Desk takes · trader feed · simulated social layer
        </p>
      </header>

      {marketContext && !contextDismissed ? (
        <CommunityMarketContextBanner
          context={marketContext}
          onDismiss={() => setContextDismissed(true)}
        />
      ) : null}

      <CommunityComposer />

      <CommunityFilters value={categoryFilter} onChange={setCategoryFilter} />

      <div className="grid min-w-0 gap-4 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <CommunityFeed
            posts={posts}
            isFollowing={isFollowing}
            onToggleFollow={toggleFollowAuthor}
            hasReaction={hasReaction}
            getReactionCount={getReactionCount}
            onToggleReaction={toggleReaction}
          />
        </div>
        <aside className="flex min-w-0 flex-col gap-4">
          <CommunityTrending discussions={trending} />
          <CommunityMarketThreads threads={marketThreads} />
          <CommunityTopContributors contributors={contributors} />
        </aside>
      </div>
    </div>
  );
}
