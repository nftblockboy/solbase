type ReportCardProps = Readonly<{
  title: string;
  summary: string;
}>;

export function ReportCard({ title, summary }: ReportCardProps) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{summary}</p>
    </article>
  );
}
