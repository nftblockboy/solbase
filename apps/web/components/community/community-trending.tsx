import Link from "next/link";
import type { TrendingDiscussion } from "@/lib/mock/community";
import { CATEGORIES } from "@/lib/mock/leaderboard";
import { resolveMarketLink } from "@/lib/markets/market-link";
import { timeAgo } from "@/lib/prediction/utils";
import { Surface } from "@/components/ui/surface";
import { CommunitySectionHeading } from "./community-section-heading";

type CommunityTrendingProps = Readonly<{
  discussions: TrendingDiscussion[];
}>;

const CATEGORY_LABEL = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.label])
) as Record<string, string>;

export function CommunityTrending({ discussions }: CommunityTrendingProps) {
  return (
    <Surface variant="panel" className="p-4">
      <CommunitySectionHeading title="Trending discussions" />
      <ul className="flex flex-col divide-y divide-border-low">
        {discussions.map((d) => {
          const href = d.marketRef ? resolveMarketLink(d.marketRef) : null;

          return (
            <li
              key={d.id}
              className="flex flex-col gap-1 py-2.5 first:pt-0 last:pb-0"
            >
              {href ? (
                <Link
                  href={href}
                  className="text-sm font-medium text-foreground hover:text-accent"
                >
                  {d.title}
                </Link>
              ) : (
                <span className="text-sm font-medium text-foreground">
                  {d.title}
                </span>
              )}
              <div className="flex flex-wrap gap-2 text-[10px] text-muted">
                <span>{CATEGORY_LABEL[d.category] ?? d.category}</span>
                <span className="tabular-nums">{d.postCount} posts</span>
                <span className="tabular-nums">{timeAgo(d.lastActivityAt)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </Surface>
  );
}
