import type { Report } from "@solbase/platform";
import {
  formatConfidence,
  formatGeneratedAt,
  severityStyles
} from "../../lib/report-display";

type ReportDetailProps = Readonly<{
  report: Report;
}>;

export function ReportDetail({ report }: ReportDetailProps) {
  return (
    <>
      <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
            {report.status}
          </span>
          <span className="text-xs text-slate-500">{report.market}</span>
          <span className="text-xs text-slate-500">
            {formatGeneratedAt(report.generatedAt)}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-slate-900">{report.title}</h2>
        <p className="text-sm text-slate-700">{report.summary}</p>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
          Findings ({report.findings.length})
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {report.findings.map((finding) => (
            <article
              key={finding.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs font-semibold uppercase ${severityStyles(finding.severity)}`}
                >
                  {finding.severity}
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                  {finding.category}
                </span>
                <span className="text-xs text-slate-500">
                  {formatConfidence(finding.confidence)} confidence
                </span>
              </div>
              <h4 className="text-base font-semibold text-slate-900">
                {finding.title}
              </h4>
              <p className="mt-1 text-sm text-slate-700">{finding.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
