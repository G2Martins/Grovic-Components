"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 4900 },
  { month: "Apr", revenue: 7200 },
  { month: "May", revenue: 6100 },
  { month: "Jun", revenue: 8900 },
  { month: "Jul", revenue: 9400 },
]

export function OverviewChart() {
  return (
    <div className="col-span-2 rounded-lg border border-border bg-card p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Revenue</p>
          <p className="mt-1 text-2xl font-bold tracking-tight tabular-nums">$46,500</p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-500">
          +12.5% this quarter
        </span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: -24 }}>
          <defs>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(142 70% 45%)" stopOpacity={0.15} />
              <stop offset="100%" stopColor="hsl(142 70% 45%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
              fontSize: 12,
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            }}
            formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
            cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="hsl(142 70% 45%)"
            strokeWidth={1.5}
            fill="url(#gradRevenue)"
            dot={false}
            activeDot={{ r: 4, fill: "hsl(142 70% 45%)", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
