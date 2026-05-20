"use client";

import { cn } from "@/lib/utils";

type LeaderboardFollowButtonProps = Readonly<{
  isFollowing: boolean;
  onToggle: () => void;
  className?: string;
}>;

export function LeaderboardFollowButton({
  isFollowing,
  onToggle,
  className,
}: LeaderboardFollowButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onToggle();
      }}
      aria-pressed={isFollowing}
      className={cn(
        "shrink-0 rounded-none border px-2.5 py-1 text-xs font-medium transition",
        isFollowing
          ? "border-accent bg-accent/15 text-accent"
          : "border-border-low bg-cream text-foreground hover:border-accent hover:text-accent",
        className
      )}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}
