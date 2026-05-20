"use client";

import type { UserSettings } from "./settings-types";
import { SettingsToggle } from "./settings-field";

type SettingsTabNotificationsProps = Readonly<{
  notifications: UserSettings["notifications"];
  onChange: (notifications: Partial<UserSettings["notifications"]>) => void;
}>;

export function SettingsTabNotifications({
  notifications,
  onChange,
}: SettingsTabNotificationsProps) {
  return (
    <div className="flex flex-col gap-2 divide-y divide-border-low">
      <SettingsToggle
        label="Market alerts"
        checked={notifications.marketAlerts}
        onChange={(marketAlerts) => onChange({ marketAlerts })}
      />
      <SettingsToggle
        label="Followed trader activity"
        checked={notifications.followedTraderActivity}
        onChange={(followedTraderActivity) => onChange({ followedTraderActivity })}
      />
      <SettingsToggle
        label="Position settlement"
        checked={notifications.positionSettlement}
        onChange={(positionSettlement) => onChange({ positionSettlement })}
      />
    </div>
  );
}
