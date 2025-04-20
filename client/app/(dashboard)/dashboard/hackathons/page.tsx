"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { HackathonCard } from "@/components/hackathon-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// Mock data
const hackathons = [
  {
    id: "1",
    name: "Global AI Hackathon",
    date: "June 15-17, 2023",
    location: "New York, NY",
    isOnline: false,
    tags: ["AI", "Machine Learning", "Data Science"],
    interested: true,
  },
  {
    id: "2",
    name: "Web3 Development Challenge",
    date: "July 8-10, 2023",
    location: "",
    isOnline: true,
    tags: ["Blockchain", "Web3", "Smart Contracts"],
    interested: true,
  },
  {
    id: "3",
    name: "Mobile App Innovation",
    date: "August 5-7, 2023",
    location: "San Francisco, CA",
    isOnline: false,
    tags: ["Mobile", "iOS", "Android"],
    interested: true,
  },
  {
    id: "4",
    name: "Frontend Masters Hackathon",
    date: "June 22-24, 2023",
    location: "",
    isOnline: true,
    tags: ["React", "Vue", "UI/UX"],
    interested: false,
  },
  {
    id: "5",
    name: "Cloud Computing Challenge",
    date: "July 15-17, 2023",
    location: "Seattle, WA",
    isOnline: false,
    tags: ["AWS", "Azure", "Cloud"],
    interested: false,
  },
  {
    id: "6",
    name: "Open Source Contribution",
    date: "August 12-14, 2023",
    location: "",
    isOnline: true,
    tags: ["Open Source", "GitHub", "Community"],
    interested: false,
  },
  {
    id: "7",
    name: "Cybersecurity Hackathon",
    date: "September 9-11, 2023",
    location: "Boston, MA",
    isOnline: false,
    tags: ["Security", "Ethical Hacking", "Networking"],
    interested: false,
  },
  {
    id: "8",
    name: "Game Development Jam",
    date: "July 29-31, 2023",
    location: "",
    isOnline: true,
    tags: ["Unity", "Unreal Engine", "Game Design"],
    interested: false,
  },
];

export default function HackathonsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState<
    "all" | "online" | "in-person"
  >("all");
  const [activeTab, setActiveTab] = useState<"interested" | "upcoming">(
    "interested"
  );

  const interestedHackathons = hackathons.filter((h) => h.interested);
  const upcomingHackathons = hackathons.filter((h) => !h.interested);

  const filterHackathons = (hackathonList: typeof hackathons) => {
    return hackathonList.filter((hackathon) => {
      // Search filter
      if (
        searchTerm &&
        !hackathon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !hackathon.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ) {
        return false;
      }

      // Location filter
      if (locationFilter === "online" && !hackathon.isOnline) {
        return false;
      }
      if (locationFilter === "in-person" && hackathon.isOnline) {
        return false;
      }

      return true;
    });
  };

  const filteredInterested = filterHackathons(interestedHackathons);
  const filteredUpcoming = filterHackathons(upcomingHackathons);

  const handleTabChange = (value: string) => {
    setActiveTab(value as "interested" | "upcoming");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hackathons</h1>
        <p className="text-muted-foreground">
          Discover upcoming hackathons and manage your interests.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search hackathons..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Select
          value={locationFilter}
          onValueChange={(value) =>
            setLocationFilter(value as "all" | "online" | "in-person")
          }
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All locations</SelectItem>
            <SelectItem value="online">Online only</SelectItem>
            <SelectItem value="in-person">In-person only</SelectItem>
          </SelectContent>
        </Select>

        <Button className="gap-2" asChild>
          <Link href="/dashboard/hackathons/add">
            <Plus className="h-4 w-4" />
            Add Hackathon
          </Link>
        </Button>
      </div>

      <Tabs
        defaultValue="interested"
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="interested">
            My Interests ({filteredInterested.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming ({filteredUpcoming.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="interested" className="space-y-4">
          {filteredInterested.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredInterested.map((hackathon) => (
                <HackathonCard
                  key={hackathon.id}
                  id={hackathon.id}
                  name={hackathon.name}
                  date={hackathon.date}
                  location={hackathon.location}
                  isOnline={hackathon.isOnline}
                  tags={hackathon.tags}
                  interested={hackathon.interested}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No interested hackathons found</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  {searchTerm || locationFilter !== "all"
                    ? "Try adjusting your filters to see more hackathons."
                    : "You haven't expressed interest in any hackathons yet. Browse the upcoming hackathons to find events that interest you."}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {filteredUpcoming.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredUpcoming.map((hackathon) => (
                <HackathonCard
                  key={hackathon.id}
                  id={hackathon.id}
                  name={hackathon.name}
                  date={hackathon.date}
                  location={hackathon.location}
                  isOnline={hackathon.isOnline}
                  tags={hackathon.tags}
                  interested={hackathon.interested}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No upcoming hackathons found</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  {searchTerm || locationFilter !== "all"
                    ? "Try adjusting your filters to see more hackathons."
                    : "There are no upcoming hackathons at the moment. Check back later or add a hackathon yourself."}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
