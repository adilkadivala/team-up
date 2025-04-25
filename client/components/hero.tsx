"use client";

import { ArrowRight, Code, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/hero-background";
import { AnimatedGradient } from "@/components/animated-gradient";
import { useValidateUser } from "@/store/user-context";

const Hero = () => {
  const validUser = useValidateUser();
  if (!validUser) return null;
  const { isAuthenticated } = validUser;

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <AnimatedGradient />
      <HeroBackground />
      <div className="container relative z-10 px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            Find your perfect hackathon team
          </div>
          <div className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <p>
              Connect with the right teammates for your next hackathon project
            </p>
          </div>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
            Team-up helps you find skilled developers, designers, and innovators
            to build winning projects at hackathons worldwide.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={isAuthenticated ? "/dashboard" : "/sign-in"}>
              <Button size="lg" className="h-12 px-8 gap-2 cursor-pointer">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={isAuthenticated ? "/dashboard/browse" : "/sign-in"}>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 cursor-pointer"
              >
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
  );
};

export default Hero;
