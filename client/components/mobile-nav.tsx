"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/client/components/ui/button"
import { Sheet, SheetContent, SheetTrigger,SheetHeader, SheetTitle } from "@/client/components/ui/sheet"
import { Menu } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>pages</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-8">
          <Link
            href="/"
            className="text-lg font-medium hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium text-muted-foreground hover:text-primary"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium text-muted-foreground hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/browse"
            className="text-lg font-medium text-muted-foreground hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Browse Teammates
          </Link>
          <Link
            href="/hackathons"
            className="text-lg font-medium text-muted-foreground hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Hackathons
          </Link>
        </div>
        <div className="mt-auto space-y-4 mb-8">
          <Link href="/login" onClick={() => setOpen(false)}>
            <Button variant="outline" className="w-full">
              Log in
            </Button>
          </Link>
          <Link href="/signup" onClick={() => setOpen(false)}>
            <Button className="w-full">Sign up</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
