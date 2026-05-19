import { runDailyReportWorkflow } from "@solbase/ai-agents";

async function main() {
  const report = await runDailyReportWorkflow("solana market daily");
  console.log(`[daily-scout-report] ${report.id} — ${report.title}`);
}

void main();
