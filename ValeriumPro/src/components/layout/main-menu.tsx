"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

const icons: Record<string, (props?: { size?: number }) => React.ReactElement> = {
  "/dashboard":           (p) => <Icons.Overview size={p?.size ?? 20} />,
  "/dashboard/analytics": (p) => <Icons.Monitoring size={p?.size ?? 20} />,
  "/dashboard/invoices":  (p) => <Icons.Invoice size={p?.size ?? 20} />,
  "/dashboard/tracker":   (p) => <Icons.Tracker size={p?.size ?? 20} />,
  "/dashboard/customers": (p) => <Icons.Customers size={p?.size ?? 20} />,
  "/dashboard/inbox":     (p) => <Icons.Inbox2 size={p?.size ?? 20} />,
  "/dashboard/documents": (p) => <Icons.Vault size={p?.size ?? 20} />,
  "/dashboard/projects":  (p) => <Icons.Transactions size={p?.size ?? 20} />,
  "/dashboard/team":      (p) => <Icons.Apps size={p?.size ?? 20} />,
  "/dashboard/settings":  (p) => <Icons.Settings size={p?.size ?? 20} />,
}

const items = [
  {
    path: "/dashboard",
    name: "Overview",
  },
  {
    path: "/dashboard/analytics",
    name: "Reports",
  },
  {
    path: "/dashboard/invoices",
    name: "Invoices",
    children: [
      { path: "/dashboard/invoices/new", name: "Create new" },
    ],
  },
  {
    path: "/dashboard/tracker",
    name: "Tracker",
    children: [
      { path: "/dashboard/tracker?create=true", name: "Create new" },
    ],
  },
  {
    path: "/dashboard/customers",
    name: "Customers",
    children: [
      { path: "/dashboard/customers?create=true", name: "Create new" },
    ],
  },
  {
    path: "/dashboard/inbox",
    name: "Inbox",
  },
  {
    path: "/dashboard/documents",
    name: "Vault",
  },
  {
    path: "/dashboard/projects",
    name: "Projects",
  },
  {
    path: "/dashboard/team",
    name: "Team",
  },
  {
    path: "/dashboard/settings",
    name: "Settings",
    children: [
      { path: "/dashboard/settings", name: "General" },
      { path: "/dashboard/settings/branding", name: "Branding" },
      { path: "/dashboard/settings/notifications", name: "Notifications" },
    ],
  },
]

interface ChildItemProps {
  child: { path: string; name: string }
  isActive: boolean
  isExpanded: boolean
  shouldShow: boolean
  onSelect?: () => void
  index: number
}

const ChildItem = ({
  child,
  isActive,
  isExpanded,
  shouldShow,
  onSelect,
  index,
}: ChildItemProps) => {
  const showChild = isExpanded && shouldShow

  return (
    <Link href={child.path} prefetch onClick={() => onSelect?.()} className="block group/child">
      <div
        className={cn(
          "ml-[35px] mr-[15px] h-[32px] flex items-center",
          "border-l border-[#e6e6e6] dark:border-[#1d1d1d] pl-3",
          "transition-all duration-200 ease-out",
          showChild ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none",
        )}
        style={{ transitionDelay: showChild ? `${40 + index * 20}ms` : `${index * 20}ms` }}
      >
        <span
          className={cn(
            "text-xs font-medium transition-colors duration-200",
            "text-[#888] group-hover/child:text-primary",
            "whitespace-nowrap overflow-hidden",
            isActive && "text-primary",
          )}
        >
          {child.name}
        </span>
      </div>
    </Link>
  )
}

interface ItemProps {
  item: { path: string; name: string; children?: { path: string; name: string }[] }
  isActive: boolean
  isExpanded: boolean
  isItemExpanded: boolean
  onToggle: (path: string) => void
  onSelect?: () => void
}

const Item = ({ item, isActive, isExpanded, isItemExpanded, onToggle, onSelect }: ItemProps) => {
  const Icon = icons[item.path]
  const pathname = usePathname()
  const hasChildren = (item.children?.length ?? 0) > 0
  const shouldShowChildren = isExpanded && isItemExpanded

  const handleChevronClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggle(item.path)
  }

  return (
    <div className="group">
      <Link href={item.path} prefetch onClick={() => onSelect?.()} className="group">
        <div className="relative">
          <div
            className={cn(
              "border border-transparent h-[40px] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ml-[15px] mr-[15px]",
              isActive && "bg-[#f7f7f7] dark:bg-[#131313] border-[#e6e6e6] dark:border-[#1d1d1d]",
              isExpanded ? "w-[calc(100%-30px)]" : "w-[40px]",
            )}
          />

          <div className="absolute top-0 left-[15px] w-[40px] h-[40px] flex items-center justify-center text-[#666666] dark:text-[#666666] group-hover:!text-primary pointer-events-none">
            <div className={cn(isActive && "dark:!text-white !text-black")}>
              {Icon ? <Icon size={20} /> : null}
            </div>
          </div>

          {isExpanded && (
            <div className="absolute top-0 left-[55px] right-[4px] h-[40px] flex items-center pointer-events-none">
              <span
                className={cn(
                  "text-sm font-medium transition-opacity duration-200 ease-in-out text-[#666] group-hover:text-primary whitespace-nowrap overflow-hidden",
                  hasChildren ? "pr-2" : "",
                  isActive && "text-primary",
                )}
              >
                {item.name}
              </span>
              {hasChildren && (
                <button
                  type="button"
                  onClick={handleChevronClick}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center transition-all duration-200 ml-auto mr-3 pointer-events-auto",
                    "text-[#888] hover:text-primary",
                    isActive && "text-primary/60",
                    shouldShowChildren && "rotate-180",
                  )}
                >
                  <Icons.ChevronDown size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </Link>

      {hasChildren && (
        <div
          className={cn(
            "transition-all duration-300 ease-out overflow-hidden",
            shouldShowChildren ? "max-h-96 mt-1" : "max-h-0",
          )}
        >
          {item.children!.map((child, index) => (
            <ChildItem
              key={child.path}
              child={child}
              isActive={pathname === child.path}
              isExpanded={isExpanded}
              shouldShow={shouldShowChildren}
              onSelect={onSelect}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  )
}

type Props = {
  onSelect?: () => void
  isExpanded?: boolean
}

export function MainMenu({ onSelect, isExpanded = false }: Props) {
  const pathname = usePathname()
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  useEffect(() => {
    setExpandedItem(null)
  }, [isExpanded])

  return (
    <div className="mt-4 w-full">
      <nav className="w-full">
        <div className="flex flex-col gap-2">
          {items.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/dashboard" && pathname.startsWith(item.path))

            return (
              <Item
                key={item.path}
                item={item}
                isActive={isActive}
                isExpanded={isExpanded}
                isItemExpanded={expandedItem === item.path}
                onToggle={(path) => setExpandedItem(expandedItem === path ? null : path)}
                onSelect={onSelect}
              />
            )
          })}
        </div>
      </nav>
    </div>
  )
}
