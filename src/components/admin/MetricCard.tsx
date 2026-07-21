import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

import type { DashboardMetric } from "../../types/analytics";

type MetricCardProps = {
  metric: DashboardMetric;
  icon: LucideIcon;
};

function formatMetricValue(metric: DashboardMetric) {
  switch (metric.unit) {
    case "minutes":
      return `${metric.value.toLocaleString("fr-FR")} min`;

    case "percentage":
      return `${metric.value.toLocaleString("fr-FR")} %`;

    case "count":
      return metric.value.toLocaleString("fr-FR");
  }
}

export function MetricCard({ metric, icon: Icon }: MetricCardProps) {
  const isIncreasing = metric.changePercentage >= 0;
  const TrendIcon = isIncreasing ? ArrowUpRight : ArrowDownRight;

  return (
    <article className="rounded-lg border border-stone-200 bg-white p-4 md:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 className="max-w-[80%] font-mono text-[10px] font-medium uppercase leading-snug tracking-wider text-stone-500">
          {metric.label}
        </h2>

        <span className="grid size-8 shrink-0 place-items-center rounded-md bg-amber-50 text-amber-700">
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </div>

      <div className="flex items-end justify-between gap-3">
        <p className="font-display text-2xl font-bold leading-none text-stone-800 lg:text-3xl">
          {formatMetricValue(metric)}
        </p>

        <p
          className={
            isIncreasing
              ? "flex shrink-0 items-center gap-0.5 font-mono text-xs font-medium text-emerald-700"
              : "flex shrink-0 items-center gap-0.5 font-mono text-xs font-medium text-red-600"
          }
        >
          <TrendIcon className="size-3.5" aria-hidden="true" />
          <span className="sr-only">{isIncreasing ? "En hausse de" : "En baisse de"}</span>
          {Math.abs(metric.changePercentage).toLocaleString("fr-FR")} %
        </p>
      </div>

      <p className="mt-2 font-mono text-[10px] text-stone-500">
        par rapport à la semaine précédente
      </p>
    </article>
  );
}
