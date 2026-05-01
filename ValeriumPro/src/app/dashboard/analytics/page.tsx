"use client"

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const revenueData = [
  { month: "Jan", revenue: 4200, expenses: 1800 },
  { month: "Feb", revenue: 5800, expenses: 2100 },
  { month: "Mar", revenue: 4900, expenses: 1600 },
  { month: "Apr", revenue: 7200, expenses: 2400 },
  { month: "May", revenue: 6100, expenses: 2000 },
  { month: "Jun", revenue: 8900, expenses: 2800 },
  { month: "Jul", revenue: 9400, expenses: 3100 },
]

const customerData = [
  { month: "Jan", new: 8,  churned: 2 },
  { month: "Feb", new: 12, churned: 3 },
  { month: "Mar", new: 7,  churned: 1 },
  { month: "Apr", new: 15, churned: 4 },
  { month: "May", new: 11, churned: 2 },
  { month: "Jun", new: 18, churned: 5 },
  { month: "Jul", new: 21, churned: 3 },
]

const statusBreakdown = [
  { name: "Active",   value: 68, color: "hsl(var(--chart-1))" },
  { name: "Leads",    value: 18, color: "hsl(var(--chart-2))" },
  { name: "Inactive", value: 10, color: "hsl(var(--chart-4))" },
  { name: "Archived", value: 4,  color: "hsl(var(--muted-foreground))" },
]

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "var(--radius)",
  fontSize: 12,
}

const periods = ["This year", "Last year", "All time"]

function StatCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  const positive = delta.startsWith("+")
  return (
    <div className="border border-border bg-card p-4 flex flex-col gap-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold tabular-nums">{value}</p>
      <p className={`text-xs ${positive ? "text-emerald-500" : "text-red-400"}`}>{delta} vs last period</p>
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-medium">Reports</h1>
        </div>
        <div className="flex items-center gap-1">
          {periods.map((p) => (
            <Button key={p} variant={p === "This year" ? "secondary" : "ghost"} size="sm" className="h-7 text-xs px-3">
              {p}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Revenue"   value="$46,500" delta="+18%" />
        <StatCard label="Expenses"  value="$15,800" delta="+6%"  />
        <StatCard label="Profit"    value="$30,700" delta="+24%" />
        <StatCard label="Customers" value="92"      delta="+12%" />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenueData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="hsl(var(--chart-1))" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="hsl(var(--chart-5))" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(var(--chart-5))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number, name: string) => [`$${v.toLocaleString()}`, name]} />
                <Legend />
                <Area type="monotone" dataKey="revenue"  stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#gradRevenue)"  name="Revenue" />
                <Area type="monotone" dataKey="expenses" stroke="hsl(var(--chart-5))" strokeWidth={2} fill="url(#gradExpenses)" name="Expenses" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={customerData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Bar dataKey="new"     fill="hsl(var(--chart-1))" radius={[3,3,0,0]} name="New" />
                <Bar dataKey="churned" fill="hsl(var(--chart-5))" radius={[3,3,0,0]} name="Churned" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Customer Status</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={statusBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                  {statusBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {statusBreakdown.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-xs text-muted-foreground">{s.name}</span>
                  </div>
                  <span className="text-xs font-medium">{s.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
