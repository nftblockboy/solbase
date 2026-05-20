"use client";

import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

export function CommunityComposer() {
  return (
    <Surface variant="panel" className="p-4">
      <textarea
        disabled
        placeholder="Share a prediction, thesis, or market take…"
        rows={3}
        className={cn(
          "w-full resize-none rounded-none border border-border-low bg-cream/50 px-3 py-2 text-sm",
          "text-muted placeholder:text-muted/80",
          "cursor-not-allowed opacity-80"
        )}
        aria-label="Compose post (coming soon)"
      />
      <div className="mt-2 flex items-center justify-between">
        <p className="text-[10px] text-muted">
          Posting is mock-only · connect wallet to preview composer
        </p>
        <button
          type="button"
          disabled
          className="rounded-none border border-border-low bg-cream px-3 py-1 text-xs font-medium text-muted cursor-not-allowed"
        >
          Post
        </button>
      </div>
    </Surface>
  );
}
