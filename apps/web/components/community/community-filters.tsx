"use client";

import {
  COMMUNITY_CATEGORY_FILTERS,
  type CommunityCategoryFilter,
} from "@/lib/mock/community";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

type CommunityFiltersProps = Readonly<{
  value: CommunityCategoryFilter;
  onChange: (value: CommunityCategoryFilter) => void;
}>;

export function CommunityFilters({ value, onChange }: CommunityFiltersProps) {
  return (
    <Surface variant="panel" className="p-3">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-muted">
          Feed
        </span>
        <Surface variant="chrome" className="inline-flex flex-wrap gap-0.5 p-1">
          {COMMUNITY_CATEGORY_FILTERS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={cn(
                "rounded-none px-2.5 py-1 text-xs font-medium transition",
                value === opt.id
                  ? "bg-cream text-accent"
                  : "text-muted hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </Surface>
      </div>
    </Surface>
  );
}
