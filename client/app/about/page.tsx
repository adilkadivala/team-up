"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted/50 py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  About Team-up
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Connecting innovators to build amazing projects together.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4">
                  Our Mission
                </h2>
                <p className="text-muted-foreground mb-6">
                  At Team-up, we believe that the best innovations come from
                  diverse teams with complementary skills. Our mission is to
                  connect talented individuals from around the world to form the
                  perfect teams for hackathons and collaborative projects.
                </p>
                <p className="text-muted-foreground">
                  We're passionate about fostering a community where developers,
                  designers, and innovators can find like-minded collaborators,
                  share ideas, and build amazing projects together.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[300px] w-full max-w-[400px] rounded-lg bg-gradient-to-br from-primary/20 to-muted p-1 shadow-xl">
                  <div className="absolute inset-0 rounded-lg border border-primary/10 bg-background/80 backdrop-blur-sm"></div>
                  <div className="relative h-full w-full rounded-lg bg-background p-6 flex items-center justify-center">
                    <div className="text-center">
                      <Lightbulb className="h-16 w-16 mx-auto mb-4 text-primary" />
                      <h3 className="text-xl font-bold mb-2">
                        Innovation Through Collaboration
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        We're building a world where finding the perfect
                        teammate is never a barrier to innovation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Our Story</h2>
            </div>
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">The Beginning</h3>
                <p className="text-muted-foreground">
                  Team-up was born out of a common frustration experienced by
                  our founders at hackathons: finding the right teammates with
                  complementary skills. After struggling to form balanced teams
                  at several events, they decided to build a solution that would
                  make team formation easier and more effective.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">The Journey</h3>
                <p className="text-muted-foreground">
                  What started as a simple matching tool has evolved into a
                  comprehensive platform for hackathon enthusiasts. We've grown
                  through feedback from our community, continuously improving
                  our features to better serve innovators worldwide.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Today</h3>
                <p className="text-muted-foreground">
                  Today, Team-up connects thousands of developers, designers,
                  and innovators across the globe. We're proud to have
                  facilitated countless successful collaborations and
                  award-winning hackathon projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Our Team</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">
                Meet the passionate individuals behind Team-up.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="h-24 w-24 rounded-full bg-muted mb-4">
                    <Image
                      src={"/user.svg"}
                      width={50}
                      height={50}
                      alt="profiles"
                      className="mx-auto mt-4"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Team Member {i}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Co-Founder & Manager
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Brief bio about the team member and their background.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Team-Up with Telent
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Be part of a growing network of innovators and creators.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard">
                  <Button size="lg" className="cursor-pointer">
                    Get Started
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="cursor-pointer"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
