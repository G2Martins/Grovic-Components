import type { InvoiceStatus } from "@/types"

export type InvoiceItem = { description: string; qty: number; unit: number }

export type InvoiceData = {
  id: string
  number: string
  customer: string
  customerEmail: string
  total: number
  subtotal: number
  tax: number
  status: InvoiceStatus
  issueDate: string
  dueDate: string
  items: InvoiceItem[]
}

export const INVOICES: InvoiceData[] = [
  {
    id: "1",
    number: "INV-0042",
    customer: "Acme Corp",
    customerEmail: "hello@acme.com",
    total: 4800,
    subtotal: 4800,
    tax: 0,
    status: "OVERDUE",
    issueDate: "2026-03-15",
    dueDate: "2026-03-30",
    items: [
      { description: "Design Services", qty: 1, unit: 2400 },
      { description: "Development Sprint 3", qty: 2, unit: 1200 },
    ],
  },
  {
    id: "2",
    number: "INV-0041",
    customer: "Globex Industries",
    customerEmail: "contact@globex.com",
    total: 12500,
    subtotal: 12500,
    tax: 0,
    status: "PAID",
    issueDate: "2026-03-01",
    dueDate: "2026-03-20",
    items: [
      { description: "Software License Q1", qty: 1, unit: 10000 },
      { description: "Support Package", qty: 5, unit: 500 },
    ],
  },
  {
    id: "3",
    number: "INV-0040",
    customer: "Initech Solutions",
    customerEmail: "info@initech.com",
    total: 3200,
    subtotal: 3200,
    tax: 0,
    status: "SENT",
    issueDate: "2026-04-01",
    dueDate: "2026-04-20",
    items: [
      { description: "Consulting Hours", qty: 16, unit: 200 },
    ],
  },
  {
    id: "4",
    number: "INV-0039",
    customer: "Acme Corp",
    customerEmail: "hello@acme.com",
    total: 7600,
    subtotal: 7600,
    tax: 0,
    status: "VIEWED",
    issueDate: "2026-04-05",
    dueDate: "2026-04-25",
    items: [
      { description: "Project Management", qty: 1, unit: 3600 },
      { description: "Development Sprint 4", qty: 2, unit: 2000 },
    ],
  },
  {
    id: "5",
    number: "INV-0038",
    customer: "Umbrella Corp",
    customerEmail: "admin@umbrella.com",
    total: 950,
    subtotal: 950,
    tax: 0,
    status: "DRAFT",
    issueDate: "2026-04-10",
    dueDate: "2026-04-30",
    items: [
      { description: "Maintenance Contract", qty: 1, unit: 950 },
    ],
  },
]
