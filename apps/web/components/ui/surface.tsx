import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

export type SurfaceVariant = "card" | "panel" | "chrome" | "inset";

const variantClasses: Record<SurfaceVariant, string> = {
  card: "glass-surface rounded-none transition-shadow duration-300 hover:shadow-[var(--shadow-float-hover)]",
  panel: "glass-surface rounded-none",
  chrome: "glass-surface rounded-none",
  inset: "glass-surface rounded-none opacity-95",
};

export function surfaceClassName(
  variant: SurfaceVariant = "card",
  className?: string
) {
  return cn(variantClasses[variant], className);
}

type SurfaceProps<E extends ElementType> = {
  as?: E;
  variant?: SurfaceVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<E>, "as" | "variant" | "className">;

export function Surface<E extends ElementType = "div">({
  as,
  variant = "card",
  className,
  ...props
}: SurfaceProps<E>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={surfaceClassName(variant, className)}
      {...(props as ComponentPropsWithoutRef<typeof Component>)}
    />
  );
}
