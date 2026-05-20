const AVATAR_COLORS = [
  "#7C3AED",
  "#6366F1",
  "#8B5CF6",
  "#6D28D9",
  "#A78BFA",
  "#5B21B6",
  "#C4B5FD",
] as const;

function hashAddress(address: string): number {
  let h = 0;
  for (let i = 0; i < address.length; i++) {
    h = (h * 31 + address.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function walletNavIdentity(address: string): {
  initials: string;
  color: string;
} {
  const seed = hashAddress(address);
  const chars = address.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  const initials =
    chars.length >= 2
      ? `${chars[0]}${chars[1]}`
      : chars.length === 1
        ? `${chars[0]}?`
        : "??";

  return {
    initials,
    color: AVATAR_COLORS[seed % AVATAR_COLORS.length]!,
  };
}
