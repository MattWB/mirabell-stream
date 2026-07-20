import { Check, Clock, Eye, Users, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { audienceData, categoryDistribution, dashboardMetrics } from "../data/analytics";
import { AudienceChart } from "../components/admin/AudienceChart";
import { CategoryDistributionChart } from "../components/admin/CategoryDistributionChart";

import { MetricCard } from "../components/admin/MetricCard";

const dashboardDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const metricIcons: Record<string, LucideIcon> = {
  "active-users": Users,
  "total-views": Eye,
  "average-watch-time": Clock,
  "completion-rate": Check,
};

export function DashboardPage() {
  const [refreshedAt] = useState(() => new Date());

  return (
    <main id="main-content" className="min-h-screen p-4 md:p-6 lg:p-8">
      <section id="overview" className="scroll-mt-20" aria-labelledby="dashboard-title">
        <header className="mb-6 flex items-start justify-between gap-4 md:mb-8">
          <div>
            <h1
              id="dashboard-title"
              className="font-display text-3xl font-bold uppercase tracking-tight text-stone-800"
            >
              Vue d'ensemble
            </h1>

            <p className="mt-1 text-sm text-stone-500">Activité des 7 derniers jours</p>
          </div>

          <div className="hidden text-right sm:block">
            <p className="font-mono text-[10px] text-stone-400">Page actualisée</p>

            <time
              className="mt-1 block font-mono text-xs font-medium text-stone-600"
              dateTime={refreshedAt.toISOString()}
            >
              {dashboardDateFormatter.format(refreshedAt)}
            </time>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-4">
          {dashboardMetrics.map((metric) => {
            const Icon = metricIcons[metric.id];

            if (!Icon) {
              return null;
            }

            return <MetricCard key={metric.id} metric={metric} icon={Icon} />;
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
          <div className="min-w-0 lg:col-span-2">
            <AudienceChart data={audienceData} />
          </div>

          <div className="min-w-0">
            <CategoryDistributionChart data={categoryDistribution} />
          </div>
        </div>
      </section>
    </main>
  );
}
