import Link from "next/link";
import {
  MARKET_UNAVAILABLE_TITLE,
  resolveMarketLink,
  type MarketLinkRef,
} from "@/lib/markets/market-link";
import { cn } from "@/lib/utils";

type CommunityMarketChipProps = Readonly<{
  marketRef: MarketLinkRef;
  className?: string;
}>;

export function CommunityMarketChip({
  marketRef,
  className,
}: CommunityMarketChipProps) {
  const href = resolveMarketLink(marketRef);
  const label = `${marketRef.title}${marketRef.outcome ? ` · ${marketRef.outcome}` : ""}`;

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "text-sm font-medium text-accent hover:underline",
          className
        )}
      >
        {label}
      </Link>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex cursor-not-allowed items-center rounded-none border border-border-low bg-cream/40 px-2 py-0.5 text-sm font-medium text-muted",
        className
      )}
      title={MARKET_UNAVAILABLE_TITLE}
      aria-disabled="true"
    >
      {label}
      <span className="sr-only"> ({MARKET_UNAVAILABLE_TITLE})</span>
    </span>
  );
}
