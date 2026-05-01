"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Icons } from "@/components/ui/icons"
import { MainMenu } from "./main-menu"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOpen(true)}
          className="rounded-full w-8 h-8 items-center relative flex md:hidden"
        >
          <Icons.Menu size={16} />
        </Button>
      </div>
      <SheetContent side="left" className="border-none rounded-none -ml-4">
        <div className="ml-2 mb-8">
          <Icons.LogoSmall className="w-6 h-6 text-foreground" />
        </div>
        <div className="-ml-2">
          <MainMenu onSelect={() => setOpen(false)} isExpanded={true} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
