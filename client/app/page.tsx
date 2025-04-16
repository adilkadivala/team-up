"use client";

import Link from "next/link";
import { Button } from "@/client/components/ui/button";
import { HeroBackground } from "@/client/components/hero-background";
import { AnimatedGradient } from "@/client/components/animated-gradient";
import { FeatureCard } from "@/client/components/feature-card";
import { StepCard } from "@/client/components/step-card";

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
import Navbar from "@/client/components/navbar";
import Footer from "@/client/components/footer";
import Hero from "@/client/components/hero";
import Feature from "@/client/components/features";
import Workflow from "@/client/components/work-flow";
import GetReady from "@/client/components/get-ready";

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
