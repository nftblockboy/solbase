"use client";

import {
  CATEGORIES,
  type LeaderboardCategory,
} from "@/lib/mock/leaderboard";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";
import type { UserSettings } from "./settings-types";
import {
  SettingsField,
  SettingsToggle,
  settingsInputClassName,
} from "./settings-field";

const SELECTABLE_CATEGORIES = CATEGORIES.filter((c) => c.id !== "all");

type SettingsTabProfileProps = Readonly<{
  profile: UserSettings["profile"];
  onChange: (profile: Partial<UserSettings["profile"]>) => void;
}>;

export function SettingsTabProfile({ profile, onChange }: SettingsTabProfileProps) {
  const toggleCategory = (id: LeaderboardCategory) => {
    const next = profile.preferredCategories.includes(id)
      ? profile.preferredCategories.filter((c) => c !== id)
      : [...profile.preferredCategories, id];
    onChange({ preferredCategories: next });
  };

  return (
    <div className="flex flex-col gap-4">
      <SettingsField label="Display name">
        <input
          type="text"
          value={profile.displayName}
          onChange={(e) => onChange({ displayName: e.target.value })}
          placeholder="How you appear publicly"
          className={settingsInputClassName()}
        />
      </SettingsField>

      <SettingsField label="Bio">
        <textarea
          value={profile.bio}
          onChange={(e) => onChange({ bio: e.target.value })}
          placeholder="Short trading bio"
          rows={3}
          className={cn(settingsInputClassName(), "resize-y min-h-[72px]")}
        />
      </SettingsField>

      <SettingsField label="X / Twitter handle" hint="Without @">
        <input
          type="text"
          value={profile.twitterHandle}
          onChange={(e) => onChange({ twitterHandle: e.target.value })}
          placeholder="handle"
          className={settingsInputClassName()}
        />
      </SettingsField>

      <SettingsField label="Preferred categories">
        <Surface variant="chrome" className="inline-flex flex-wrap gap-0.5 p-1">
          {SELECTABLE_CATEGORIES.map(({ id, label }) => {
            const active = profile.preferredCategories.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleCategory(id)}
                className={cn(
                  "rounded-none px-2.5 py-1 text-xs font-medium transition",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted hover:bg-cream hover:text-foreground"
                )}
              >
                {label}
              </button>
            );
          })}
        </Surface>
      </SettingsField>

      <SettingsToggle
        label="Public profile visible"
        checked={profile.publicProfileEnabled}
        onChange={(publicProfileEnabled) => onChange({ publicProfileEnabled })}
      />
    </div>
  );
}
