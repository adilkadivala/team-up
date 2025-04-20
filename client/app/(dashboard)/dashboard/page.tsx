"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeammateCard } from "@/components/teammate-card";
import { HackathonCard } from "@/components/hackathon-card";
import { Button } from "@/components/ui/button";
import { Users, Trophy, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back {isLoaded ? ", " : ""}
          <span className="text-2xl font-bold tracking-tight">
            {user?.firstName}👋
          </span>
          ! Find teammates, join hackathons, and build amazing projects.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Potential Teammates
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">
              +5 new matches based on your skills
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Hackathons
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Hackathons you're interested in
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unread Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              From 3 different conversations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Profile Completion
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              Add more skills to complete your profile
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recommended Teammates</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/browse" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            <TeammateCard
              id="1"
              name="Alex Johnson"
              role="Frontend Developer"
              location="San Francisco, CA"
              skills={["React", "TypeScript", "Tailwind CSS"]}
              hackathons={["HackSF 2023", "ReactConf Hackathon"]}
            />
            <TeammateCard
              id="2"
              name="Sarah Chen"
              role="UI/UX Designer"
              location="Remote"
              skills={["Figma", "UI Design", "User Research"]}
              hackathons={["DesignHack 2023", "UX Challenge"]}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upcoming Hackathons</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/hackathons" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            <HackathonCard
              id="1"
              name="Global AI Hackathon"
              date="June 15-17, 2023"
              location="New York, NY"
              isOnline={false}
              tags={["AI", "Machine Learning", "Data Science"]}
              interested={true}
            />
            <HackathonCard
              id="2"
              name="Web3 Development Challenge"
              date="July 8-10, 2023"
              location=""
              isOnline={true}
              tags={["Blockchain", "Web3", "Smart Contracts"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
