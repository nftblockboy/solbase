import type { ReportFinding } from "@solbase/platform";

export type ScoutAgentInput = Readonly<{
  topic: string;
}>;

export async function runScoutAgent(
  input: ScoutAgentInput
): Promise<ReadonlyArray<ReportFinding>> {
  return [
    {
      id: "finding_stub_1",
      title: "Scout placeholder",
      summary: `Scouted topic: ${input.topic}`,
      severity: "low",
      category: "onchain",
      confidence: 0.5
    }
  ];
}
