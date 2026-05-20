import type { Market, PredictionEvent } from "@/lib/prediction/api";
import { getEventTitle, getMarketTitle } from "@/lib/prediction/market-display";

type MarketDetailHeaderProps = Readonly<{
  event: PredictionEvent;
  market: Market;
}>;

export function MarketDetailHeader({ event, market }: MarketDetailHeaderProps) {
  const eventTitle = getEventTitle(event);
  const marketTitle = getMarketTitle(market, event);

  return (
    <header className="flex min-w-0 items-start gap-4">
      {event.metadata?.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={event.metadata.imageUrl}
          alt=""
          className="size-14 shrink-0 rounded-none object-cover"
        />
      ) : (
        <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-none bg-cream text-lg font-bold text-muted">
          {eventTitle.charAt(0).toUpperCase()}
        </span>
      )}
      <div className="min-w-0 space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {event.category}
          {event.subcategory ? ` · ${event.subcategory}` : ""}
        </p>
        <h1 className="text-xl font-semibold leading-snug text-foreground">
          {eventTitle}
        </h1>
        {marketTitle !== eventTitle ? (
          <p className="text-sm text-muted">{marketTitle}</p>
        ) : null}
      </div>
    </header>
  );
}
