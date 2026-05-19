import { type Report, ReportSchema } from "@solbase/platform";
import { createMockDailyReport } from "./daily-report.js";

export const ARCHIVE_TOPICS = [
  "solana market daily",
  "memecoin rotation",
  "defi yields",
  "nft floor activity",
  "validator economics"
] as const;

export function createMockReportArchive(): Report[] {
  return ARCHIVE_TOPICS.map((topic) =>
    ReportSchema.parse(createMockDailyReport(topic))
  );
}

export function getMockReportById(id: string): Report | undefined {
  return createMockReportArchive().find((report) => report.id === id);
}
