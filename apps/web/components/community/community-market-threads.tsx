import Link from "next/link";
import type { MarketDiscussionThread } from "@/lib/mock/community";
import { resolveMarketLink } from "@/lib/markets/market-link";
import { Surface } from "@/components/ui/surface";
import { CommunitySectionHeading } from "./community-section-heading";
import { cn } from "@/lib/utils";

type CommunityMarketThreadsProps = Readonly<{
  threads: MarketDiscussionThread[];
}>;

export function CommunityMarketThreads({ threads }: CommunityMarketThreadsProps) {
  return (
    <Surface variant="panel" className="p-4">
      <CommunitySectionHeading title="Market threads" />
      <ul className="flex flex-col divide-y divide-border-low">
        {threads.map((thread) => {
          const href = resolveMarketLink({
            slug: thread.slug,
            title: thread.marketTitle,
          });

          return (
            <li key={thread.id} className="py-2.5 first:pt-0 last:pb-0">
              {href ? (
                <Link
                  href={href}
                  className="line-clamp-2 text-sm font-medium text-foreground hover:text-accent"
                >
                  {thread.marketTitle}
                </Link>
              ) : (
                <span
                  className={cn(
                    "line-clamp-2 cursor-not-allowed text-sm font-medium text-muted"
                  )}
                  title="Market unavailable in the live feed"
                >
                  {thread.marketTitle}
                </span>
              )}
              <div className="mt-1 flex flex-wrap gap-2 text-[10px] tabular-nums text-muted">
                <span>{thread.replyCount} replies</span>
                <span>heat {thread.heatScore}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </Surface>
  );
}
