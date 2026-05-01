import { SecondaryMenu } from "@/components/layout/secondary-menu"

const items = [
  { path: "/dashboard/settings", label: "General" },
  { path: "/dashboard/settings/branding", label: "Branding" },
  { path: "/dashboard/settings/notifications", label: "Notifications" },
  { path: "/dashboard/team", label: "Members" },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[800px]">
      <SecondaryMenu items={items} />
      <main className="mt-4">{children}</main>
    </div>
  )
}
