import { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn, formatDate } from "@/lib/utils"
import type { Priority, ProjectStatus } from "@/types"

export const metadata: Metadata = { title: "Projects | ValeriumPro" }

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  OPEN:        { label: "Open",        className: "bg-blue-500/10 text-blue-400" },
  IN_PROGRESS: { label: "In Progress", className: "bg-amber-500/10 text-amber-400" },
  REVIEW:      { label: "Review",      className: "bg-purple-500/10 text-purple-400" },
  COMPLETED:   { label: "Completed",   className: "bg-emerald-500/10 text-emerald-400" },
  CANCELLED:   { label: "Cancelled",   className: "bg-muted text-muted-foreground" },
}

const priorityConfig: Record<Priority, { dot: string }> = {
  LOW:    { dot: "bg-muted-foreground/50" },
  MEDIUM: { dot: "bg-amber-400" },
  HIGH:   { dot: "bg-orange-400" },
  URGENT: { dot: "bg-red-500" },
}

const projects = [
  { id: "1", title: "Website Redesign", customer: "Acme Corp",     status: "IN_PROGRESS" as ProjectStatus, priority: "HIGH"   as Priority, progress: 65,  dueDate: "2026-05-15" },
  { id: "2", title: "Mobile App MVP",   customer: "Globex",        status: "OPEN"        as ProjectStatus, priority: "URGENT" as Priority, progress: 10,  dueDate: "2026-06-30" },
  { id: "3", title: "Brand Strategy",   customer: "Initech",       status: "REVIEW"      as ProjectStatus, priority: "MEDIUM" as Priority, progress: 90,  dueDate: "2026-04-30" },
  { id: "4", title: "Data Migration",   customer: "Umbrella Corp", status: "COMPLETED"   as ProjectStatus, priority: "LOW"    as Priority, progress: 100, dueDate: "2026-03-01" },
  { id: "5", title: "API Integration",  customer: "Acme Corp",     status: "IN_PROGRESS" as ProjectStatus, priority: "HIGH"   as Priority, progress: 40,  dueDate: "2026-05-20" },
  { id: "6", title: "Security Audit",   customer: "Globex",        status: "OPEN"        as ProjectStatus, priority: "URGENT" as Priority, progress: 0,   dueDate: "2026-05-01" },
]

const active = projects.filter((p) => !["COMPLETED","CANCELLED"].includes(p.status)).length

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Active</p>
          <p className="text-xl font-semibold tabular-nums mt-2">{active}</p>
          <p className="text-xs text-muted-foreground">projects in progress</p>
        </div>
        <div className="border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">In review</p>
          <p className="text-xl font-semibold tabular-nums mt-2">{projects.filter((p) => p.status === "REVIEW").length}</p>
          <p className="text-xs text-muted-foreground">awaiting approval</p>
        </div>
        <div className="border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Completed</p>
          <p className="text-xl font-semibold tabular-nums mt-2 text-emerald-500">{projects.filter((p) => p.status === "COMPLETED").length}</p>
          <p className="text-xs text-muted-foreground">this year</p>
        </div>
        <div className="border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Avg. progress</p>
          <p className="text-xl font-semibold tabular-nums mt-2">{Math.round(projects.reduce((s,p) => s + p.progress, 0) / projects.length)}%</p>
          <p className="text-xs text-muted-foreground">across all projects</p>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-medium">All projects</h1>
          <span className="text-xs text-muted-foreground">({projects.length})</span>
        </div>
        <Button size="sm" className="gap-1.5 h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-3.5 w-3.5" />
          New project
        </Button>
      </div>

      {/* Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const sc = statusConfig[p.status]
          const pc = priorityConfig[p.priority]
          return (
            <Link key={p.id} href={`/dashboard/projects/${p.id}`}>
              <div className="border border-border bg-card p-4 hover:bg-[#fafafa] dark:hover:bg-[#0d0d0d] transition-colors cursor-pointer h-full flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold truncate">{p.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{p.customer}</p>
                  </div>
                  <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", sc.className)}>
                    {sc.label}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Progress</span>
                    <span className="font-medium text-foreground">{p.progress}%</span>
                  </div>
                  <div className="h-1 bg-border overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", pc.dot)} />
                    <span>{p.priority.charAt(0) + p.priority.slice(1).toLowerCase()}</span>
                  </div>
                  <span>Due {formatDate(p.dueDate, "MMM d")}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
