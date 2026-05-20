export function formatUsd(value: number, options?: { compact?: boolean }): string {
  const abs = Math.abs(value);
  if (options?.compact) {
    if (abs >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
    if (abs >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPct(value: number, signed = false): string {
  const prefix = signed && value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(1)}%`;
}

export function formatPnl(value: number): string {
  const prefix = value >= 0 ? "+" : "";
  return `${prefix}${formatUsd(value)}`;
}

export function pnlToneClass(value: number): string {
  if (value > 0) return "text-emerald-500";
  if (value < 0) return "text-red-400";
  return "text-muted";
}

export function riskScoreTone(score: number): string {
  if (score >= 70) return "text-red-400";
  if (score >= 45) return "text-amber-500";
  return "text-emerald-500";
}
