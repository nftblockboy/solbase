import { MarketDetailView } from "@/components/predict/market-detail-view";

type MarketPageProps = Readonly<{
  params: Promise<{ marketId: string }>;
  searchParams: Promise<{ event?: string }>;
}>;

export default async function MarketPage({ params, searchParams }: MarketPageProps) {
  const { marketId } = await params;
  const { event: eventId } = await searchParams;

  return <MarketDetailView marketId={marketId} eventId={eventId} />;
}
