import { runAnalystAgent } from "../analyst.agent.js";
import { runNarratorAgent } from "../narrator.agent.js";
import { runRiskAgent } from "../risk.agent.js";
import { runScoutAgent } from "../scout.agent.js";

export async function runDailyReportWorkflow(topic: string): Promise<string> {
  const findings = await runScoutAgent({ topic });
  const analysis = await runAnalystAgent({ findings });
  const risk = await runRiskAgent({ analysis });
  return runNarratorAgent({ topic, analysis, risk });
}
