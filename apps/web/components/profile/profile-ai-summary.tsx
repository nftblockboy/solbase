import type { TraderAiSummary } from "@/lib/mock/profile";
import { Surface } from "@/components/ui/surface";
import { Sparkles } from "lucide-react";
import { ProfileSectionHeading } from "./profile-section-heading";

type ProfileAiSummaryProps = Readonly<{
  summary: TraderAiSummary;
}>;

export function ProfileAiSummary({ summary }: ProfileAiSummaryProps) {
  return (
    <Surface variant="panel" className="p-4">
      <ProfileSectionHeading
        title="AI trader summary"
        subtitle="Mock · no live model"
      />
      <div className="flex gap-3">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
        <div className="min-w-0 flex-1 space-y-2">
          <h3 className="text-sm font-semibold text-foreground">
            {summary.headline}
          </h3>
          <p className="text-sm text-muted">{summary.body}</p>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted">
            {summary.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p className="text-[10px] tabular-nums text-muted">
            Generated {new Date(summary.generatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </Surface>
  );
}
