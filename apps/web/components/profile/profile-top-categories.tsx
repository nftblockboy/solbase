import type { LeaderboardCategory } from "@/lib/mock/leaderboard";
import { CATEGORIES } from "@/lib/mock/leaderboard";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";
import { ProfileSectionHeading } from "./profile-section-heading";

type ProfileTopCategoriesProps = Readonly<{
  categories: LeaderboardCategory[];
}>;

const LABEL_BY_ID = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.label])
) as Record<LeaderboardCategory, string>;

export function ProfileTopCategories({ categories }: ProfileTopCategoriesProps) {
  if (categories.length === 0) return null;

  return (
    <Surface variant="panel" className="flex h-full flex-col p-4">
      <ProfileSectionHeading title="Top categories" />
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <span
            key={cat}
            className={cn(
              "rounded-none border border-border-low bg-cream px-2.5 py-1 text-xs font-medium text-foreground"
            )}
          >
            {LABEL_BY_ID[cat] ?? cat}
          </span>
        ))}
      </div>
    </Surface>
  );
}
