import { formatRelativeDate, getInitials } from "@/lib/utils"
import { cn } from "@/lib/utils"

const activities = [
  { id: "1", actor: "Sarah Chen", action: "created invoice", target: "INV-0042", type: "invoice", at: new Date(Date.now() - 1000 * 60 * 14).toISOString() },
  { id: "2", actor: "James Kirk", action: "added customer", target: "Acme Corp", type: "customer", at: new Date(Date.now() - 1000 * 60 * 58).toISOString() },
  { id: "3", actor: "Lena Müller", action: "completed task", target: "Design review", type: "task", at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
  { id: "4", actor: "Ahmed Al-Rashid", action: "uploaded", target: "Contract_v2.pdf", type: "document", at: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString() },
  { id: "5", actor: "Sarah Chen", action: "sent message to", target: "Globex Inc", type: "message", at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
]

const typeColors: Record<string, string> = {
  invoice: "bg-blue-500/10 text-blue-400",
  customer: "bg-emerald-500/10 text-emerald-400",
  task: "bg-amber-500/10 text-amber-400",
  document: "bg-purple-500/10 text-purple-400",
  message: "bg-rose-500/10 text-rose-400",
}

export function ActivityFeed() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-4">
        Recent Activity
      </p>
      <div className="space-y-4">
        {activities.map((a) => (
          <div key={a.id} className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground mt-0.5">
              {getInitials(a.actor)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] leading-snug">
                <span className="font-medium text-foreground">{a.actor}</span>{" "}
                <span className="text-muted-foreground">{a.action}</span>{" "}
                <span className="font-medium text-foreground">{a.target}</span>
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {formatRelativeDate(a.at)}
              </p>
            </div>
            <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", typeColors[a.type])}>
              {a.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
