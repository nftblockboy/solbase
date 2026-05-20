"use client";

import type { CommunityPost, CommunityReactionKind } from "@/lib/mock/community";
import { Surface } from "@/components/ui/surface";
import { CommunitySectionHeading } from "./community-section-heading";
import { CommunityPostCard } from "./community-post-card";

type CommunityFeedProps = Readonly<{
  posts: CommunityPost[];
  isFollowing: (authorId: string, seedFollowed?: boolean) => boolean;
  onToggleFollow: (authorId: string) => void;
  hasReaction: (postId: string, kind: CommunityReactionKind) => boolean;
  getReactionCount: (post: CommunityPost, kind: CommunityReactionKind) => number;
  onToggleReaction: (postId: string, kind: CommunityReactionKind) => void;
}>;

export function CommunityFeed({
  posts,
  isFollowing,
  onToggleFollow,
  hasReaction,
  getReactionCount,
  onToggleReaction,
}: CommunityFeedProps) {
  return (
    <Surface variant="panel" className="p-4">
      <CommunitySectionHeading
        title="Community feed"
        subtitle={`${posts.length} posts`}
      />
      {posts.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted">
          No posts in this filter. Try All or follow traders from the feed.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <CommunityPostCard
              key={post.id}
              post={post}
              isFollowing={isFollowing(
                post.author.id,
                post.author.isFollowedSeed
              )}
              onToggleFollow={() => onToggleFollow(post.author.id)}
              hasReaction={hasReaction}
              getReactionCount={getReactionCount}
              onToggleReaction={onToggleReaction}
            />
          ))}
        </div>
      )}
    </Surface>
  );
}
