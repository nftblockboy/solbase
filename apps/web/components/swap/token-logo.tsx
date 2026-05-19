import { cn } from "@/lib/utils";
import type { MockToken } from "./mock-tokens";

type TokenLogoProps = Readonly<{
  token: MockToken;
  className?: string;
}>;

export function TokenLogo({ token, className }: TokenLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-none text-[10px] font-bold text-white",
        className
      )}
      style={{ backgroundColor: token.logoColor }}
      aria-hidden
    >
      {token.symbol.slice(0, 1)}
    </span>
  );
}
