"use client";

import {
  CATEGORIES,
  SORT_OPTIONS,
  TIME_WINDOWS,
  type LeaderboardCategory,
  type LeaderboardSortKey,
  type LeaderboardTimeWindow,
} from "@/lib/mock/leaderboard";
import { cn } from "@/lib/utils";
import { Surface } from "@/components/ui/surface";

type FilterChipGroupProps<T extends string> = Readonly<{
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}>;

function FilterChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: FilterChipGroupProps<T>) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
      <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
      <Surface
        variant="chrome"
        className="inline-flex flex-wrap gap-0.5 p-1"
      >
        {options.map((opt) => (
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
  );
}

type LeaderboardFiltersProps = Readonly<{
  timeWindow: LeaderboardTimeWindow;
  category: LeaderboardCategory;
  sortKey: LeaderboardSortKey;
  onTimeWindowChange: (w: LeaderboardTimeWindow) => void;
  onCategoryChange: (c: LeaderboardCategory) => void;
  onSortKeyChange: (s: LeaderboardSortKey) => void;
}>;

export function LeaderboardFilters({
  timeWindow,
  category,
  sortKey,
  onTimeWindowChange,
  onCategoryChange,
  onSortKeyChange,
}: LeaderboardFiltersProps) {
  return (
    <Surface variant="panel" className="flex flex-col gap-3 p-3">
      <FilterChipGroup
        label="Window"
        options={TIME_WINDOWS}
        value={timeWindow}
        onChange={onTimeWindowChange}
      />
      <FilterChipGroup
        label="Category"
        options={CATEGORIES}
        value={category}
        onChange={onCategoryChange}
      />
      <FilterChipGroup
        label="Sort"
        options={SORT_OPTIONS}
        value={sortKey}
        onChange={onSortKeyChange}
      />
    </Surface>
  );
}
