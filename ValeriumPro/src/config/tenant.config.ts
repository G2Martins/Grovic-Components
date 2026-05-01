import type { NavItem, TenantConfig, TenantFeatures } from "@/types"

export { defaultTenantConfig } from "@/types"

export function buildNavItems(
  features: TenantFeatures,
  labels: TenantConfig["labels"]
): NavItem[] {
  const items: NavItem[] = [
    { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { title: labels.customers, href: "/dashboard/customers", icon: "Users" },
    { title: labels.projects, href: "/dashboard/projects", icon: "FolderKanban" },
    { title: labels.tasks, href: "/dashboard/tracker", icon: "CheckSquare", feature: "tracker" },
  ]

  if (features.invoicing) {
    items.push({ title: labels.invoices, href: "/dashboard/invoices", icon: "FileText" })
  }

  if (features.messaging) {
    items.push({ title: labels.inbox, href: "/dashboard/inbox", icon: "Inbox" })
  }

  if (features.documents) {
    items.push({ title: labels.documents, href: "/dashboard/documents", icon: "FolderOpen" })
  }

  if (features.analytics) {
    items.push({ title: labels.analytics, href: "/dashboard/analytics", icon: "BarChart3" })
  }

  if (features.team) {
    items.push({ title: labels.providers, href: "/dashboard/team", icon: "UserCog" })
  }

  items.push({ title: "Settings", href: "/dashboard/settings", icon: "Settings" })

  return items
}

export function applyTenantTheme(config: TenantConfig): void {
  if (typeof document === "undefined") return
  const root = document.documentElement
  root.style.setProperty("--brand", config.brand.primaryHsl)
  root.style.setProperty("--radius", config.brand.radius)
  if (config.brand.favicon) {
    const link = document.querySelector<HTMLLinkElement>("link[rel='icon']")
    if (link) link.href = config.brand.favicon
  }
}
