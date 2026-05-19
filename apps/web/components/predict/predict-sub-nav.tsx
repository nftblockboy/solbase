"use client";

import type { ElementType } from "react";
import {
  FolderOpen,
  Sparkles,
  Trophy,
  User,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Surface } from "@/components/ui/surface";

export type PredictSubNavTab =
  | "browse"
  | "degen"
  | "for-you"
  | "leaderboard"
  | "profile";

const TABS: {
  id: PredictSubNavTab;
  label: string;
  icon: ElementType;
}[] = [
  { id: "browse", label: "Browse", icon: FolderOpen },
  { id: "degen", label: "Degen", icon: Zap },
  { id: "for-you", label: "For You", icon: Sparkles },
  { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  { id: "profile", label: "Profile", icon: User },
];

type PredictSubNavProps = Readonly<{
  active: PredictSubNavTab;
  onChange: (tab: PredictSubNavTab) => void;
}>;

export function PredictSubNav({ active, onChange }: PredictSubNavProps) {
  return (
    <nav className="flex justify-center py-2" aria-label="Predict sections">
      <Surface
        variant="chrome"
        className="inline-flex flex-wrap items-center justify-center gap-0.5 p-1"
      >
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
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
