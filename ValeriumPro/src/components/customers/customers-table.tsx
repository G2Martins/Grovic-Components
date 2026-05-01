"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn, formatDate, getInitials } from "@/lib/utils"
import type { Customer, CustomerStatus } from "@/types"

const statusConfig: Record<CustomerStatus, { label: string; className: string }> = {
  ACTIVE: { label: "Active", className: "bg-emerald-500/10 text-emerald-400" },
  INACTIVE: { label: "Inactive", className: "bg-muted text-muted-foreground" },
  LEAD: { label: "Lead", className: "bg-blue-500/10 text-blue-400" },
  ARCHIVED: { label: "Archived", className: "bg-muted text-muted-foreground line-through" },
}

const mockCustomers: Customer[] = [
  { id: "1", name: "Acme Corporation", email: "hello@acme.com", phone: "+1 555 0100", company: "Acme Corp", avatar: null, status: "ACTIVE", notes: null, tags: ["enterprise", "priority"], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString() },
  { id: "2", name: "Globex Industries", email: "contact@globex.com", phone: "+1 555 0200", company: "Globex", avatar: null, status: "ACTIVE", notes: null, tags: ["smb"], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString() },
  { id: "3", name: "Initech Solutions", email: "info@initech.com", phone: null, company: "Initech", avatar: null, status: "LEAD", notes: "Demo scheduled", tags: ["lead"], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() },
  { id: "4", name: "Umbrella Corp", email: "admin@umbrella.com", phone: "+1 555 0400", company: "Umbrella", avatar: null, status: "INACTIVE", notes: null, tags: [], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString() },
  { id: "5", name: "Wayne Enterprises", email: "contact@wayne.com", phone: "+1 555 0500", company: "Wayne Ent.", avatar: null, status: "ACTIVE", notes: null, tags: ["enterprise"], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString() },
  { id: "6", name: "Stark Industries", email: "info@stark.com", phone: "+1 555 0600", company: "Stark", avatar: null, status: "LEAD", notes: "Intro call done", tags: ["lead", "priority"], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() },
]

export function CustomersTable() {
  const [query, setQuery] = useState("")

  const filtered = mockCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase()) ||
      (c.company ?? "").toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-3">
      <div className="relative w-64">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          placeholder="Search customers…"
          className="pl-8 h-8 text-[13px] bg-card border-border"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Name</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground hidden md:table-cell">Company</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Tags</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Added</th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((c) => {
              const sc = statusConfig[c.status]
              return (
                <tr key={c.id} className="hover:bg-muted/20 transition-colors cursor-pointer group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-7 w-7 shrink-0">
                        <AvatarImage src={c.avatar ?? undefined} />
                        <AvatarFallback className="text-[9px] font-bold bg-brand/15 text-brand">
                          {getInitials(c.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Link href={`/dashboard/customers/${c.id}`} className="text-[13px] font-medium text-foreground hover:text-brand transition-colors">
                          {c.name}
                        </Link>
                        <p className="text-[11px] text-muted-foreground">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground hidden md:table-cell">
                    {c.company ?? "—"}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {c.tags.map((t) => (
                        <span key={t} className="rounded px-1.5 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", sc.className)}>
                      {sc.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground hidden sm:table-cell">
                    {formatDate(c.createdAt, "MMM d, yyyy")}
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="text-[13px]">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/customers/${c.id}`}>View profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Send invoice</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-[13px] text-muted-foreground">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-muted-foreground">{filtered.length} of {mockCustomers.length} customers</p>
    </div>
  )
}
