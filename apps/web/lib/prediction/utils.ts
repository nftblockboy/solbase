export function truncateAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function toRawUsd(microUsd: string | number): number {
  return Number(microUsd) / 1_000_000;
}

export function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toFixed(2);
}

/** Seconds vs ms threshold: values below 1e12 are treated as Unix seconds. */
const SECONDS_EPOCH_THRESHOLD = 1e12;

/**
 * Normalize a timestamp to Unix milliseconds.
 * Mock data should use ms (`Date.now()`). Legacy seconds values are upgraded.
 */
export function toEpochMs(timestamp: number): number {
  if (!Number.isFinite(timestamp) || timestamp <= 0) {
    return Date.now();
  }
  return timestamp < SECONDS_EPOCH_THRESHOLD ? timestamp * 1000 : timestamp;
}

/**
 * Human-readable relative time from a Unix timestamp (ms preferred; seconds accepted).
 */
export function timeAgo(timestamp: number): string {
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - toEpochMs(timestamp)) / 1000)
  );
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
