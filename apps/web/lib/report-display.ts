import type { Report } from "@solbase/platform";

export function formatGeneratedAt(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export function formatConfidence(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function severityStyles(severity: Report["findings"][number]["severity"]) {
  switch (severity) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-amber-100 text-amber-900 border-amber-200";
    case "low":
      return "bg-emerald-100 text-emerald-900 border-emerald-200";
  }
}
