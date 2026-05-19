type MockSparklineProps = Readonly<{
  points: number[];
  positive: boolean;
  className?: string;
}>;

export function MockSparkline({ points, positive, className }: MockSparklineProps) {
  const width = 120;
  const height = 32;
  const padding = 2;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const path = points
    .map((y, i) => {
      const x =
        padding + (i / Math.max(points.length - 1, 1)) * (width - padding * 2);
      const normalizedY =
        height - padding - ((y - min) / range) * (height - padding * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${normalizedY.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden
      preserveAspectRatio="none"
    >
      <path
        d={path}
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={positive ? "stroke-emerald-500" : "stroke-red-500"}
      />
    </svg>
  );
}
