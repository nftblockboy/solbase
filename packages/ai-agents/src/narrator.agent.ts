export type NarratorAgentInput = Readonly<{
  topic: string;
  analysis: string;
  risk: string;
}>;

export async function runNarratorAgent(
  input: NarratorAgentInput
): Promise<string> {
  return `Daily report for ${input.topic}\n\n${input.analysis}\n\n${input.risk}`;
}
