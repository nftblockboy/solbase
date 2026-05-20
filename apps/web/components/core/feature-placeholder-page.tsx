type FeaturePlaceholderPageProps = Readonly<{
  title: string;
  description: string;
}>;

export function FeaturePlaceholderPage({
  title,
  description,
}: FeaturePlaceholderPageProps) {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="flex min-h-[320px] w-full max-w-lg flex-col items-center justify-center rounded-none border border-border-low bg-cream px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <p className="mt-3 max-w-md text-sm text-muted">{description}</p>
      </div>
    </div>
  );
}
