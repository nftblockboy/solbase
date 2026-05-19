export type MockToken = {
  symbol: string;
  mint: string;
  priceUsd: number;
  change24hPct: number;
  balance: string;
  logoColor: string;
  sparklinePoints: number[];
};

export function truncateMint(mint: string, head = 4, tail = 4): string {
  if (mint.length <= head + tail + 1) return mint;
  return `${mint.slice(0, head)}…${mint.slice(-tail)}`;
}

export function formatUsd(value: number, decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPrice(value: number): string {
  if (value >= 1) {
    return formatUsd(value, 2);
  }
  return formatUsd(value, 5);
}

export function formatChangePct(pct: number): string {
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(2)}%`;
}

export const MOCK_USDC: MockToken = {
  symbol: "USDC",
  mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  priceUsd: 0.99977,
  change24hPct: 0.01,
  balance: "0.00",
  logoColor: "#2775ca",
  sparklinePoints: [0.42, 0.44, 0.43, 0.45, 0.46, 0.45, 0.48, 0.47, 0.5, 0.52],
};

export const MOCK_SOL: MockToken = {
  symbol: "SOL",
  mint: "So11111111111111111111111111111111111111112",
  priceUsd: 84.85,
  change24hPct: -0.13,
  balance: "0.007841554",
  logoColor: "#9945ff",
  sparklinePoints: [0.72, 0.68, 0.7, 0.65, 0.62, 0.58, 0.55, 0.52, 0.48, 0.45],
};
