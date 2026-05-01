import { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn, formatCurrency, formatDate } from "@/lib/utils"
import type { InvoiceStatus } from "@/types"

export const metadata: Metadata = { title: "Invoices | ValeriumPro" }

const statusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  DRAFT:     { label: "Draft",     className: "bg-muted text-muted-foreground" },
  SENT:      { label: "Sent",      className: "bg-blue-500/10 text-blue-400" },
  VIEWED:    { label: "Viewed",    className: "bg-purple-500/10 text-purple-400" },
  PAID:      { label: "Paid",      className: "bg-emerald-500/10 text-emerald-400" },
  OVERDUE:   { label: "Overdue",   className: "bg-red-500/10 text-red-400" },
  CANCELLED: { label: "Cancelled", className: "bg-muted text-muted-foreground line-through" },
}

const invoices = [
  { id: "1", number: "INV-0042", customer: "Acme Corp",         total: 4800,  status: "OVERDUE"   as InvoiceStatus, issueDate: "2026-03-15", dueDate: "2026-03-30" },
  { id: "2", number: "INV-0041", customer: "Globex Industries", total: 12500, status: "PAID"      as InvoiceStatus, issueDate: "2026-03-01", dueDate: "2026-03-20" },
  { id: "3", number: "INV-0040", customer: "Initech Solutions", total: 3200,  status: "SENT"      as InvoiceStatus, issueDate: "2026-04-01", dueDate: "2026-04-20" },
  { id: "4", number: "INV-0039", customer: "Acme Corp",         total: 7600,  status: "VIEWED"    as InvoiceStatus, issueDate: "2026-04-05", dueDate: "2026-04-25" },
  { id: "5", number: "INV-0038", customer: "Umbrella Corp",     total: 950,   status: "DRAFT"     as InvoiceStatus, issueDate: "2026-04-10", dueDate: "2026-04-30" },
]

const open    = invoices.filter((i) => ["SENT", "VIEWED"].includes(i.status)).reduce((s, i) => s + i.total, 0)
const overdue = invoices.filter((i) => i.status === "OVERDUE").reduce((s, i) => s + i.total, 0)
const paid    = invoices.filter((i) => i.status === "PAID").reduce((s, i) => s + i.total, 0)
const draft   = invoices.filter((i) => i.status === "DRAFT").length

function SummaryCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="border border-border bg-card p-4 flex flex-col gap-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn("text-xl font-semibold tabular-nums", accent)}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

export default function InvoicesPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <SummaryCard label="Open"    value={formatCurrency(open)}    sub={`${invoices.filter((i) => ["SENT","VIEWED"].includes(i.status)).length} invoices`} />
        <SummaryCard label="Overdue" value={formatCurrency(overdue)} sub={`${invoices.filter((i) => i.status === "OVERDUE").length} invoices`} accent="text-red-500" />
        <SummaryCard label="Paid"    value={formatCurrency(paid)}    sub="this period" accent="text-emerald-500" />
        <SummaryCard label="Draft"   value={String(draft)}           sub="awaiting send" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-medium">All invoices</h1>
          <span className="text-xs text-muted-foreground">({invoices.length})</span>
        </div>
        <Button size="sm" className="gap-1.5 h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-3.5 w-3.5" />
          Create invoice
        </Button>
      </div>

      {/* Table */}
      <div className="border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-[#fafafa] dark:bg-[#0d0d0d]">
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground">Invoice</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground">Customer</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground hidden md:table-cell">Issued</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground hidden md:table-cell">Due</th>
              <th className="px-4 py-2.5 text-right text-[11px] font-medium text-muted-foreground">Amount</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {invoices.map((inv) => {
              const sc = statusConfig[inv.status]
              return (
                <tr key={inv.id} className="hover:bg-[#fafafa] dark:hover:bg-[#0d0d0d] transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/invoices/${inv.id}`} className="font-mono text-[13px] font-medium hover:underline">
                      {inv.number}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[13px]">{inv.customer}</td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground hidden md:table-cell">{formatDate(inv.issueDate, "MMM d")}</td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground hidden md:table-cell">{formatDate(inv.dueDate, "MMM d")}</td>
                  <td className="px-4 py-3 text-right font-mono text-[13px] font-semibold tabular-nums">{formatCurrency(inv.total)}</td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", sc.className)}>{sc.label}</span>
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
