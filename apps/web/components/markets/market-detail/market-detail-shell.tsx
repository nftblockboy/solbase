import { cn } from "@/lib/utils";

type MarketDetailShellProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export function MarketDetailShell({ children, className }: MarketDetailShellProps) {
  return (
    <div className={cn("mx-auto flex w-full max-w-6xl min-w-0 flex-col gap-4 py-4", className)}>
      {children}
    </div>
  );
}

