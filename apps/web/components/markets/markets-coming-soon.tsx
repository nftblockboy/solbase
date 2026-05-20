export function MarketsComingSoon({ label }: Readonly<{ label: string }>) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-none border border-border-low bg-cream px-4 py-16 text-center">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="mt-1 text-xs text-muted">Coming soon</p>
    </div>
  );
}
