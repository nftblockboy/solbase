import { z } from "zod";

export const ScoutFindingSchema = z.object({
  id: z.string(),
  summary: z.string(),
  severity: z.enum(["low", "medium", "high"])
});

export const ReportSchema = z.object({
  id: z.string(),
  status: z.enum(["queued", "running", "complete", "failed"]),
  findings: z.array(ScoutFindingSchema)
});

export type ScoutFindingInput = z.infer<typeof ScoutFindingSchema>;
export type ReportInput = z.infer<typeof ReportSchema>;
