import type { AiPortfolioInsight } from "@/lib/mock/portfolio";
import { Surface } from "@/components/ui/surface";
import { PortfolioSectionHeading } from "./portfolio-section-heading";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Eye,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { ElementType } from "react";

type PortfolioAiInsightsProps = Readonly<{
  insights: AiPortfolioInsight[];
}>;

const KIND_META: Record<
  AiPortfolioInsight["kind"],
  { icon: ElementType; label: string }
> = {
  high_conviction: { icon: TrendingUp, label: "Conviction" },
  concentration_risk: { icon: AlertTriangle, label: "Risk" },
  watchlist: { icon: Eye, label: "Watchlist" },
  sentiment: { icon: Sparkles, label: "Sentiment" },
};

function severityBorder(severity?: AiPortfolioInsight["severity"]) {
  if (severity === "warning") return "border-amber-500/40";
  if (severity === "positive") return "border-emerald-500/40";
  return "border-border-low";
}

export function PortfolioAiInsights({ insights }: PortfolioAiInsightsProps) {
  return (
    <Surface variant="panel" className="flex flex-col p-4">
      <PortfolioSectionHeading
        title="AI portfolio analysis"
        subtitle="Mock insights · no live model"
      />
      <div className="grid gap-2 sm:grid-cols-2">
        {insights.map((insight) => {
          const meta = KIND_META[insight.kind];
          const Icon = meta.icon;
          return (
            <Surface
              key={insight.id}
              variant="inset"
              className={cn(
                "flex flex-col gap-2 border p-3",
                severityBorder(insight.severity)
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className="size-4 shrink-0 text-accent" aria-hidden />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  {meta.label}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {insight.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted">{insight.body}</p>
            </Surface>
          );
        })}
      </div>
    </Surface>
  );
}
