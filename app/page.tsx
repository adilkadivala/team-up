"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/hero-background";
import { AnimatedGradient } from "@/components/animated-gradient";
import { FeatureCard } from "@/components/feature-card";
import { StepCard } from "@/components/step-card";

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
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Feature from "@/components/features";
import Workflow from "@/components/work-flow";
import GetReady from "@/components/get-ready";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col px-3">
      <Navbar /> 
      <main className="flex-1">
        <Hero />
        <Feature />
        <Workflow />
        <GetReady />
      </main>
      <Footer />
    </div>
  );
}
