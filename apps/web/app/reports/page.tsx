import Link from "next/link";

export default function ReportsPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col gap-4 px-5 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
      <p className="text-slate-700">
        Reports scaffolding is ready. Real report generation will be added next.
      </p>
      <div>
        <Link className="text-sky-700 underline" href="/">
          Back to home
        </Link>
      </div>
    </main>
  );
}
