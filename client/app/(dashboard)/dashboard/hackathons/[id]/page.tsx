import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  MapPin,
  Globe,
  Users,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

// Mock data
const hackathons = {
  "1": {
    id: "1",
    name: "Global AI Hackathon",
    date: "June 15-17, 2023",
    location: "New York, NY",
    isOnline: false,
    tags: ["AI", "Machine Learning", "Data Science"],
    interested: true,
    description:
      "Join the Global AI Hackathon to build innovative solutions using artificial intelligence and machine learning. This three-day event brings together developers, data scientists, and designers to create impactful projects that leverage the latest AI technologies.",
    organizer: "AI Innovation Labs",
    website: "https://example.com/global-ai-hackathon",
    prizes: ["$10,000 Grand Prize", "Cloud Credits", "AI Hardware Kits"],
    interestedUsers: [
      { id: "1", name: "Alex Johnson", role: "Frontend Developer" },
      { id: "2", name: "Sarah Chen", role: "UI/UX Designer" },
      { id: "4", name: "Priya Sharma", role: "Full Stack Developer" },
    ],
  },
  "2": {
    id: "2",
    name: "Web3 Development Challenge",
    date: "July 8-10, 2023",
    location: "",
    isOnline: true,
    tags: ["Blockchain", "Web3", "Smart Contracts"],
    interested: true,
    description:
      "The Web3 Development Challenge is a virtual hackathon focused on building decentralized applications and smart contracts. Participants will explore blockchain technologies and create innovative solutions for the decentralized web.",
    organizer: "Blockchain Builders Association",
    website: "https://example.com/web3-challenge",
    prizes: [
      "5 ETH Grand Prize",
      "NFT Collectibles",
      "Developer Bootcamp Scholarships",
    ],
    interestedUsers: [
      { id: "3", name: "Miguel Rodriguez", role: "Backend Developer" },
      { id: "5", name: "David Kim", role: "Machine Learning Engineer" },
    ],
  },
};

export default function HackathonDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const hackathon = hackathons[params.id as keyof typeof hackathons];

  if (!hackathon) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Hackathon Not Found
          </h1>
          <p className="text-muted-foreground">
            The hackathon you're looking for doesn't exist.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/hackathons">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hackathons
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/hackathons">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {hackathon.name}
          </h1>
          <Button variant={hackathon.interested ? "destructive" : "default"}>
            {hackathon.interested ? "Remove Interest" : "I'm Interested"}
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 mt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{hackathon.date}</span>
          </div>
          {hackathon.isOnline ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>Online</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{hackathon.location}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{hackathon.interestedUsers.length} interested</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {hackathon.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>About this Hackathon</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{hackathon.description}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-medium mb-1">Organizer</h3>
                <p className="text-sm text-muted-foreground">
                  {hackathon.organizer}
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Website</h3>
                <a
                  href={hackathon.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary flex items-center gap-1 hover:underline"
                >
                  Visit Website
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-1">Prizes</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {hackathon.prizes.map((prize, index) => (
                  <li key={index}>{prize}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interested Teammates</CardTitle>
            <CardDescription>
              People who want to participate in this hackathon
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hackathon.interestedUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto" asChild>
                  <Link href={`/dashboard/profile/${user.id}`}>View</Link>
                </Button>
              </div>
            ))}
            {hackathon.interestedUsers.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No users have expressed interest yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
