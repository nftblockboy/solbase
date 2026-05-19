type PlaceholderPageProps = Readonly<{
  title: string;
}>;

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
  );
}
