"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MessageSquare,
  Github,
  Linkedin,
  MapPin,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

// Mock data
const users = {
  "1": {
    id: "1",
    name: "Alex Johnson",
    role: "Frontend Developer",
    location: "San Francisco, CA",
    bio: "Frontend developer with 5 years of experience specializing in React and TypeScript. Passionate about creating intuitive user interfaces and accessible web applications.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Redux", "Jest"],
    hackathons: [
      { name: "HackSF 2023", date: "March 2023" },
      { name: "ReactConf Hackathon", date: "May 2023" },
      { name: "Global AI Hackathon", date: "June 2023" },
    ],
    github: "https://github.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson",
    avatar: "/user.svg",
  },
  "2": {
    id: "2",
    name: "Sarah Chen",
    role: "UI/UX Designer",
    location: "Remote",
    bio: "UI/UX designer with a background in visual design and user research. I love creating beautiful, functional interfaces that solve real user problems.",
    skills: [
      "Figma",
      "UI Design",
      "User Research",
      "Prototyping",
      "Adobe XD",
      "Sketch",
    ],
    hackathons: [
      { name: "DesignHack 2023", date: "February 2023" },
      { name: "UX Challenge", date: "April 2023" },
      { name: "Global AI Hackathon", date: "June 2023" },
    ],
    github: "https://github.com/sarahchen",
    linkedin: "https://linkedin.com/in/sarahchen",
    avatar: "/user.svg",
  },
};

export default function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const user = users[id as keyof typeof users];

  if (!user) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Not Found</h1>
          <p className="text-muted-foreground">
            The user profile you're looking for doesn't exist.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/browse">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/browse">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user.avatar || "/user.svg"}
                alt={user.name}
                className="dark:bg-foreground p-2.5"
              />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription className="text-lg">{user.role}</CardDescription>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {user.location}
              </div>
              <div className="flex gap-2 mt-2">
                <Button size="sm" className="gap-1" asChild>
                  <Link href={`/dashboard/messages/${user.id}`}>
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </Link>
                </Button>
                {user.github && (
                  <Button size="sm" variant="outline" className="gap-1" asChild>
                    <a
                      href={user.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                )}
                {user.linkedin && (
                  <Button size="sm" variant="outline" className="gap-1" asChild>
                    <a
                      href={user.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">About</h3>
              <p className="text-muted-foreground">{user.bio}</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Hackathon Experience</h3>
              <div className="space-y-2">
                {user.hackathons.map((hackathon, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {hackathon.name} -{" "}
                      <span className="text-muted-foreground">
                        {hackathon.date}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
