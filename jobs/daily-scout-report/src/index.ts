import { runDailyReportWorkflow } from "@solbase/ai-agents";

async function main() {
  const report = await runDailyReportWorkflow("solana market daily");
  console.log(report);
}

void main();
