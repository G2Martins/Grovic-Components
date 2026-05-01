import { Metadata } from "next"
import { CustomersTable } from "@/components/customers/customers-table"
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = { title: "Customers" }

export default function CustomersPage() {
  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Customers</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">Manage and view all your customers</p>
        </div>
        <Button size="sm" className="bg-brand hover:bg-brand/90 text-brand-foreground gap-1.5 h-8 text-[13px]">
          <UserPlus className="h-3.5 w-3.5" />
          Add customer
        </Button>
      </div>
      <CustomersTable />
    </div>
  )
}
