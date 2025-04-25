"use client";

import { Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useValidateUser } from "@/store/user-context";

const Navbar = () => {
  const pathname = usePathname();

  const validUser = useValidateUser();
  if (!validUser) return null;
  const { isAuthenticated } = validUser;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <span className="font-bold">Team-Up</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium hover:text-primary",
              pathname === "/" ? "transition-colors" : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium hover:text-primary",
              pathname === "/about"
                ? "transition-colors"
                : "text-muted-foreground"
            )}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={cn(
              "text-sm font-medium hover:text-primary",
              pathname === "/contact"
                ? "transition-colors"
                : "text-muted-foreground"
            )}
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href={isAuthenticated ? "/dashboard" : "/sign-in"}>
                {isAuthenticated ? "dashboard" : "sign-in"}
              </Link>
            </Button>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
