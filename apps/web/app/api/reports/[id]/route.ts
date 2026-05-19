import { getMockReportById } from "@solbase/ai-agents";
import { NextResponse } from "next/server";

type RouteContext = Readonly<{
  params: Promise<{ id: string }>;
}>;

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const report = getMockReportById(id);

  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  return NextResponse.json(report);
}
