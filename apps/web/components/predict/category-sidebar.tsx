"use client";

import type { ElementType } from "react";
import { useMemo } from "react";
import { Globe, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PredictionEvent } from "@/lib/prediction/api";
import type { Category, Filter } from "@/lib/prediction/constants";
import {
  formatSubcategoryLabel,
  getCategorySectionLabel,
} from "@/lib/prediction/category-sidebar-config";

type CategorySidebarProps = Readonly<{
  category: Category;
  events: PredictionEvent[];
  subcategory?: string;
  onSubcategoryChange: (subcategory: string | undefined) => void;
  filter?: Filter;
  onFilterChange: (filter: Filter | undefined) => void;
  isLoading?: boolean;
}>;

const SUBCATEGORY_SKELETON_COUNT = 7;

export function CategorySidebar({
  category,
  events,
  subcategory,
  onSubcategoryChange,
  filter,
  onFilterChange,
  isLoading = false,
}: CategorySidebarProps) {
  const subcategories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const event of events) {
      if (!event.subcategory) continue;
      counts.set(event.subcategory, (counts.get(event.subcategory) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, count]) => ({ name, count }));
  }, [events]);

  if (category === "all") {
    return null;
  }

  const total = events.length;
  const sectionLabel = getCategorySectionLabel(category);
  const sidebarLiveActive = filter === "live" && subcategory === undefined;

  return (
    <aside className="hidden min-w-[200px] border-r border-border lg:block">
      <nav
        className="sticky top-4 flex flex-col gap-3 pr-3"
        aria-label="Subcategories"
      >
        <div className="space-y-0.5">
          <SidebarItem
            active={subcategory === undefined && filter !== "live"}
            onClick={() => {
              onSubcategoryChange(undefined);
              onFilterChange(undefined);
            }}
            icon={Globe}
            label="All"
          />
          <SidebarItem
            active={sidebarLiveActive}
            onClick={() => {
              onSubcategoryChange(undefined);
              onFilterChange(filter === "live" ? undefined : "live");
            }}
            icon={Radio}
            label="Live"
            showLiveDot
          />
        </div>

        <div>
          <p className="mb-1 px-2 text-[10px] font-semibold tracking-wide text-muted uppercase">
            {sectionLabel}
          </p>
          <div className="space-y-0.5">
            {isLoading ? (
              Array.from({ length: SUBCATEGORY_SKELETON_COUNT }).map((_, i) => (
                <div
                  key={i}
                  className="mx-2 h-8 animate-pulse rounded-none bg-cream"
                  aria-hidden
                />
              ))
            ) : (
              subcategories.map(({ name, count }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    onFilterChange(undefined);
                    onSubcategoryChange(subcategory === name ? undefined : name);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-none px-2 py-1.5 text-left text-xs font-medium transition",
                    subcategory === name
                      ? "bg-cream text-accent"
                      : "text-muted hover:bg-cream/50 hover:text-foreground"
                  )}
                >
                  <span className="truncate capitalize">
                    {formatSubcategoryLabel(name)}
                  </span>
                  <span className="shrink-0 tabular-nums text-muted">{count}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {!isLoading && subcategories.length > 0 ? (
          <p className="px-2 text-[10px] text-muted">
            {total} events in {category}
          </p>
        ) : null}
      </nav>
    </aside>
  );
}

function SidebarItem({
  active,
  onClick,
  icon: Icon,
  label,
  showLiveDot,
}: Readonly<{
  active: boolean;
  onClick: () => void;
  icon: ElementType;
  label: string;
  showLiveDot?: boolean;
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-none px-2 py-1.5 text-left text-xs font-medium transition",
        active
          ? "bg-cream text-accent"
          : "text-muted hover:bg-cream/50 hover:text-foreground"
      )}
    >
      <Icon className="size-3.5 shrink-0" aria-hidden />
      {showLiveDot ? (
        <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
      ) : null}
      <span className="flex-1">{label}</span>
    </button>
  );
}
