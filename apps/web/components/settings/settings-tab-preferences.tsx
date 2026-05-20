"use client";

import {
  CATEGORIES,
  SORT_OPTIONS,
} from "@/lib/mock/leaderboard";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";
import type { UserSettings } from "./settings-types";
import { SettingsField, SettingsToggle } from "./settings-field";

type SettingsTabPreferencesProps = Readonly<{
  preferences: UserSettings["preferences"];
  onChange: (preferences: Partial<UserSettings["preferences"]>) => void;
}>;

function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <SettingsField label={label}>
      <Surface variant="chrome" className="inline-flex flex-wrap gap-0.5 p-1">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              "rounded-none px-2.5 py-1 text-xs font-medium transition",
              value === opt.id
                ? "bg-accent text-accent-foreground"
                : "text-muted hover:bg-cream hover:text-foreground"
            )}
          >
            {opt.label}
          </button>
        ))}
      </Surface>
    </SettingsField>
  );
}

export function SettingsTabPreferences({
  preferences,
  onChange,
}: SettingsTabPreferencesProps) {
  return (
    <div className="flex flex-col gap-4">
      <ChipGroup
        label="Default leaderboard metric"
        options={SORT_OPTIONS}
        value={preferences.defaultLeaderboardMetric}
        onChange={(defaultLeaderboardMetric) =>
          onChange({ defaultLeaderboardMetric })
        }
      />
      <ChipGroup
        label="Default market category"
        options={CATEGORIES}
        value={preferences.defaultMarketCategory}
        onChange={(defaultMarketCategory) => onChange({ defaultMarketCategory })}
      />
      <SettingsToggle
        label="Compact mode"
        checked={preferences.compactMode}
        onChange={(compactMode) => onChange({ compactMode })}
      />
    </div>
  );
}
