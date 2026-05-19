import { createMockReportArchive } from "@solbase/ai-agents";
import { NextResponse } from "next/server";

export async function GET() {
  const reports = createMockReportArchive();
  return NextResponse.json({ reports });
}
