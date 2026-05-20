"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/motion-primitives/dialog";
import { cn } from "@/lib/utils";
import { SETTINGS_TABS, type SettingsTabId } from "./settings-types";
import { useUserSettings } from "./use-user-settings";
import { SettingsTabProfile } from "./settings-tab-profile";
import { SettingsTabPreferences } from "./settings-tab-preferences";
import { SettingsTabNotifications } from "./settings-tab-notifications";
import { SettingsTabAppearance } from "./settings-tab-appearance";
import { SettingsTabWallet } from "./settings-tab-wallet";

type SettingsDialogProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>;

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState<SettingsTabId>("profile");
  const { settings, updateSettings } = useUserSettings();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-3xl bg-card p-0">
        <DialogHeader className="border-b border-border-low px-4 pt-4 pb-3">
          <DialogTitle className="text-foreground">Settings</DialogTitle>
          <DialogDescription className="text-muted">
            Local preferences only · not saved to a server yet
          </DialogDescription>
        </DialogHeader>
        <DialogClose />

        <div className="flex min-h-[420px] flex-col sm:flex-row">
          <nav
            className="flex shrink-0 gap-0.5 overflow-x-auto border-b border-border-low p-2 sm:w-52 sm:flex-col sm:border-b-0 sm:border-r"
            aria-label="Settings sections"
          >
            {SETTINGS_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "shrink-0 rounded-none px-3 py-2 text-left text-xs font-medium transition",
                  activeTab === tab.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted hover:bg-cream hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "profile" ? (
              <SettingsTabProfile
                profile={settings.profile}
                onChange={(profile) =>
                  updateSettings({
                    profile: { ...settings.profile, ...profile },
                  })
                }
              />
            ) : null}
            {activeTab === "preferences" ? (
              <SettingsTabPreferences
                preferences={settings.preferences}
                onChange={(preferences) =>
                  updateSettings({
                    preferences: { ...settings.preferences, ...preferences },
                  })
                }
              />
            ) : null}
            {activeTab === "notifications" ? (
              <SettingsTabNotifications
                notifications={settings.notifications}
                onChange={(notifications) =>
                  updateSettings({
                    notifications: {
                      ...settings.notifications,
                      ...notifications,
                    },
                  })
                }
              />
            ) : null}
            {activeTab === "appearance" ? (
              <SettingsTabAppearance
                appearance={settings.appearance}
                preferences={settings.preferences}
                onAppearanceChange={(appearance) =>
                  updateSettings({
                    appearance: { ...settings.appearance, ...appearance },
                  })
                }
                onPreferencesChange={(preferences) =>
                  updateSettings({
                    preferences: { ...settings.preferences, ...preferences },
                  })
                }
              />
            ) : null}
            {activeTab === "wallet" ? <SettingsTabWallet /> : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
