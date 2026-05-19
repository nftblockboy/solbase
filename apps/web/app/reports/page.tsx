import type { Report } from "@solbase/platform";
import Link from "next/link";
import { formatGeneratedAt } from "../../lib/report-display";
import { getBaseUrl } from "../../lib/server-fetch";

export const dynamic = "force-dynamic";

type ReportsResponse = Readonly<{
  reports: Report[];
}>;

async function fetchReportArchive(): Promise<Report[]> {
  const baseUrl = await getBaseUrl();

  try {
    const response = await fetch(`${baseUrl}/api/reports`, { cache: "no-store" });
    if (!response.ok) return [];
    const data = (await response.json()) as ReportsResponse;
    return data.reports;
  } catch {
    return [];
  }
}

export default async function ReportsPage() {
  const reports = await fetchReportArchive();

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col gap-6 px-5 py-10">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900">Report archive</h1>
          <p className="text-slate-700">
            Browse archived scout reports. Latest generated report:{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
              GET /api/scout
            </code>
          </p>
        </div>
        <Link className="text-sm text-sky-700 underline" href="/">
          Back to home
        </Link>
      </div>

      {reports.length === 0 ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          Could not load the report archive. Start the dev server and try again.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {reports.map((report) => (
            <Link
              key={report.id}
              href={`/reports/${report.id}`}
              className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-300 hover:shadow-md"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase text-slate-700">
                  {report.status}
                </span>
                <span className="text-xs text-slate-500">
                  {formatGeneratedAt(report.generatedAt)}
                </span>
              </div>
              <h2 className="text-base font-semibold text-slate-900">
                {report.title}
              </h2>
              <p className="mt-1 text-xs text-slate-500">{report.market}</p>
              <p className="mt-2 line-clamp-2 text-sm text-slate-700">
                {report.summary}
              </p>
              <p className="mt-2 text-xs font-medium text-sky-700">
                {report.findings.length} findings →
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
