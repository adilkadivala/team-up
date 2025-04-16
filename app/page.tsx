"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/hero-background";
import { AnimatedGradient } from "@/components/animated-gradient";
import { FeatureCard } from "@/components/feature-card";
import { StepCard } from "@/components/step-card";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileNav } from "@/components/mobile-nav";
import {
  Users,
  Search,
  MessageSquare,
  Calendar,
  Code,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              <span className="font-bold">HackMate</span>
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
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
            <MobileNav />
          </div>
        </div>
      </header>


      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
          <AnimatedGradient />
          <HeroBackground />
          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                Find your perfect hackathon team
              </div>
              <div className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <p>
                  Connect with the right teammates for your next hackathon
                  project
                </p>
              </div>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
                HackMate helps you find skilled developers, designers, and
                innovators to build winning projects at hackathons worldwide.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" className="h-12 px-8 gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/browse">
                  <Button size="lg" variant="outline" className="h-12 px-8">
                    Browse Teammates
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-16 md:mt-24 relative mx-auto max-w-5xl">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-primary/5 to-background rounded-xl blur-xl"></div>
              <div className="relative overflow-hidden rounded-xl border bg-background/80 backdrop-blur-sm shadow-xl">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
                <div className="p-4 md:p-8">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border bg-background p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Code className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Frontend Developer</h3>
                          <div className="flex gap-2 mt-1">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              React
                            </span>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              UI/UX
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Looking for a backend developer and designer for AI
                        hackathon
                      </div>
                    </div>
                    <div className="rounded-lg border bg-background p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Zap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">ML Engineer</h3>
                          <div className="flex gap-2 mt-1">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              Python
                            </span>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              TensorFlow
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Seeking frontend dev and UX designer for health tech
                        hackathon
                      </div>
                    </div>
                    <div className="rounded-lg border bg-background p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">UI/UX Designer</h3>
                          <div className="flex gap-2 mt-1">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              Figma
                            </span>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              Design
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Looking for full-stack developers for fintech hackathon
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything You Need to Build the Perfect Team
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes it easy to find the right teammates for
                  your next hackathon project.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Users className="h-10 w-10" />}
                title="Skill-Based Matching"
                description="Find teammates with complementary skills to build a balanced team."
              />
              <FeatureCard
                icon={<Search className="h-10 w-10" />}
                title="Advanced Filters"
                description="Search by location, skills, experience level, and hackathon interests."
              />
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10" />}
                title="Direct Messaging"
                description="Connect with potential teammates through our built-in messaging system."
              />
              <FeatureCard
                icon={<Calendar className="h-10 w-10" />}
                title="Hackathon Directory"
                description="Browse upcoming hackathons and find teammates specifically for those events."
              />
              <FeatureCard
                icon={<Code className="h-10 w-10" />}
                title="Tech Stack Matching"
                description="Filter by specific technologies to find teammates familiar with your stack."
              />
              <FeatureCard
                icon={<Sparkles className="h-10 w-10" />}
                title="Project Showcase"
                description="Highlight your past projects to attract the right teammates."
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">
                  Three Simple Steps to Find Your Dream Team
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Our streamlined process helps you connect with the perfect
                  teammates quickly and efficiently.
                </p>

                <div className="space-y-6">
                  <StepCard
                    number={1}
                    title="Create Your Profile"
                    description="Sign up and showcase your skills, experience, and the hackathons you're interested in joining."
                  />
                  <StepCard
                    number={2}
                    title="Discover Teammates"
                    description="Browse potential teammates filtered by skills, location, and hackathon interests."
                  />
                  <StepCard
                    number={3}
                    title="Connect & Collaborate"
                    description="Message potential teammates, form your team, and start building amazing projects together."
                  />
                </div>

                <div className="mt-8">
                  <Link href="/signup">
                    <Button size="lg" className="gap-2">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-xl blur-xl"></div>
                <div className="relative overflow-hidden rounded-xl border bg-background/80 backdrop-blur-sm shadow-xl">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-lg">Find Your Teammate</h3>
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <div className="h-2 w-2 rounded-full bg-muted"></div>
                        <div className="h-2 w-2 rounded-full bg-muted"></div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Code className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Sarah Chen</h4>
                          <div className="flex gap-2 mt-1">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              React
                            </span>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              UI/UX
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Zap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Alex Johnson</h4>
                          <div className="flex gap-2 mt-1">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              Python
                            </span>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              ML
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Sparkles className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Miguel Santos</h4>
                          <div className="flex gap-2 mt-1">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              Node.js
                            </span>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              MongoDB
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 rounded-lg border bg-primary/5 border-primary/50 transition-colors">
                        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Priya Sharma</h4>
                          <div className="flex gap-2 mt-1">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              Figma
                            </span>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              Design
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button className="w-full">Connect with Teammates</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Find Your Dream Team?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of developers, designers, and innovators
                  building amazing projects together.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="gap-1">
                    <Sparkles className="h-4 w-4" />
                    Get Started for Free
                  </Button>
                </Link>
                <Link href="/browse">
                  <Button size="lg" variant="outline">
                    Browse Teammates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      
      <footer className="border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="font-semibold">HackMate</span>
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
                  href="/browse"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Browse Teammates
                </Link>
                <Link
                  href="/hackathons"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Hackathons
                </Link>
                <Link
                  href="/projects"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Projects
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
                <Link
                  href="/careers"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Careers
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
                <Link
                  href="/cookies"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Cookie Policy
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {new Date().getFullYear()} HackMate. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
