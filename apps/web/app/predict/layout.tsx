export default function PredictLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col self-stretch pt-2">
      {children}
    </div>
  );
}
