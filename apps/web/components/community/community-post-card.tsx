"use client";

import Link from "next/link";
import type { CommunityPost, CommunityReactionKind } from "@/lib/mock/community";
import { CATEGORIES } from "@/lib/mock/leaderboard";
import { traderPath } from "@/lib/mock/profile";
import { timeAgo } from "@/lib/prediction/utils";
import { LeaderboardFollowButton } from "@/components/leaderboard/leaderboard-follow-button";
import { Surface } from "@/components/ui/surface";
import { CommunityAuthorRow } from "./community-author-row";
import { CommunityMarketChip } from "./community-market-chip";
import { CommunityReactions } from "./community-reactions";

type CommunityPostCardProps = Readonly<{
  post: CommunityPost;
  isFollowing: boolean;
  onToggleFollow: () => void;
  hasReaction: (postId: string, kind: CommunityReactionKind) => boolean;
  getReactionCount: (post: CommunityPost, kind: CommunityReactionKind) => number;
  onToggleReaction: (postId: string, kind: CommunityReactionKind) => void;
}>;

const CATEGORY_LABEL = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.label])
) as Record<string, string>;

export function CommunityPostCard({
  post,
  isFollowing,
  onToggleFollow,
  hasReaction,
  getReactionCount,
  onToggleReaction,
}: CommunityPostCardProps) {
  return (
    <Surface variant="card" className="flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <CommunityAuthorRow
          author={post.author}
          timestampLabel={timeAgo(post.timestamp)}
        />
        <LeaderboardFollowButton
          isFollowing={isFollowing}
          onToggle={onToggleFollow}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[10px]">
        <span className="rounded-none border border-border-low bg-cream px-1.5 py-0.5 font-medium uppercase tracking-wider text-muted">
          {CATEGORY_LABEL[post.category] ?? post.category}
        </span>
        <span className="text-muted">{post.topic.label}</span>
      </div>

      {post.marketRef ? (
        <CommunityMarketChip marketRef={post.marketRef} />
      ) : null}

      <p className="text-sm leading-relaxed text-foreground">{post.body}</p>

      <CommunityReactions
        post={post}
        hasReaction={hasReaction}
        getReactionCount={getReactionCount}
        onToggle={onToggleReaction}
      />

      <div className="flex items-center justify-between border-t border-border-low/60 pt-2 text-xs text-muted">
        <span className="tabular-nums">{post.replyCount} replies</span>
        <Link
          href={traderPath(post.author.walletAddress)}
          className="font-medium text-accent hover:underline"
        >
          View trader
        </Link>
      </div>
    </Surface>
  );
}
