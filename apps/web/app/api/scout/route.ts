import { runDailyReportWorkflow } from "@solbase/ai-agents";
import { NextResponse } from "next/server";

const DEFAULT_TOPIC = "solana market daily";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic")?.trim() || DEFAULT_TOPIC;

  try {
    const report = await runDailyReportWorkflow(topic);
    return NextResponse.json(report);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate scout report" },
      { status: 500 }
    );
  }
}
