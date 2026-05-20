"use client";

import type {
  CommunityPost,
  CommunityReactionKind,
} from "@/lib/mock/community";
import { cn } from "@/lib/utils";

const REACTION_META: Record<
  CommunityReactionKind,
  { label: string; activeClass: string }
> = {
  bullish: { label: "Bullish", activeClass: "border-emerald-500/50 text-emerald-500" },
  bearish: { label: "Bearish", activeClass: "border-red-400/50 text-red-400" },
  insight: { label: "Insight", activeClass: "border-accent/50 text-accent" },
  fire: { label: "Fire", activeClass: "border-amber-500/50 text-amber-400" },
};

type CommunityReactionsProps = Readonly<{
  post: CommunityPost;
  hasReaction: (postId: string, kind: CommunityReactionKind) => boolean;
  getReactionCount: (post: CommunityPost, kind: CommunityReactionKind) => number;
  onToggle: (postId: string, kind: CommunityReactionKind) => void;
}>;

export function CommunityReactions({
  post,
  hasReaction,
  getReactionCount,
  onToggle,
}: CommunityReactionsProps) {
  const kinds: CommunityReactionKind[] = [
    "bullish",
    "bearish",
    "insight",
    "fire",
  ];

  return (
    <div className="flex flex-wrap gap-1.5">
      {kinds.map((kind) => {
        const active = hasReaction(post.id, kind);
        const meta = REACTION_META[kind];
        return (
          <button
            key={kind}
            type="button"
            onClick={() => onToggle(post.id, kind)}
            aria-pressed={active}
            className={cn(
              "rounded-none border border-border-low bg-cream px-2 py-0.5 text-[10px] font-medium tabular-nums transition",
              active
                ? meta.activeClass
                : "text-muted hover:border-accent hover:text-foreground"
            )}
          >
            {meta.label} {getReactionCount(post, kind)}
          </button>
        );
      })}
    </div>
  );
}
