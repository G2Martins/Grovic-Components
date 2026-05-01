import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Download, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatDate } from "@/lib/utils"

export const metadata: Metadata = { title: "Invoice" }

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: _id } = await params
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
            <Link href="/dashboard/invoices"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-xl font-semibold tracking-tight font-mono">INV-0042</h1>
            <p className="text-[12px] text-muted-foreground mt-0.5">Acme Corporation · Due Apr 30, 2026</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="gap-1.5 h-8 text-[13px] border-border">
            <Download className="h-3.5 w-3.5" />
            PDF
          </Button>
          <Button size="sm" className="bg-brand hover:bg-brand/90 text-brand-foreground gap-1.5 h-8 text-[13px]">
            <Send className="h-3.5 w-3.5" />
            Send
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 space-y-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-bold font-mono text-brand">INV-0042</p>
            <p className="text-[13px] text-muted-foreground mt-1 space-y-0.5">
              <span className="block">Issued {formatDate("2026-03-15")}</span>
              <span className="block">Due {formatDate("2026-04-30")}</span>
            </p>
          </div>
          <span className="rounded-full bg-red-500/10 text-red-400 px-2.5 py-1 text-[11px] font-medium">
            Overdue
          </span>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-6 text-[13px]">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-2">From</p>
            <p className="font-semibold">ValeriumPro</p>
            <p className="text-muted-foreground">billing@valerium.pro</p>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-2">To</p>
            <p className="font-semibold">Acme Corporation</p>
            <p className="text-muted-foreground">hello@acme.com</p>
          </div>
        </div>

        <Separator />

        <table className="w-full text-[13px]">
          <thead>
            <tr>
              <th className="pb-2 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Description</th>
              <th className="pb-2 text-right text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Qty</th>
              <th className="pb-2 text-right text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Unit</th>
              <th className="pb-2 text-right text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { description: "Design Services", qty: 1, unit: 2400 },
              { description: "Development Sprint 3", qty: 2, unit: 1200 },
            ].map((item) => (
              <tr key={item.description}>
                <td className="py-2.5">{item.description}</td>
                <td className="py-2.5 text-right tabular-nums text-muted-foreground">{item.qty}</td>
                <td className="py-2.5 text-right tabular-nums text-muted-foreground">{formatCurrency(item.unit)}</td>
                <td className="py-2.5 text-right tabular-nums font-semibold">{formatCurrency(item.qty * item.unit)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Separator />

        <div className="flex flex-col items-end gap-1.5 text-[13px]">
          <div className="flex justify-between w-44">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="tabular-nums">{formatCurrency(4800)}</span>
          </div>
          <div className="flex justify-between w-44">
            <span className="text-muted-foreground">Tax (0%)</span>
            <span className="tabular-nums text-muted-foreground">{formatCurrency(0)}</span>
          </div>
          <Separator className="w-44 my-1" />
          <div className="flex justify-between w-44 font-bold text-[15px]">
            <span>Total</span>
            <span className="tabular-nums">{formatCurrency(4800)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
