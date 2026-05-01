import type { Priority, ProjectStatus } from "@/types"

export type ProjectTask = {
  id: string
  title: string
  done: boolean
}

export type ProjectData = {
  id: string
  title: string
  customer: string
  status: ProjectStatus
  priority: Priority
  progress: number
  startDate: string
  dueDate: string
  tasks: ProjectTask[]
}

export const PROJECTS: ProjectData[] = [
  {
    id: "1",
    title: "Website Redesign",
    customer: "Acme Corp",
    status: "IN_PROGRESS",
    priority: "HIGH",
    progress: 65,
    startDate: "2026-03-01",
    dueDate: "2026-05-15",
    tasks: [
      { id: "t1", title: "Homepage wireframe", done: true },
      { id: "t2", title: "Component library setup", done: true },
      { id: "t3", title: "Mobile responsive layout", done: false },
      { id: "t4", title: "SEO optimization", done: false },
    ],
  },
  {
    id: "2",
    title: "Mobile App MVP",
    customer: "Globex Industries",
    status: "OPEN",
    priority: "URGENT",
    progress: 10,
    startDate: "2026-04-01",
    dueDate: "2026-06-30",
    tasks: [
      { id: "t1", title: "Requirements gathering", done: true },
      { id: "t2", title: "UI wireframes", done: false },
      { id: "t3", title: "Backend API design", done: false },
      { id: "t4", title: "Auth implementation", done: false },
    ],
  },
  {
    id: "3",
    title: "Brand Strategy",
    customer: "Initech Solutions",
    status: "REVIEW",
    priority: "MEDIUM",
    progress: 90,
    startDate: "2026-02-01",
    dueDate: "2026-04-30",
    tasks: [
      { id: "t1", title: "Brand audit", done: true },
      { id: "t2", title: "Competitor analysis", done: true },
      { id: "t3", title: "Visual identity guidelines", done: true },
      { id: "t4", title: "Final presentation", done: false },
    ],
  },
  {
    id: "4",
    title: "Data Migration",
    customer: "Umbrella Corp",
    status: "COMPLETED",
    priority: "LOW",
    progress: 100,
    startDate: "2026-01-10",
    dueDate: "2026-03-01",
    tasks: [
      { id: "t1", title: "Schema mapping", done: true },
      { id: "t2", title: "ETL pipeline", done: true },
      { id: "t3", title: "Data validation", done: true },
      { id: "t4", title: "Cutover", done: true },
    ],
  },
  {
    id: "5",
    title: "API Integration",
    customer: "Acme Corp",
    status: "IN_PROGRESS",
    priority: "HIGH",
    progress: 40,
    startDate: "2026-03-15",
    dueDate: "2026-05-20",
    tasks: [
      { id: "t1", title: "API documentation review", done: true },
      { id: "t2", title: "Authentication flow", done: true },
      { id: "t3", title: "Data sync endpoints", done: false },
      { id: "t4", title: "Error handling", done: false },
    ],
  },
  {
    id: "6",
    title: "Security Audit",
    customer: "Globex Industries",
    status: "OPEN",
    priority: "URGENT",
    progress: 0,
    startDate: "2026-04-20",
    dueDate: "2026-05-01",
    tasks: [
      { id: "t1", title: "Vulnerability scanning", done: false },
      { id: "t2", title: "Penetration testing", done: false },
      { id: "t3", title: "Compliance review", done: false },
      { id: "t4", title: "Remediation plan", done: false },
    ],
  },
]
