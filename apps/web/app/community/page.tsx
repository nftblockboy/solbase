import { CommunityShell } from "@/components/community";

type CommunityPageProps = Readonly<{
  searchParams: Promise<{
    marketId?: string;
    eventId?: string;
    marketTitle?: string;
  }>;
}>;

export default async function CommunityPage({ searchParams }: CommunityPageProps) {
  const params = await searchParams;
  const marketContext =
    params.marketId && params.eventId && params.marketTitle
      ? {
          marketId: params.marketId,
          eventId: params.eventId,
          marketTitle: params.marketTitle,
        }
      : null;

  return <CommunityShell marketContext={marketContext} />;
}
