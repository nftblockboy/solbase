"use client";

import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { MockSparkline } from "./mock-sparkline";
import type { MockToken } from "./mock-tokens";
import {
  formatChangePct,
  formatPrice,
  truncateMint,
} from "./mock-tokens";
import { TokenLogo } from "./token-logo";

type TokenInfoCardProps = Readonly<{
  token: MockToken;
  className?: string;
}>;

export function TokenInfoCard({ token, className }: TokenInfoCardProps) {
  const positive = token.change24hPct >= 0;

  return (
    <article
      className={cn(
        "flex flex-col rounded-none border border-border bg-card p-3",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <TokenLogo token={token} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {token.symbol}
            </p>
            <p className="truncate font-mono text-[10px] text-muted">
              {truncateMint(token.mint)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium tabular-nums text-foreground">
            {formatPrice(token.priceUsd)}
          </p>
          <p
            className={cn(
              "text-xs tabular-nums",
              positive ? "text-emerald-500" : "text-red-500"
            )}
          >
            {formatChangePct(token.change24hPct)}
          </p>
        </div>
      </div>

      <MockSparkline
        points={token.sparklinePoints}
        positive={positive}
        className="mt-3 h-8 w-full"
      />

      <button
        type="button"
        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-muted transition hover:text-accent"
      >
        Open Page
        <ExternalLink className="size-3" aria-hidden />
      </button>
    </article>
  );
}
