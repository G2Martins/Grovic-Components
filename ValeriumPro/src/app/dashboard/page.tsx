import { Metadata } from "next"
import { OverviewContent } from "@/components/dashboard/overview-content"

export const metadata: Metadata = { title: "Overview | ValeriumPro" }

export default function DashboardPage() {
  return <OverviewContent />
}
