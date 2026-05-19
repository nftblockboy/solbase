import type { Report } from "@solbase/platform";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReportDetail } from "../report-detail";
import { getBaseUrl } from "../../../lib/server-fetch";

export const dynamic = "force-dynamic";

type PageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

async function fetchReportById(id: string): Promise<Report | null> {
  const baseUrl = await getBaseUrl();

  try {
    const response = await fetch(`${baseUrl}/api/reports/${encodeURIComponent(id)}`, {
      cache: "no-store"
    });
    if (response.status === 404) return null;
    if (!response.ok) return null;
    return (await response.json()) as Report;
  } catch {
    return null;
  }
}

export default async function ReportDetailPage({ params }: PageProps) {
  const { id } = await params;
  const report = await fetchReportById(id);

  if (!report) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col gap-6 px-5 py-10">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900">Report details</h1>
          <p className="font-mono text-xs text-slate-500">{report.id}</p>
        </div>
        <Link className="text-sm text-sky-700 underline" href="/reports">
          Back to archive
        </Link>
      </div>

      <ReportDetail report={report} />
    </main>
  );
}
