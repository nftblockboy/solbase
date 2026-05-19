import type { Category } from "./constants";

/** Categories that use full-width grid only (no left subcategory sidebar). */
export const CATEGORIES_WITHOUT_SIDEBAR = [
  "politics",
  "culture",
  "tech",
  "finance",
  "weather",
  "mentions",
] as const satisfies readonly Category[];

export function categoryHasSidebar(category: Category): boolean {
  return (
    category !== "all" &&
    !(CATEGORIES_WITHOUT_SIDEBAR as readonly string[]).includes(category)
  );
}

/** Best-effort icon labels for API subcategory slugs (sports-heavy). */
export const SUBCATEGORY_LABELS: Record<string, string> = {
  basketball: "Basketball",
  soccer: "Soccer",
  football: "Football",
  tennis: "Tennis",
  baseball: "Baseball",
  hockey: "Hockey",
  mma: "UFC",
  ufc: "UFC",
  "formula-1": "Formula 1",
  f1: "Formula 1",
  golf: "Golf",
  cricket: "Cricket",
  esports: "Esports",
};

export function formatSubcategoryLabel(slug: string): string {
  const key = slug.toLowerCase().replace(/\s+/g, "-");
  if (SUBCATEGORY_LABELS[key]) return SUBCATEGORY_LABELS[key];
  return slug
    .split(/[-_\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getCategorySectionLabel(category: Category): string {
  if (category === "all") return "ALL";
  return `ALL ${category.toUpperCase()}`;
}
