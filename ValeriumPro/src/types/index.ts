// ── Tenant ────────────────────────────────────────────────────────────────────

export interface TenantBrand {
  name: string
  logo: string | null
  favicon: string | null
  primaryHsl: string
  accentHsl: string
  radius: string
}

export interface TenantFeatures {
  invoicing: boolean
  messaging: boolean
  documents: boolean
  tracker: boolean
  analytics: boolean
  team: boolean
  calendar: boolean
  notifications: boolean
  aiAssistant: boolean
}

export interface TenantLabels {
  customers: string
  customer: string
  projects: string
  project: string
  providers: string
  provider: string
  invoices: string
  invoice: string
  tasks: string
  task: string
  documents: string
  inbox: string
  tracker: string
  analytics: string
}

export interface TenantConfig {
  id: string
  slug: string
  brand: TenantBrand
  features: TenantFeatures
  labels: TenantLabels
  plan: "STARTER" | "PRO" | "ENTERPRISE"
}

export const defaultTenantConfig: TenantConfig = {
  id: "default",
  slug: "default",
  brand: {
    name: "ValeriumPro",
    logo: null,
    favicon: null,
    primaryHsl: "221 83% 53%",
    accentHsl: "262 83% 58%",
    radius: "0.5rem",
  },
  features: {
    invoicing: true,
    messaging: true,
    documents: true,
    tracker: true,
    analytics: true,
    team: true,
    calendar: true,
    notifications: true,
    aiAssistant: false,
  },
  labels: {
    customers: "Customers",
    customer: "Customer",
    projects: "Projects",
    project: "Project",
    providers: "Team",
    provider: "Member",
    invoices: "Invoices",
    invoice: "Invoice",
    tasks: "Tasks",
    task: "Task",
    documents: "Documents",
    inbox: "Inbox",
    tracker: "Tracker",
    analytics: "Analytics",
  },
  plan: "PRO",
}

// ── Navigation ────────────────────────────────────────────────────────────────

export interface NavItem {
  title: string
  href: string
  icon: string
  feature?: keyof TenantFeatures
  badge?: string | number
  children?: NavItem[]
}

// ── Users ─────────────────────────────────────────────────────────────────────

export type Role = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER"

export interface TeamMember {
  id: string
  name: string | null
  email: string
  image: string | null
  role: Role
  joinedAt: string
}

// ── Customers ─────────────────────────────────────────────────────────────────

export type CustomerStatus = "ACTIVE" | "INACTIVE" | "LEAD" | "ARCHIVED"

export interface Customer {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  avatar: string | null
  status: CustomerStatus
  notes: string | null
  tags: string[]
  createdAt: string
}

// ── Projects ──────────────────────────────────────────────────────────────────

export type ProjectStatus = "OPEN" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "CANCELLED"
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT"

export interface Project {
  id: string
  title: string
  description: string | null
  status: ProjectStatus
  priority: Priority
  dueDate: string | null
  customerId: string | null
  customerName: string | null
  createdAt: string
}

// ── Tasks ─────────────────────────────────────────────────────────────────────

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED"

export interface Task {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  priority: Priority
  dueDate: string | null
  projectId: string | null
  position: number
}

// ── Invoices ──────────────────────────────────────────────────────────────────

export type InvoiceStatus = "DRAFT" | "SENT" | "VIEWED" | "PAID" | "OVERDUE" | "CANCELLED"

export interface LineItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Invoice {
  id: string
  number: string
  status: InvoiceStatus
  issueDate: string
  dueDate: string
  subtotal: number
  tax: number
  total: number
  currency: string
  customerId: string
  customerName: string
  lineItems: LineItem[]
}

// ── Documents ─────────────────────────────────────────────────────────────────

export interface Document {
  id: string
  name: string
  mimeType: string
  size: number
  url: string
  folder: string
  createdAt: string
  customerId: string | null
  projectId: string | null
}

// ── Messages ──────────────────────────────────────────────────────────────────

export interface Message {
  id: string
  body: string
  read: boolean
  createdAt: string
  senderId: string
  senderName: string | null
  senderImage: string | null
  customerId: string | null
  customerName: string | null
}

// ── Notifications ─────────────────────────────────────────────────────────────

export type NotificationType = "INFO" | "SUCCESS" | "WARNING" | "ERROR" | "MESSAGE" | "INVOICE" | "TASK"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  body: string | null
  read: boolean
  link: string | null
  createdAt: string
}

// ── Analytics ─────────────────────────────────────────────────────────────────

export interface MetricCard {
  label: string
  value: string | number
  change: number
  changeLabel: string
  trend: "up" | "down" | "neutral"
}

export interface ChartDataPoint {
  date: string
  value: number
  label?: string
}
