import React from "react";
import { Button } from "@/client/components/ui/button";
import { ArrowRight, Code, Sparkles, Users, Zap } from "lucide-react";
import { StepCard } from "./step-card";
import Link from "next/link";

const Workflow = () => {
  return (
    <section className="py-5 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="container px-4 relative">
        <div className="flex items-center justify-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
            How It Works
          </span>
        </div>
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
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
  );
};

export default Workflow;
