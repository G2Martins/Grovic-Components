"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Icons } from "@/components/ui/icons"
import { getInitials } from "@/lib/utils"
import { MobileNav } from "./mobile-nav"

const DEMO_USER = { name: "Bryan Parreira", email: "bryan@webvisionrank.com" }

function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative h-6 w-11 rounded-full border border-border bg-muted transition-colors hover:bg-accent focus:outline-none"
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform duration-200 ${
          resolvedTheme === "dark" ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  )
}

function NotificationBell() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full w-8 h-8 items-center hidden md:flex relative"
    >
      <Icons.Inbox2 size={16} />
      <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
    </Button>
  )
}

export function DashboardHeader() {
  return (
    <header
      className="md:m-0 z-50 px-6 md:border-b h-[70px] flex justify-between items-center top-0 backdrop-filter backdrop-blur-xl md:backdrop-filter md:backdrop-blur-none bg-background bg-opacity-70 sticky transition-transform"
      style={{
        transform: "translateY(calc(var(--header-offset, 0px) * -1))",
        transitionDuration: "var(--header-transition, 200ms)",
        willChange: "transform",
      }}
    >
      <MobileNav />

      {/* Search */}
      <Button
        variant="ghost"
        className="relative min-w-[200px] w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 border-0 p-0 hover:bg-transparent font-normal hidden md:flex"
      >
        <Icons.Search size={18} className="mr-2 shrink-0" />
        <span>Find anything...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 border bg-accent px-1.5 text-[10px] font-medium sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <div className="flex items-center space-x-2 ml-auto">
        <NotificationBell />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="rounded-full w-8 h-8 cursor-pointer bg-accent">
              <AvatarFallback className="bg-[#f0f0f0] dark:bg-[#1a1a1a] text-foreground text-[10px] font-bold rounded-full">
                {getInitials(DEMO_USER.name)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[240px]" sideOffset={10} align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="truncate text-xs font-semibold">{DEMO_USER.name}</span>
                <span className="truncate text-xs text-muted-foreground font-normal">{DEMO_USER.email}</span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <a href="/dashboard/settings" className="text-xs">Account</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/dashboard/settings/notifications" className="text-xs">Notifications</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/dashboard/team" className="text-xs">Team</a>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <div className="flex flex-row justify-between items-center px-2 py-1.5">
              <p className="text-xs">Theme</p>
              <ThemeSwitch />
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <a href="/login" className="text-xs text-muted-foreground">Sign out</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
