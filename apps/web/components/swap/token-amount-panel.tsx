"use client";

import { ChevronDown, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MockToken } from "./mock-tokens";
import { formatUsd } from "./mock-tokens";
import { TokenLogo } from "./token-logo";

type TokenAmountPanelProps = Readonly<{
  label: string;
  token: MockToken;
  balance?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  usdValue?: number;
  readOnly?: boolean;
  showPasteCa?: boolean;
  className?: string;
}>;

export function TokenAmountPanel({
  label,
  token,
  balance,
  value = "",
  onValueChange,
  usdValue = 0,
  readOnly = false,
  showPasteCa = false,
  className,
}: TokenAmountPanelProps) {
  const displayBalance = balance ?? token.balance;

  return (
    <section
      className={cn(
        "space-y-3 rounded-none border border-border-low bg-cream p-3",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-medium text-muted">{label}</span>
          {showPasteCa ? (
            <button
              type="button"
              className="rounded-none border border-border-low bg-card px-2 py-0.5 text-[10px] font-medium text-muted transition hover:text-foreground"
            >
              Paste CA
            </button>
          ) : null}
        </div>
        <span className="inline-flex items-center gap-1 text-muted tabular-nums">
          <Wallet className="size-3 shrink-0" aria-hidden />
          {displayBalance} {token.symbol}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-2 rounded-none border border-border-low bg-card px-2.5 py-2 text-sm font-medium text-foreground transition hover:border-accent"
          aria-label={`Select ${token.symbol}`}
        >
          <TokenLogo token={token} />
          <span>{token.symbol}</span>
          <ChevronDown className="size-4 text-muted" aria-hidden />
        </button>

        <div className="min-w-0 flex-1 text-right">
          {readOnly ? (
            <p className="text-2xl font-medium tabular-nums text-foreground/30">
              &nbsp;
            </p>
          ) : (
            <input
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              value={value}
              onChange={(e) => onValueChange?.(e.target.value)}
              className="w-full bg-transparent text-right text-2xl font-medium tabular-nums text-foreground placeholder:text-foreground/30 focus:outline-none"
              aria-label={`${label} amount`}
            />
          )}
          <p className="text-xs text-muted tabular-nums">
            {formatUsd(usdValue)}
          </p>
        </div>
      </div>
    </section>
  );
}
