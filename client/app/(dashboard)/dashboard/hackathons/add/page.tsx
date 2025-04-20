"use client";

import type React from "react";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";

const server_api = process.env.NEXT_PUBLIC_SERVER_API;

export default function AddHackathonPage() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isOnline, setIsOnline] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [prizes, setPrizes] = useState<string[]>([]);
  const [newPrize, setNewPrize] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [createHackathon, setCreateHackathon] = useState({
    hackathonName: "",
    description: "",
    organizer: "",
    website: "",
    location: "",
  });

  // input handler
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCreateHackathon((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddPrize = () => {
    if (newPrize.trim() && !prizes.includes(newPrize.trim())) {
      setPrizes([...prizes, newPrize.trim()]);
      setNewPrize("");
    }
  };

  const handleRemovePrize = (prizeToRemove: string) => {
    setPrizes(prizes.filter((prize) => prize !== prizeToRemove));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${server_api}/create-hackathon`, {
        ...createHackathon,
        isOnline,
        location: isOnline ? "" : createHackathon.location,
        startDate,
        endDate,
        tags,
        prizes,
      });

      if (response.status === 200 || response.status === 201) {
        router.push("/dashboard/hackathons");
      } else {
        console.error("Error:", response.data);
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="cursor-pointer">
          <Link href="/dashboard/hackathons">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Hackathon</h1>
        <p className="text-muted-foreground">
          Create a new hackathon event for the community.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-6 ">
            <CardTitle>Hackathon Details</CardTitle>
            <CardDescription>
              Provide information about the hackathon event.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="hackathonName">Hackathon Name *</Label>
              <Input
                id="hackathonName"
                name="hackathonName"
                placeholder="Enter hackathon name"
                required
                value={createHackathon.hackathonName}
                onChange={handleInput}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the hackathon, its theme, and goals"
                className="min-h-[120px]"
                value={createHackathon.description}
                required
                onChange={handleInput}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="organizer">Organizer *</Label>
                <Input
                  id="organizer"
                  name="organizer"
                  placeholder="Organization hosting the event"
                  required
                  value={createHackathon.organizer}
                  onChange={handleInput}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  placeholder="https://example.com/hackathon"
                  type="url"
                  value={createHackathon.website}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is-online"
                  checked={isOnline}
                  onCheckedChange={(checked) => setIsOnline(!!checked)}
                />
                <Label htmlFor="is-online">This is an online hackathon</Label>
              </div>
            </div>

            {!isOnline && (
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, Country"
                  required={!isOnline}
                  value={createHackathon.location}
                  onChange={handleInput}
                  disabled={isOnline}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal cursor-pointer",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate
                        ? format(startDate, "PPP")
                        : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal cursor-pointer",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) =>
                        startDate ? date < startDate : false
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                  >
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 hover:bg-transparent cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {tag}</span>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag (e.g., AI, Web3, Mobile)"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddTag())
                  }
                />
                <Button
                  type="button"
                  onClick={handleAddTag}
                  className="cursor-pointer"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Prizes</Label>
              <div className="flex flex-col gap-2 mb-2">
                {prizes.map((prize, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-secondary/50 rounded-md px-3 py-2"
                  >
                    <span>{prize}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 cursor-pointer"
                      onClick={() => handleRemovePrize(prize)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove prize</span>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a prize (e.g., $5000 Grand Prize)"
                  value={newPrize}
                  onChange={(e) => setNewPrize(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddPrize())
                  }
                />
                <Button
                  type="button"
                  className="cursor-pointer"
                  onClick={handleAddPrize}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between space-y-6">
            <Button
              variant="outline"
              type="reset"
              asChild
              className="cursor-pointer"
            >
              <Link href="/dashboard/hackathons">Cancel</Link>
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? "Creating..." : "Create Hackathon"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
