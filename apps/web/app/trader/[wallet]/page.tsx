import { ProfileShell } from "@/components/profile";

type TraderPageProps = Readonly<{
  params: Promise<{ wallet: string }>;
}>;

export default async function TraderPage({ params }: TraderPageProps) {
  const { wallet } = await params;
  const decoded = decodeURIComponent(wallet);

  return <ProfileShell wallet={decoded} />;
}
