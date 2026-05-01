import { TrendingDown, TrendingUp, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MetricCard as MetricCardType } from "@/types"

export function MetricCard({ label, value, change, changeLabel, trend }: MetricCardType) {
  const isUp = trend === "up"
  const isDown = trend === "down"

  return (
    <div className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-border/80">
      <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-3 text-[28px] font-bold tracking-tight tabular-nums text-foreground leading-none">
        {value}
      </p>
      <div
        className={cn(
          "mt-3 flex items-center gap-1.5 text-[12px] font-medium",
          isUp && "text-emerald-500",
          isDown && "text-red-500",
          trend === "neutral" && "text-muted-foreground"
        )}
      >
        {isUp && <TrendingUp className="h-3.5 w-3.5" />}
        {isDown && <TrendingDown className="h-3.5 w-3.5" />}
        {trend === "neutral" && <Minus className="h-3.5 w-3.5" />}
        <span>
          {change > 0 ? "+" : ""}{change}%
        </span>
        <span className="text-muted-foreground font-normal">{changeLabel}</span>
      </div>
    </div>
  )
}
