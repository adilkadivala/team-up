"use client";

import { useUser } from "@clerk/nextjs";
import { Github, Linkedin, Twitter, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const isSignedIn = useUser();

  return (
    <footer className="border-t bg-background px-3">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span className="font-semibold">Team-up</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Find your perfect hackathon teammate. Build amazing projects
            together.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-8">
          <div className="space-y-2">
            <h4 className="font-medium">Platform</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href={isSignedIn ? "/dashboard/profile" : "/sign-in"}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Your Profile
              </Link>
              <Link
                href={isSignedIn ? "/dashboard/hackathons" : "/sign-in"}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Hackathons
              </Link>
              <Link
                href={isSignedIn ? "/dashboard/browse" : "/sign-in"}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Browse Teammates
              </Link>
            </nav>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Company</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Team-up. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://x.com/adil_kadival"
              className="rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Twitter</span>
              <Twitter />
            </Link>
            <Link
              href="https://github.com/adilkadivala"
              className="rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">GitHub</span>
              <Github />
            </Link>
            <Link
              href="https://www.linkedin.com/in/adilkadival/"
              className="rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
