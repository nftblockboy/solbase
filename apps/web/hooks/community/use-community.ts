"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getCommunityPosts,
  getMarketThreads,
  getTopContributors,
  getTrendingDiscussions,
  getBaseReactionCount,
  type CommunityCategoryFilter,
  type CommunityPost,
  type CommunityReactionKind,
} from "@/lib/mock/community";

const LOAD_DELAY_MS = 300;

export function useCommunity() {
  const [categoryFilter, setCategoryFilter] =
    useState<CommunityCategoryFilter>("all");
  const [followedAuthorIds, setFollowedAuthorIds] = useState<Set<string>>(
    () => new Set()
  );
  const [activeReactions, setActiveReactions] = useState<
    Map<string, Set<CommunityReactionKind>>
  >(() => new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<CommunityPost[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const timer = globalThis.setTimeout(() => {
      setPosts(getCommunityPosts(categoryFilter, followedAuthorIds));
      setIsLoading(false);
    }, LOAD_DELAY_MS);
    return () => globalThis.clearTimeout(timer);
  }, [categoryFilter, followedAuthorIds]);

  const trending = useMemo(
    () => getTrendingDiscussions(categoryFilter),
    [categoryFilter]
  );
  const marketThreads = useMemo(() => getMarketThreads(), []);
  const contributors = useMemo(() => getTopContributors(), []);

  const toggleFollowAuthor = useCallback((authorId: string) => {
    setFollowedAuthorIds((prev) => {
      const next = new Set(prev);
      if (next.has(authorId)) next.delete(authorId);
      else next.add(authorId);
      return next;
    });
  }, []);

  const isFollowing = useCallback(
    (authorId: string, seedFollowed?: boolean) =>
      followedAuthorIds.has(authorId) || seedFollowed === true,
    [followedAuthorIds]
  );

  const toggleReaction = useCallback(
    (postId: string, kind: CommunityReactionKind) => {
      setActiveReactions((prev) => {
        const next = new Map(prev);
        const current = new Set(next.get(postId) ?? []);
        if (current.has(kind)) current.delete(kind);
        else current.add(kind);
        next.set(postId, current);
        return next;
      });
    },
    []
  );

  const hasReaction = useCallback(
    (postId: string, kind: CommunityReactionKind) =>
      activeReactions.get(postId)?.has(kind) ?? false,
    [activeReactions]
  );

  const getReactionCount = useCallback(
    (post: CommunityPost, kind: CommunityReactionKind) => {
      const base = getBaseReactionCount(post, kind);
      const active = activeReactions.get(post.id)?.has(kind) ? 1 : 0;
      return base + active;
    },
    [activeReactions]
  );

  return {
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
  };
}
