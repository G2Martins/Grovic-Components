import { AppSidebar } from "@/components/layout/sidebar"
import { DashboardHeader } from "@/components/layout/header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <AppSidebar />
      <div className="md:ml-[70px] pb-4">
        <DashboardHeader />
        <div className="px-4 md:px-8 animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  )
}
