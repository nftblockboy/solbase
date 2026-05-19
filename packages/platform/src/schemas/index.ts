import { z } from "zod";

export const ReportFindingSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  severity: z.enum(["low", "medium", "high"]),
  category: z.enum(["liquidity", "sentiment", "volatility", "onchain"]),
  confidence: z.number().min(0).max(1)
});

export const ReportSchema = z.object({
  id: z.string(),
  title: z.string(),
  generatedAt: z.string().datetime(),
  market: z.string(),
  status: z.enum(["queued", "running", "complete", "failed"]),
  summary: z.string(),
  findings: z.array(ReportFindingSchema)
});

export type ReportFinding = z.infer<typeof ReportFindingSchema>;
export type Report = z.infer<typeof ReportSchema>;
export type ReportInput = Report;
export type ReportFindingInput = ReportFinding;

/** @deprecated Use ReportFindingSchema */
export const ScoutFindingSchema = ReportFindingSchema;
/** @deprecated Use ReportFinding */
export type ScoutFindingInput = ReportFinding;
