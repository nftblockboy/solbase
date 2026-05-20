"use client";

import type { ElementType } from "react";
import { FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Surface } from "@/components/ui/surface";

export type MarketsSubNavTab = "browse";

const TABS: {
  id: MarketsSubNavTab;
  label: string;
  icon: ElementType;
}[] = [{ id: "browse", label: "Markets", icon: FolderOpen }];

type MarketsSubNavProps = Readonly<{
  active: MarketsSubNavTab;
  onChange?: (tab: MarketsSubNavTab) => void;
}>;

export function MarketsSubNav({ active }: MarketsSubNavProps) {
  return (
    <nav
      className="flex max-w-full justify-center overflow-x-auto py-2"
      aria-label="Markets sections"
    >
      <Surface
        variant="chrome"
        className="inline-flex shrink-0 flex-wrap items-center justify-center gap-0.5 p-1"
      >
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-none px-3 py-1 text-sm font-medium transition",
              active === id
                ? "bg-cream text-accent"
                : "text-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {label}
          </button>
        ))}
      </Surface>
    </nav>
  );
}
