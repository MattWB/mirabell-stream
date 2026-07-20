import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { CategoryDistribution } from "../../types/analytics";

type CategoryDistributionChartProps = {
  data: CategoryDistribution[];
};

export function CategoryDistributionChart({ data }: CategoryDistributionChartProps) {
  return (
    <section
      className="rounded-lg border border-stone-200 bg-white p-4 md:p-5"
      aria-labelledby="category-distribution-title"
    >
      <header className="mb-4">
        <h2
          id="category-distribution-title"
          className="font-display text-sm font-bold uppercase tracking-wide text-stone-700"
        >
          Par catégorie
        </h2>

        <p className="mt-1 font-mono text-[10px] text-stone-400">Part des vues totales</p>
      </header>

      <div className="h-60 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 4,
              right: 16,
              bottom: 0,
              left: 0,
            }}
            accessibilityLayer
          >
            <CartesianGrid
              stroke="rgba(120, 113, 108, 0.12)"
              strokeDasharray="3 3"
              horizontal={false}
            />

            <XAxis
              type="number"
              domain={[0, 35]}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) => `${value} %`}
              tick={{
                fill: "#a8a29e",
                fontFamily: "DM Mono, monospace",
                fontSize: 9,
              }}
            />

            <YAxis
              type="category"
              dataKey="category"
              width={82}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#78716c",
                fontFamily: "DM Mono, monospace",
                fontSize: 10,
              }}
            />

            <Tooltip
              cursor={{
                fill: "rgba(212, 168, 71, 0.06)",
              }}
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e7e5e4",
                borderRadius: "0.375rem",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                fontFamily: "DM Mono, monospace",
                fontSize: "0.6875rem",
              }}
              formatter={(value) => (typeof value === "number" ? `${value} %` : value)}
            />

            <Bar
              dataKey="percentage"
              name="Part des vues"
              fill="var(--chart-1)"
              radius={[0, 3, 3, 0]}
              maxBarSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
