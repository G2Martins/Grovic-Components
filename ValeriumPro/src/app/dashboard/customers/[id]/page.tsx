import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = { title: "Customer" }

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
          <Link href="/dashboard/customers"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Customer Profile</h1>
          <p className="text-[12px] text-muted-foreground font-mono mt-0.5">ID: {id}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6 flex flex-col items-center text-center gap-3">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-xl bg-brand/15 text-brand font-bold">AC</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Acme Corporation</p>
            <p className="text-[13px] text-muted-foreground">hello@acme.com</p>
          </div>
          <span className="rounded-full bg-emerald-500/10 text-emerald-400 px-2.5 py-1 text-[11px] font-medium">
            Active
          </span>
          <Separator />
          <div className="w-full space-y-2.5 text-[13px] text-left">
            {[
              { label: "Phone", value: "+1 555 0100" },
              { label: "Company", value: "Acme Corp" },
              { label: "Since", value: "Mar 2024" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between">
                <span className="text-muted-foreground">{row.label}</span>
                <span className="font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-3">
          {[
            { label: "Total Invoiced", value: "$24,850" },
            { label: "Open Invoices", value: "3" },
            { label: "Active Projects", value: "5" },
            { label: "Documents", value: "12" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-card p-4">
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{s.label}</p>
              <p className="mt-2 text-2xl font-bold tracking-tight">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
