import type { PredictionEvent } from "./api";

export type SportsView = "games" | "props";

/** League-style subcategories from Jupiter sports feed (match / game markets). */
const GAME_SUBCATEGORIES = new Set([
  "atp",
  "cricipl",
  "epl",
  "f1",
  "fifwc",
  "mlb",
  "nba",
  "nhl",
  "ucl",
  "lal",
  "sea",
  "ufc",
  "wta",
]);

const VS_PATTERN = /\bvs\.?\b/i;

export function isSportsGameEvent(event: PredictionEvent): boolean {
  const sub = event.subcategory?.toLowerCase();
  if (sub && GAME_SUBCATEGORIES.has(sub)) return true;

  const title = event.metadata?.title ?? "";
  if (VS_PATTERN.test(title)) return true;

  return (event.markets ?? []).some(
    (m) => m.isTeamMarket === true || Boolean(m.team)
  );
}

export function filterSportsEvents(
  events: PredictionEvent[],
  view: SportsView
): PredictionEvent[] {
  return events.filter((event) =>
    view === "games" ? isSportsGameEvent(event) : !isSportsGameEvent(event)
  );
}
