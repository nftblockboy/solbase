import type { ReportFinding } from "../schemas/index.js";

export type { Report, ReportFinding, ReportFindingInput, ReportInput } from "../schemas/index.js";

export type AgentRole = "scout" | "analyst" | "risk" | "narrator";

export type ReportStatus = "queued" | "running" | "complete" | "failed";

/** @deprecated Use ReportFinding */
export type ScoutFinding = ReportFinding;
