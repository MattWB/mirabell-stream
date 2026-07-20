import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { AudienceDataPoint } from "../../types/analytics";
import { formatCompactNumber } from "../../utils/formatters";

type AudienceChartProps = {
  data: AudienceDataPoint[];
};

export function AudienceChart({ data }: AudienceChartProps) {
  return (
    <section
      id="audience"
      className="scroll-mt-20 rounded-lg border border-stone-200 bg-white p-4 md:p-5"
      aria-labelledby="audience-chart-title"
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2
            id="audience-chart-title"
            className="font-display text-sm font-bold uppercase tracking-wide text-stone-700"
          >
            Évolution de l'audience
          </h2>

          <p className="mt-1 font-mono text-[10px] text-stone-400">7 derniers jours</p>
        </div>
      </header>

      <div className="h-60 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 8,
              right: 8,
              bottom: 0,
              left: -16,
            }}
            accessibilityLayer
          >
            <CartesianGrid
              stroke="rgba(120, 113, 108, 0.16)"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#a8a29e",
                fontFamily: "DM Mono, monospace",
                fontSize: 10,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={formatCompactNumber}
              tick={{
                fill: "#a8a29e",
                fontFamily: "DM Mono, monospace",
                fontSize: 10,
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e7e5e4",
                borderRadius: "0.375rem",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                fontFamily: "DM Mono, monospace",
                fontSize: "0.6875rem",
              }}
              labelStyle={{
                color: "#44403c",
                fontWeight: 500,
                marginBottom: "0.25rem",
              }}
              formatter={(value) =>
                typeof value === "number" ? value.toLocaleString("fr-FR") : value
              }
            />

            <Legend
              iconType="circle"
              iconSize={7}
              wrapperStyle={{
                color: "#78716c",
                fontFamily: "DM Mono, monospace",
                fontSize: "0.625rem",
                paddingTop: "0.75rem",
              }}
            />

            <Line
              type="monotone"
              dataKey="views"
              name="Vues"
              stroke="var(--chart-1)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 4,
                fill: "var(--chart-1)",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />

            <Line
              type="monotone"
              dataKey="uniqueUsers"
              name="Utilisateurs uniques"
              stroke="var(--chart-2)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 4,
                fill: "var(--chart-2)",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
