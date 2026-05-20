import { cn } from "@/lib/utils";

type MarketDetailSectionHeadingProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export function MarketDetailSectionHeading({
  children,
  className,
}: MarketDetailSectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-[10px] font-semibold uppercase tracking-wider text-muted",
        className
      )}
    >
      {children}
    </h2>
  );
}
