"use client";

import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TeammateCard } from "@/components/teammate-card";
import { SkillBadge } from "@/components/skill-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock data
const allTeammates = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Frontend Developer",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    hackathons: ["HackSF 2023", "ReactConf Hackathon"],
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "UI/UX Designer",
    location: "Remote",
    skills: ["Figma", "UI Design", "User Research"],
    hackathons: ["DesignHack 2023", "UX Challenge"],
  },
  {
    id: "3",
    name: "Miguel Rodriguez",
    role: "Backend Developer",
    location: "Austin, TX",
    skills: ["Node.js", "Express", "MongoDB"],
    hackathons: ["API Hackathon", "Backend Challenge"],
  },
  {
    id: "4",
    name: "Priya Sharma",
    role: "Full Stack Developer",
    location: "New York, NY",
    skills: ["React", "Node.js", "PostgreSQL"],
    hackathons: ["Global AI Hackathon", "Full Stack Challenge"],
  },
  {
    id: "5",
    name: "David Kim",
    role: "Machine Learning Engineer",
    location: "Seattle, WA",
    skills: ["Python", "TensorFlow", "Data Science"],
    hackathons: ["AI Hackathon", "ML Challenge"],
  },
  {
    id: "6",
    name: "Emma Wilson",
    role: "Mobile Developer",
    location: "Remote",
    skills: ["React Native", "Swift", "Kotlin"],
    hackathons: ["Mobile App Hackathon", "Cross-Platform Challenge"],
  },
];

const allSkills = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Python",
  "TensorFlow",
  "Data Science",
  "UI Design",
  "UX Research",
  "Figma",
  "React Native",
  "Swift",
  "Kotlin",
  "AWS",
  "Docker",
  "GraphQL",
  "Next.js",
];

const allLocations = [
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Seattle, WA",
  "Remote",
];

const allHackathons = [
  "Global AI Hackathon",
  "Web3 Development Challenge",
  "HackSF 2023",
  "ReactConf Hackathon",
  "DesignHack 2023",
  "UX Challenge",
  "API Hackathon",
  "Backend Challenge",
  "Full Stack Challenge",
  "AI Hackathon",
  "ML Challenge",
  "Mobile App Hackathon",
  "Cross-Platform Challenge",
];

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedHackathon, setSelectedHackathon] = useState<string>("");
  const [remoteOnly, setRemoteOnly] = useState(false);

  // Filter teammates based on search and filters
  const filteredTeammates = allTeammates.filter((teammate) => {
    // Search term filter
    if (
      searchTerm &&
      !teammate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !teammate.role.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Skills filter
    if (
      selectedSkills.length > 0 &&
      !selectedSkills.some((skill) => teammate.skills.includes(skill))
    ) {
      return false;
    }

    // Location filter
    if (selectedLocation && teammate.location !== selectedLocation) {
      return false;
    }

    // Remote only filter
    if (remoteOnly && teammate.location !== "Remote") {
      return false;
    }

    // Hackathon filter
    if (selectedHackathon && !teammate.hackathons.includes(selectedHackathon)) {
      return false;
    }

    return true;
  });

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const clearFilters = () => {
    setSelectedSkills([]);
    setSelectedLocation("");
    setSelectedHackathon("");
    setRemoteOnly(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Find Teammates</h1>
        <p className="text-muted-foreground">
          Search for potential teammates based on skills, location, and
          hackathon interests.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or role..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:w-auto w-full gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {(selectedSkills.length > 0 ||
                selectedLocation ||
                selectedHackathon ||
                remoteOnly) && (
                <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
                  {selectedSkills.length +
                    (selectedLocation ? 1 : 0) +
                    (selectedHackathon ? 1 : 0) +
                    (remoteOnly ? 1 : 0)}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Teammates</SheetTitle>
              <SheetDescription>
                Narrow down your search with specific criteria.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 py-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Skills</Label>
                  {selectedSkills.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedSkills([])}
                    >
                      Clear ({selectedSkills.length})
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map((skill) => (
                    <SkillBadge
                      key={skill}
                      skill={skill}
                      selected={selectedSkills.includes(skill)}
                      onClick={() => toggleSkill(skill)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any location</SelectItem>
                    {allLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="remote-only"
                    checked={remoteOnly}
                    onCheckedChange={(checked) =>
                      setRemoteOnly(checked as boolean)
                    }
                  />
                  <Label htmlFor="remote-only">Remote only</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Hackathon Interest</Label>
                <Select
                  value={selectedHackathon}
                  onValueChange={setSelectedHackathon}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hackathon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any hackathon</SelectItem>
                    {allHackathons.map((hackathon) => (
                      <SelectItem key={hackathon} value={hackathon}>
                        {hackathon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={clearFilters}
                variant="outline"
                className="w-full"
              >
                Clear All Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active filters display */}
      {(selectedSkills.length > 0 ||
        selectedLocation ||
        selectedHackathon ||
        remoteOnly) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedSkills.map((skill) => (
            <Badge key={skill} className="flex items-center gap-1 pl-3">
              {skill}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 hover:bg-transparent"
                onClick={() => toggleSkill(skill)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {skill}</span>
              </Button>
            </Badge>
          ))}
          {selectedLocation && (
            <Badge className="flex items-center gap-1 pl-3">
              Location: {selectedLocation}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 hover:bg-transparent"
                onClick={() => setSelectedLocation("")}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove location filter</span>
              </Button>
            </Badge>
          )}
          {remoteOnly && (
            <Badge className="flex items-center gap-1 pl-3">
              Remote only
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 hover:bg-transparent"
                onClick={() => setRemoteOnly(false)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove remote only filter</span>
              </Button>
            </Badge>
          )}
          {selectedHackathon && (
            <Badge className="flex items-center gap-1 pl-3">
              Hackathon: {selectedHackathon}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 hover:bg-transparent"
                onClick={() => setSelectedHackathon("")}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove hackathon filter</span>
              </Button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="ml-auto"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Found {filteredTeammates.length} potential teammates
      </div>

      {/* Results grid */}
      {filteredTeammates.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTeammates.map((teammate) => (
            <TeammateCard
              key={teammate.id}
              id={teammate.id}
              name={teammate.name}
              role={teammate.role}
              location={teammate.location}
              skills={teammate.skills}
              hackathons={teammate.hackathons}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No matches found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Try adjusting your filters or search term to find more teammates.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
