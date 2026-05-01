import { Metadata } from "next"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn, formatDate } from "@/lib/utils"
import type { Priority } from "@/types"

export const metadata: Metadata = { title: "Tracker | ValeriumPro" }

const priorityConfig: Record<Priority, { dot: string; label: string }> = {
  LOW:    { dot: "bg-muted-foreground/40", label: "Low" },
  MEDIUM: { dot: "bg-amber-400",           label: "Medium" },
  HIGH:   { dot: "bg-orange-400",          label: "High" },
  URGENT: { dot: "bg-red-500",             label: "Urgent" },
}

const projects = [
  { id: "1", name: "Website Redesign",  customer: "Acme Corp",     hours: 42,  budget: 8000,  status: "active",    priority: "HIGH"   as Priority, dueDate: "2026-05-15" },
  { id: "2", name: "Mobile App MVP",    customer: "Globex",        hours: 18,  budget: 15000, status: "active",    priority: "URGENT" as Priority, dueDate: "2026-06-30" },
  { id: "3", name: "Brand Strategy",    customer: "Initech",       hours: 31,  budget: 5000,  status: "review",    priority: "MEDIUM" as Priority, dueDate: "2026-04-30" },
  { id: "4", name: "Data Migration",    customer: "Umbrella Corp", hours: 60,  budget: 12000, status: "completed", priority: "LOW"    as Priority, dueDate: "2026-03-01" },
  { id: "5", name: "API Integration",   customer: "Acme Corp",     hours: 24,  budget: 6500,  status: "active",    priority: "HIGH"   as Priority, dueDate: "2026-05-20" },
  { id: "6", name: "Security Audit",    customer: "Globex",        hours: 8,   budget: 4000,  status: "active",    priority: "URGENT" as Priority, dueDate: "2026-05-01" },
]

const totalTracked = projects.reduce((s, p) => s + p.hours, 0)
const activeCount  = projects.filter((p) => p.status === "active").length

const statusBadge: Record<string, string> = {
  active:    "bg-emerald-500/10 text-emerald-500",
  review:    "bg-purple-500/10 text-purple-400",
  completed: "bg-muted text-muted-foreground",
}

export default function TrackerPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Hours tracked</p>
          <p className="text-xl font-semibold tabular-nums mt-2">{totalTracked}h</p>
          <p className="text-xs text-muted-foreground">this period</p>
        </div>
        <div className="border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Active projects</p>
          <p className="text-xl font-semibold tabular-nums mt-2">{activeCount}</p>
          <p className="text-xs text-muted-foreground">in progress</p>
        </div>
        <div className="border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Billable budget</p>
          <p className="text-xl font-semibold tabular-nums mt-2">${projects.reduce((s,p) => s+p.budget, 0).toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">total across projects</p>
        </div>
        <div className="border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Completed</p>
          <p className="text-xl font-semibold tabular-nums mt-2">{projects.filter((p) => p.status === "completed").length}</p>
          <p className="text-xs text-muted-foreground">this year</p>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium">Projects</h2>
          <span className="text-xs text-muted-foreground">({projects.length})</span>
        </div>
        <Button size="sm" className="gap-1.5 h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-3.5 w-3.5" />
          Create project
        </Button>
      </div>

      {/* Table */}
      <div className="border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-[#fafafa] dark:bg-[#0d0d0d]">
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground">Project</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground hidden md:table-cell">Customer</th>
              <th className="px-4 py-2.5 text-right text-[11px] font-medium text-muted-foreground">Hours</th>
              <th className="px-4 py-2.5 text-right text-[11px] font-medium text-muted-foreground hidden lg:table-cell">Budget</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground hidden md:table-cell">Due</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground">Priority</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects.map((p) => {
              const pc = priorityConfig[p.priority]
              return (
                <tr key={p.id} className="hover:bg-[#fafafa] dark:hover:bg-[#0d0d0d] transition-colors cursor-pointer">
                  <td className="px-4 py-3 text-[13px] font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground hidden md:table-cell">{p.customer}</td>
                  <td className="px-4 py-3 text-right font-mono text-[13px]">{p.hours}h</td>
                  <td className="px-4 py-3 text-right font-mono text-[13px] text-muted-foreground hidden lg:table-cell">${p.budget.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground hidden md:table-cell">{formatDate(p.dueDate, "MMM d")}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className={cn("h-1.5 w-1.5 rounded-full", pc.dot)} />
                      <span className="text-[12px] text-muted-foreground">{pc.label}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium capitalize", statusBadge[p.status])}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
