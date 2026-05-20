"use client";

import { useCallback, useState } from "react";
import {
  DEFAULT_USER_SETTINGS,
  type UserSettings,
} from "./settings-types";

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_USER_SETTINGS);

  const updateSettings = useCallback((partial: Partial<UserSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...partial,
      profile: partial.profile
        ? { ...prev.profile, ...partial.profile }
        : prev.profile,
      preferences: partial.preferences
        ? { ...prev.preferences, ...partial.preferences }
        : prev.preferences,
      notifications: partial.notifications
        ? { ...prev.notifications, ...partial.notifications }
        : prev.notifications,
      appearance: partial.appearance
        ? { ...prev.appearance, ...partial.appearance }
        : prev.appearance,
    }));
  }, []);

  return { settings, updateSettings };
}
