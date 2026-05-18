import type { ScoutFinding } from "@solbase/platform";

export type AnalystAgentInput = Readonly<{
  findings: ReadonlyArray<ScoutFinding>;
}>;

export async function runAnalystAgent(
  input: AnalystAgentInput
): Promise<string> {
  return `Analyzed ${input.findings.length} finding(s).`;
}
