import type {
  LeaderboardCategory,
  LeaderboardSortKey,
} from "@/lib/mock/leaderboard";

export type SettingsTabId =
  | "profile"
  | "preferences"
  | "notifications"
  | "appearance"
  | "wallet";

export type SettingsDensity = "comfortable" | "compact";

export type UserSettings = {
  profile: {
    displayName: string;
    bio: string;
    twitterHandle: string;
    preferredCategories: LeaderboardCategory[];
    publicProfileEnabled: boolean;
  };
  preferences: {
    defaultLeaderboardMetric: LeaderboardSortKey;
    defaultMarketCategory: LeaderboardCategory;
    compactMode: boolean;
  };
  notifications: {
    marketAlerts: boolean;
    followedTraderActivity: boolean;
    positionSettlement: boolean;
  };
  appearance: {
    density: SettingsDensity;
  };
};

export const DEFAULT_USER_SETTINGS: UserSettings = {
  profile: {
    displayName: "",
    bio: "",
    twitterHandle: "",
    preferredCategories: [],
    publicProfileEnabled: true,
  },
  preferences: {
    defaultLeaderboardMetric: "roi",
    defaultMarketCategory: "all",
    compactMode: false,
  },
  notifications: {
    marketAlerts: true,
    followedTraderActivity: true,
    positionSettlement: true,
  },
  appearance: {
    density: "comfortable",
  },
};

export const SETTINGS_TABS: { id: SettingsTabId; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "preferences", label: "Preferences" },
  { id: "notifications", label: "Notifications" },
  { id: "appearance", label: "Appearance" },
  { id: "wallet", label: "Connected Wallet" },
];
