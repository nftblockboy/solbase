import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    reports: [],
    status: "ok"
  });
}

export async function POST() {
  return NextResponse.json(
    {
      id: "report_stub",
      status: "queued"
    },
    { status: 202 }
  );
}
