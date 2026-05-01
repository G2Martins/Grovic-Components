"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type Item = { path: string; label: string }
type Props = { items: Item[] }

export function SecondaryMenu({ items }: Props) {
  const pathname = usePathname()

  return (
    <nav className="py-4">
      <ul className="flex space-x-6 text-sm overflow-auto scrollbar-hide">
        {items.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            prefetch
            className={cn(
              "text-[#606060] hover:text-primary transition-colors whitespace-nowrap",
              pathname === item.path && "text-primary font-medium underline underline-offset-8",
            )}
          >
            {item.label}
          </Link>
        ))}
      </ul>
    </nav>
  )
}
