import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import type { ContentStatus, TopContentMetric } from "../../types/analytics";
import type { Video } from "../../types/video";
import { cn } from "../../utils/cn";

type TopContentTableProps = {
  metrics: TopContentMetric[];
  videos: Video[];
};

const statusConfiguration: Record<
  ContentStatus,
  {
    label: string;
    className: string;
  }
> = {
  active: {
    label: "Actif",
    className: "bg-emerald-50 text-emerald-700",
  },
  scheduled: {
    label: "Planifié",
    className: "bg-sky-50 text-sky-700",
  },
  inactive: {
    label: "Inactif",
    className: "bg-stone-100 text-stone-500",
  },
};

export function TopContentTable({ metrics, videos }: TopContentTableProps) {
  const rows = metrics.flatMap((metric) => {
    const video = videos.find(({ id }) => id === metric.videoId);

    return video ? [{ metric, video }] : [];
  });

  return (
    <section
      id="content"
      className="scroll-mt-20 overflow-hidden rounded-lg border border-stone-200 bg-white"
      aria-labelledby="top-content-title"
    >
      <header className="flex items-center justify-between gap-3 border-b border-stone-100 px-4 py-4 md:px-5">
        <h2
          id="top-content-title"
          className="font-display text-sm font-bold uppercase tracking-wide text-stone-700"
        >
          Contenus les plus regardés
        </h2>

        <span className="shrink-0 font-mono text-[10px] text-stone-400">7 derniers jours</span>
      </header>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="px-5 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-wider text-stone-400">
                Titre
              </th>
              <th className="px-3 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-wider text-stone-400">
                Catégorie
              </th>
              <th className="px-3 py-3 text-right font-mono text-[10px] font-medium uppercase tracking-wider text-stone-400">
                Vues
              </th>
              <th className="px-3 py-3 text-right font-mono text-[10px] font-medium uppercase tracking-wider text-stone-400">
                Complétion
              </th>
              <th className="px-3 py-3 text-right font-mono text-[10px] font-medium uppercase tracking-wider text-stone-400">
                Tendance
              </th>
              <th className="px-5 py-3 text-center font-mono text-[10px] font-medium uppercase tracking-wider text-stone-400">
                Statut
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map(({ metric, video }) => {
              const isIncreasing = metric.trendDirection === "up";
              const TrendIcon = isIncreasing ? ArrowUpRight : ArrowDownRight;
              const status = statusConfiguration[metric.status];

              return (
                <tr
                  key={video.id}
                  className="border-b border-stone-100 last:border-b-0 hover:bg-amber-50/40"
                >
                  <td className="px-5 py-3.5">
                    <span className="block max-w-48 truncate text-[13px] font-medium text-stone-800">
                      {video.title}
                    </span>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className="rounded-sm bg-stone-100 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-stone-500">
                      {video.category}
                    </span>
                  </td>

                  <td className="px-3 py-3.5 text-right font-mono text-xs font-medium text-stone-700">
                    {metric.views.toLocaleString("fr-FR")}
                  </td>

                  <td className="px-3 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <div
                        className="h-1.5 w-14 overflow-hidden rounded-full bg-stone-100"
                        role="progressbar"
                        aria-label={`Taux de complétion de ${video.title}`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={metric.completionRate}
                      >
                        <div
                          className="h-full rounded-full bg-chart-1"
                          style={{
                            width: `${metric.completionRate}%`,
                          }}
                        />
                      </div>

                      <span className="w-8 text-right font-mono text-xs text-stone-500">
                        {metric.completionRate} %
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-3.5">
                    <span
                      className={cn(
                        "flex items-center justify-end gap-0.5 font-mono text-xs font-medium",
                        isIncreasing ? "text-emerald-600" : "text-red-500",
                      )}
                    >
                      <TrendIcon className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">
                        {isIncreasing ? "En hausse de" : "En baisse de"}
                      </span>
                      {metric.trendPercentage} %
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={cn(
                        "rounded-sm px-2 py-1 font-mono text-[10px] font-medium",
                        status.className,
                      )}
                    >
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-stone-100 md:hidden">
        {rows.map(({ metric, video }) => {
          const isIncreasing = metric.trendDirection === "up";
          const TrendIcon = isIncreasing ? ArrowUpRight : ArrowDownRight;

          return (
            <article key={video.id} className="flex items-center gap-3 px-4 py-4">
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-stone-800">{video.title}</h3>

                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] text-stone-400">
                  <span className="uppercase">{video.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{metric.views.toLocaleString("fr-FR")} vues</span>
                  <span aria-hidden="true">·</span>
                  <span>{metric.completionRate} % complétion</span>
                </p>
              </div>

              <span
                className={cn(
                  "flex shrink-0 items-center gap-0.5 font-mono text-xs font-medium",
                  isIncreasing ? "text-emerald-600" : "text-red-500",
                )}
              >
                <TrendIcon className="size-3.5" aria-hidden="true" />
                <span className="sr-only">{isIncreasing ? "En hausse de" : "En baisse de"}</span>
                {metric.trendPercentage} %
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
