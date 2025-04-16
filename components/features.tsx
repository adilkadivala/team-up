import React from "react";
import { FeatureCard } from "@/components/feature-card";
import {
  Calendar,
  Code,
  MessageSquare,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

const Features = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need to Build the Perfect Team
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform makes it easy to find the right teammates for your
              next hackathon project.
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
  );
};

export default Features;
