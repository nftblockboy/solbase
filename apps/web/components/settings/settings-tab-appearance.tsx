"use client";

import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";
import type { SettingsDensity, UserSettings } from "./settings-types";
import { SettingsField, SettingsToggle } from "./settings-field";

type SettingsTabAppearanceProps = Readonly<{
  appearance: UserSettings["appearance"];
  preferences: UserSettings["preferences"];
  onAppearanceChange: (appearance: Partial<UserSettings["appearance"]>) => void;
  onPreferencesChange: (
    preferences: Partial<UserSettings["preferences"]>
  ) => void;
}>;

const DENSITY_OPTIONS: { id: SettingsDensity; label: string }[] = [
  { id: "comfortable", label: "Comfortable" },
  { id: "compact", label: "Compact" },
];

export function SettingsTabAppearance({
  appearance,
  preferences,
  onAppearanceChange,
  onPreferencesChange,
}: SettingsTabAppearanceProps) {
  return (
    <div className="flex flex-col gap-4">
      <SettingsField
        label="Theme"
        hint="Use the sun/moon toggle in the top navigation bar."
      >
        <Surface variant="card" className="p-3 text-sm text-muted">
          Light and dark theme are controlled from the nav bar theme toggle.
        </Surface>
      </SettingsField>

      <SettingsField label="Density">
        <Surface variant="chrome" className="inline-flex gap-0.5 p-1">
          {DENSITY_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onAppearanceChange({ density: opt.id })}
              className={cn(
                "rounded-none px-2.5 py-1 text-xs font-medium transition",
                appearance.density === opt.id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted hover:bg-cream hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </Surface>
      </SettingsField>

      <SettingsToggle
        label="Compact mode (synced with density)"
        checked={preferences.compactMode}
        onChange={(compactMode) => {
          onPreferencesChange({ compactMode });
          onAppearanceChange({
            density: compactMode ? "compact" : "comfortable",
          });
        }}
      />
    </div>
  );
}
