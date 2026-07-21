import { Bell, Film, Star, TrendingUp, X, type LucideIcon } from "lucide-react";

import type { ActivityKind, RecentActivity } from "../../types/analytics";

type RecentActivityListProps = {
  activities: RecentActivity[];
};

const activityConfiguration: Record<
  ActivityKind,
  {
    icon: LucideIcon;
    className: string;
  }
> = {
  publication: {
    icon: Film,
    className: "bg-amber-50 text-amber-700",
  },
  "audience-peak": {
    icon: TrendingUp,
    className: "bg-emerald-50 text-emerald-700",
  },
  maintenance: {
    icon: Bell,
    className: "bg-sky-50 text-sky-600",
  },
  removal: {
    icon: X,
    className: "bg-red-50 text-red-600",
  },
  "editorial-suggestion": {
    icon: Star,
    className: "bg-violet-50 text-violet-600",
  },
};

export function RecentActivityList({ activities }: RecentActivityListProps) {
  return (
    <section
      className="overflow-hidden rounded-lg border border-stone-200 bg-white"
      aria-labelledby="recent-activity-title"
    >
      <header className="border-b border-stone-100 px-4 py-4 md:px-5">
        <h2
          id="recent-activity-title"
          className="font-display text-sm font-bold uppercase tracking-wide text-stone-700"
        >
          Activité récente
        </h2>
      </header>

      <ol className="divide-y divide-stone-100">
        {activities.map((activity) => {
          const configuration = activityConfiguration[activity.kind];
          const Icon = configuration.icon;

          return (
            <li key={activity.id} className="flex gap-3 px-4 py-4 md:px-5">
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-md ${configuration.className}`}
              >
                <Icon className="size-4" aria-hidden="true" />
              </span>

              <div className="min-w-0">
                <p className="text-xs leading-relaxed text-stone-600">{activity.message}</p>

                <p className="mt-1 font-mono text-[10px] text-stone-500">{activity.timeLabel}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
