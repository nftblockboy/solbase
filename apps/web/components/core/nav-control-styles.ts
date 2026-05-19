import { cn } from "@/lib/utils";

/** Shared compact nav control sizing (theme toggle, wallet button, etc.) */
export const navControlClassName = cn(
  "inline-flex h-8 shrink-0 items-center justify-center rounded-none border border-border bg-card text-xs font-medium text-foreground transition",
  "hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
);
