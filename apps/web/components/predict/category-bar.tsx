"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES, type Category } from "@/lib/prediction/constants";

type CategoryBarProps = Readonly<{
  category: Category;
  onCategoryChange: (category: Category) => void;
  className?: string;
}>;

const CATEGORY_LABELS: Record<Category, string> = {
  all: "All",
  crypto: "Crypto",
  sports: "Sports",
  politics: "Politics",
  esports: "Esports",
  culture: "Culture",
  economics: "Economics",
  tech: "Tech",
  finance: "Finance",
  weather: "Weather",
  mentions: "Mentions",
};

const SCROLL_STEP = 200;

export function CategoryBar({
  category,
  onCategoryChange,
  className,
}: CategoryBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollHintsReady, setScrollHintsReady] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollHints = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    setScrollHintsReady(true);
    const el = scrollRef.current;
    if (!el) return;
    updateScrollHints();
    el.addEventListener("scroll", updateScrollHints, { passive: true });
    const ro = new ResizeObserver(updateScrollHints);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollHints);
      ro.disconnect();
    };
  }, [updateScrollHints]);

  const showScrollLeft = scrollHintsReady && canScrollLeft;
  const showScrollRight = scrollHintsReady && canScrollRight;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLElement>('[aria-selected="true"]');
    active?.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
  }, [category]);

  function scrollBy(delta: number) {
    scrollRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-1 items-center overflow-hidden",
        className
      )}
    >
      {showScrollLeft ? (
        <button
          type="button"
          onClick={() => scrollBy(-SCROLL_STEP)}
          className="absolute left-0 z-10 flex size-8 shrink-0 items-center justify-center rounded-none border border-border bg-background/95 text-muted shadow-sm transition hover:text-foreground"
          aria-label="Scroll categories left"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>
      ) : null}

      <div
        ref={scrollRef}
        className={cn(
          "scrollbar-hide flex min-w-0 flex-1 items-center gap-1 overflow-x-auto overflow-y-hidden scroll-smooth",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          showScrollLeft && "pl-9",
          showScrollRight && "pr-9"
        )}
        role="tablist"
        aria-label="Market categories"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={category === cat}
            onClick={() => onCategoryChange(cat)}
            className={cn(
              "shrink-0 rounded-none px-3 py-2 text-sm font-medium capitalize transition",
              category === cat
                ? "border-b-2 border-primary text-primary"
                : "text-muted hover:text-foreground"
            )}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {showScrollRight ? (
        <button
          type="button"
          onClick={() => scrollBy(SCROLL_STEP)}
          className="absolute right-0 z-10 flex size-8 shrink-0 items-center justify-center rounded-none border border-border bg-background/95 text-muted shadow-sm transition hover:text-foreground"
          aria-label="Scroll categories right"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
