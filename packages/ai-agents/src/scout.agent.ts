import type { ScoutFinding } from "@solbase/platform";

export type ScoutAgentInput = Readonly<{
  topic: string;
}>;

export async function runScoutAgent(
  input: ScoutAgentInput
): Promise<ReadonlyArray<ScoutFinding>> {
  return [
    {
      id: "finding_stub_1",
      summary: `Scouted topic: ${input.topic}`,
      severity: "low"
    }
  ];
}
