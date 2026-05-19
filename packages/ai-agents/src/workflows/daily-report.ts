import {
  type Report,
  ReportSchema,
  type ReportFinding
} from "@solbase/platform";

const FINDING_TEMPLATES: ReadonlyArray<
  Omit<ReportFinding, "id" | "summary"> & { summaryPrefix: string }
> = [
  {
    title: "DEX liquidity concentration",
    summaryPrefix: "Liquidity remains concentrated in top pools for",
    severity: "medium",
    category: "liquidity",
    confidence: 0.82
  },
  {
    title: "Social sentiment shift",
    summaryPrefix: "Narrative momentum is tilting bullish around",
    severity: "low",
    category: "sentiment",
    confidence: 0.71
  },
  {
    title: "Volatility spike risk",
    summaryPrefix: "Short-term realized volatility is elevated for",
    severity: "high",
    category: "volatility",
    confidence: 0.88
  }
];

function hashTopic(topic: string): number {
  let hash = 0;
  for (let i = 0; i < topic.length; i++) {
    hash = (hash * 31 + topic.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function slugFromTopic(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function createMockDailyReport(topic: string): Report {
  const hash = hashTopic(topic);
  const slug = slugFromTopic(topic) || "market";
  const dayOffset = hash % 28;
  const generatedAt = new Date(
    Date.UTC(2026, 0, 1 + dayOffset, 12, 0, 0)
  ).toISOString();

  const findings: ReportFinding[] = FINDING_TEMPLATES.map((template, index) => ({
    id: `finding_${slug}_${index + 1}`,
    title: template.title,
    summary: `${template.summaryPrefix} ${topic}.`,
    severity: template.severity,
    category: template.category,
    confidence: template.confidence
  }));

  return {
    id: `report_${slug}_${hash.toString(16).padStart(8, "0")}`,
    title: `Daily Scout Report: ${topic}`,
    generatedAt,
    market: `Solana / ${topic}`,
    status: "complete",
    summary: `Scout completed a deterministic pass on "${topic}" with ${findings.length} findings across liquidity, sentiment, and volatility.`,
    findings
  };
}

export async function runDailyReportWorkflow(topic: string): Promise<Report> {
  return ReportSchema.parse(createMockDailyReport(topic));
}
