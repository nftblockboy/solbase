export type RiskAgentInput = Readonly<{
  analysis: string;
}>;

export async function runRiskAgent(input: RiskAgentInput): Promise<string> {
  return `Risk summary (stub): ${input.analysis}`;
}
