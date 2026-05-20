export type CommunityDiscussParams = Readonly<{
  marketId: string;
  eventId: string;
  title: string;
}>;

export function buildCommunityDiscussHref({
  marketId,
  eventId,
  title,
}: CommunityDiscussParams): string {
  const params = new URLSearchParams({
    marketId,
    eventId,
    marketTitle: title,
  });
  return `/community?${params.toString()}`;
}
