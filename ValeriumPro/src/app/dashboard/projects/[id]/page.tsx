import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export const metadata: Metadata = { title: "Project" }

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: _id } = await params
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
          <Link href="/dashboard/projects"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight">Website Redesign</h1>
            <span className="rounded-full bg-amber-500/10 text-amber-400 px-2.5 py-0.5 text-[11px] font-medium">
              In Progress
            </span>
          </div>
          <p className="text-[12px] text-muted-foreground mt-0.5">Acme Corporation · Due May 15, 2026</p>
        </div>
        <Button size="sm" className="bg-brand hover:bg-brand/90 text-brand-foreground gap-1.5 h-8 text-[13px]">
          <Plus className="h-3.5 w-3.5" />
          Add task
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-3">Progress</p>
            <div className="flex justify-between text-[13px] mb-2">
              <span className="text-muted-foreground">Overall completion</span>
              <span className="font-semibold">65%</span>
            </div>
            <Progress value={65} className="h-1.5" />
            <p className="text-[11px] text-muted-foreground mt-2">13 of 20 tasks completed</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Tasks</p>
              <Button variant="ghost" size="sm" className="h-7 text-[12px] gap-1 text-muted-foreground hover:text-foreground">
                <Plus className="h-3 w-3" />
                Add
              </Button>
            </div>
            <div className="space-y-1.5">
              {[
                { title: "Homepage wireframe", done: true },
                { title: "Component library setup", done: true },
                { title: "Mobile responsive layout", done: false },
                { title: "SEO optimization", done: false },
              ].map((t) => (
                <div key={t.title} className="flex items-center gap-2.5 rounded-md border border-border p-2.5">
                  <span className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 ${t.done ? "bg-brand border-brand" : "border-border"}`}>
                    {t.done && <span className="text-brand-foreground text-[10px] font-bold">✓</span>}
                  </span>
                  <span className={`text-[13px] ${t.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {t.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-4">Details</p>
          <div className="space-y-3">
            {[
              { label: "Customer", value: "Acme Corporation" },
              { label: "Priority", value: "High" },
              { label: "Start date", value: "Mar 1, 2026" },
              { label: "Due date", value: "May 15, 2026" },
            ].map((d) => (
              <div key={d.label} className="flex justify-between text-[13px]">
                <span className="text-muted-foreground">{d.label}</span>
                <span className="font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
