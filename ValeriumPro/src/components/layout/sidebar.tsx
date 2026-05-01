"use client"

import Link from "next/link"
import { useState } from "react"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { getInitials } from "@/lib/utils"
import { MainMenu } from "./main-menu"

const DEMO_USER = { name: "Bryan Parreira", email: "bryan@webvisionrank.com", plan: "Pro" }

function UserAvatar({ isExpanded }: { isExpanded: boolean }) {
  return (
    <div className="relative h-[32px]">
      <div className="fixed left-[19px] bottom-4 w-[32px] h-[32px]">
        <div className="w-[32px] h-[32px] flex items-center justify-center bg-[#f0f0f0] dark:bg-[#1a1a1a] border border-[#DCDAD2] dark:border-[#2C2C2C] text-[10px] font-bold text-foreground">
          {getInitials(DEMO_USER.name)}
        </div>
      </div>
      {isExpanded && (
        <div className="fixed left-[62px] bottom-4 h-[32px] flex items-center">
          <span className="text-sm text-primary truncate transition-opacity duration-200 ease-in-out cursor-pointer hover:opacity-80">
            {DEMO_USER.name}
          </span>
        </div>
      )}
    </div>
  )
}

export function AppSidebar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <aside
      className={cn(
        "h-screen flex-shrink-0 flex-col justify-between fixed top-0 pb-4 items-center hidden md:flex z-50 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "bg-background border-r border-border",
        isExpanded ? "w-[240px]" : "w-[70px]",
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div
        className={cn(
          "absolute top-0 left-0 h-[70px] flex items-center justify-center bg-background border-b border-border transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isExpanded ? "w-full" : "w-[69px]",
        )}
      >
        <Link href="/dashboard" className="absolute left-[22px] transition-none">
          <Icons.LogoSmall className="w-6 h-6 text-foreground" />
        </Link>
      </div>

      {/* Nav */}
      <div className="flex flex-col w-full pt-[70px] flex-1 border-b border-border mb-3">
        <MainMenu isExpanded={isExpanded} />
      </div>

      {/* User */}
      <UserAvatar isExpanded={isExpanded} />
    </aside>
  )
}
