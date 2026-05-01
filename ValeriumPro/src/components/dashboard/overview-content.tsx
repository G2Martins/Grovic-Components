"use client"

import Link from "next/link"
import { Icons } from "@/components/ui/icons"
import { formatCurrency } from "@/lib/utils"

function getGreeting() {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return "Good morning"
  if (h >= 12 && h < 17) return "Good afternoon"
  return "Good evening"
}

const DEMO_NAME = "Bryan"

const stats = [
  { label: "Cash balance", value: formatCurrency(48295), detail: "across 2 accounts", href: "/dashboard/invoices" },
  { label: "Open invoices", value: "3", detail: "$12,400 outstanding", href: "/dashboard/invoices" },
  { label: "Active projects", value: "5", detail: "2 due this month", href: "/dashboard/projects" },
  { label: "Inbox", value: "2", detail: "unread messages", href: "/dashboard/inbox" },
  { label: "Unbilled time", value: "14h 30m", detail: "across 3 projects", href: "/dashboard/tracker" },
  { label: "Transactions", value: "7", detail: "to review", href: "/dashboard/analytics" },
]

const quickActions = [
  { label: "New Invoice", icon: Icons.Invoice, href: "/dashboard/invoices" },
  { label: "Add Customer", icon: Icons.Customers, href: "/dashboard/customers" },
  { label: "Track Time", icon: Icons.Tracker, href: "/dashboard/tracker" },
  { label: "Upload Doc", icon: Icons.Vault, href: "/dashboard/documents" },
]

const buttonClass =
  "flex items-center gap-1.5 border bg-white border-[#e6e6e6] hover:bg-[#f7f7f7] hover:border-[#d0d0d0] dark:border-[#1d1d1d] dark:bg-[#0c0c0c] dark:hover:bg-[#0f0f0f] dark:hover:border-[#222222] px-3 py-1.5 text-xs text-muted-foreground/60 hover:text-foreground transition-all duration-300 cursor-pointer group"

const iconClass =
  "text-muted-foreground/40 group-hover:text-foreground transition-colors duration-300"

export function OverviewContent() {
  const greeting = getGreeting()

  return (
    <div className="mt-2 pb-16 flex flex-col justify-center min-h-[calc(100vh-120px)] max-w-3xl mx-auto w-full">
      {/* Welcome */}
      <div className="flex flex-col items-center text-center pt-6 pb-10 w-full">
        <h1 className="text-2xl font-medium mb-3 text-foreground">
          {greeting}, {DEMO_NAME} 👋
        </h1>
        <p className="text-sm text-[#878787] max-w-md leading-relaxed">
          You have{" "}
          <Link href="/dashboard/invoices" className="border-b border-dashed border-[#878787]/30 hover:text-foreground transition-colors">
            3 invoices outstanding
          </Link>
          , totaling $12,400. There are{" "}
          <Link href="/dashboard/inbox" className="border-b border-dashed border-[#878787]/30 hover:text-foreground transition-colors">
            2 unread messages
          </Link>{" "}
          in your inbox.
        </p>
      </div>

      {/* Search bar (decorative) */}
      <div className="pb-6 w-full">
        <div className="flex items-center gap-3 border border-[#e6e6e6] dark:border-[#1d1d1d] bg-white dark:bg-[#0c0c0c] px-4 py-3 w-full">
          <Icons.Overview size={16} className="text-muted-foreground/40 shrink-0" />
          <input
            type="text"
            placeholder="Ask anything about your business…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
            readOnly
          />
          <kbd className="hidden sm:flex items-center gap-1 text-[10px] text-muted-foreground/40 border border-border rounded px-1.5 py-0.5">
            ↵
          </kbd>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex items-center justify-center gap-3 pb-12 w-full flex-wrap">
        {quickActions.map(({ label, icon: Icon, href }) => (
          <Link key={label} href={href} className={buttonClass}>
            <Icon size={13} className={iconClass} />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* Stat cards — exact Midday widget card style */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-px border border-[#e6e6e6] dark:border-[#1d1d1d] bg-[#e6e6e6] dark:bg-[#1d1d1d]">
        {stats.map(({ label, value, detail, href }) => (
          <Link
            key={label}
            href={href}
            className="h-full border-0 p-5 flex flex-col justify-between transition-all duration-300 bg-white border-[#e6e6e6] hover:bg-[#f7f7f7] dark:bg-[#0c0c0c] dark:hover:bg-[#0f0f0f] cursor-pointer group min-h-[110px]"
          >
            <span className="text-xs text-muted-foreground">{label}</span>
            <div className="mt-3">
              <span className="text-xl font-medium tabular-nums">{value}</span>
              {detail && (
                <span className="text-xs text-muted-foreground ml-2">{detail}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
