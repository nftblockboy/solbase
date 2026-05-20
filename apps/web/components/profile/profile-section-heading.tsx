type ProfileSectionHeadingProps = Readonly<{
  title: string;
  subtitle?: string;
}>;

export function ProfileSectionHeading({
  title,
  subtitle,
}: ProfileSectionHeadingProps) {
  return (
    <div className="mb-3 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-xs text-muted tabular-nums">{subtitle}</p>
      ) : null}
    </div>
  );
}
