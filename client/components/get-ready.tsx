"use client";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useValidateUser } from "@/store/user-context";

const GetReady = () => {
  const validUser = useValidateUser();
  if (!validUser) return null;
  const { isAuthenticated } = validUser;

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            let's team-up
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Ready to Find Your Dream Team?
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of developers, designers, and innovators building
              amazing projects together.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href={isAuthenticated ? "/dashboard/brows" : "/sign-in"}>
              <Button size="lg" className="gap-1 cursor-pointer">
                <Sparkles className="h-4 w-4" />
                Get Started for Free
              </Button>
            </Link>
            <Link href={isAuthenticated ? "/dashboard/browse" : "/sign-in"}>
              <Button size="lg" variant="outline" className="cursor-pointer">
                Browse Teammates
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetReady;
