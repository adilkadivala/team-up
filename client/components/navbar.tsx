"use client";

import { Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn } = useUser();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <div className="hidden md:flex items-center gap-4">
            <Link href={isSignedIn ? "/console" : "/sign-in"}>
              <Button variant="outline" size="sm">
                {isSignedIn ? "console" : "Login"}
              </Button>
            </Link>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
