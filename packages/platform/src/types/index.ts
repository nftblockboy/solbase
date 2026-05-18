export type AgentRole = "scout" | "analyst" | "risk" | "narrator";

export type ReportStatus = "queued" | "running" | "complete" | "failed";

export type ScoutFinding = Readonly<{
  id: string;
  summary: string;
  severity: "low" | "medium" | "high";
}>;
