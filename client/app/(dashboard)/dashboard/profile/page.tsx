"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SkillBadge } from "@/components/skill-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Globe, Calendar, Plus, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { handleInput } from "@/lib/utils";
import { useValidateUser } from "@/store/user-context";

const server_api = process.env.NEXT_PUBLIC_SERVER_API;

type Hackathon = {
  hackathonName: string;
  hackathonDate: string;
  hackathonLocation: string;
  isOnline: boolean;
};
type User = {
  name: string;
  email: string;
  role: string;
  location: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
};

export default function ProfilePage() {
  const validUser = useValidateUser();
  if (!validUser) return null;
  const { currentUser, getUserData } = validUser;

  const fallbackAvtar = currentUser?.name;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [hackathon, setHackathon] = useState<Hackathon>({
    hackathonName: "",
    hackathonDate: "",
    hackathonLocation: "",
    isOnline: false,
  });

  console.log(hackathon);

  const addHackathon = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${server_api}/get-hackathon/:id/interest`,
        {
          ...hackathon,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Skills saved successfully");
      }
    } catch (error: any) {
      toast.error("Error saving skills: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [userData, setUserData] = useState<User>({
    name: "",
    email: "",
    role: "",
    location: "",
    bio: "",
    githubUrl: "",
    linkedinUrl: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUserData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        role: currentUser.role || "",
        location: currentUser.location || "",
        bio: currentUser.bio || "",
        githubUrl: currentUser.githubUrl || "",
        linkedinUrl: currentUser.linkedinUrl || "",
      });
    }
  }, [currentUser]);

  const [userSkill, setUserSkill] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState<string>("");

  const handleAddSkill = () => {
    const trimmedSkill = JSON.stringify(newSkill.trim().toLowerCase());
    if (trimmedSkill === "") {
      toast.error("Please enter a skill");
      return;
    }
    if (userSkill.some((skill) => skill.toLowerCase() === trimmedSkill)) {
      // Check for duplicates (case-insensitive)
      toast.dismiss("Skill already added");
      return;
    }
    setUserSkill([...userSkill, newSkill.trim()]);
    setNewSkill(""); // Clear input after adding skill
  };

  const handleRemoveSkill = (skill: string) => {
    setUserSkill(userSkill.filter((s) => s !== skill));
    toast.success("Skill removed locally");
  };

  // submit profile
  const completeProfile = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    console.log(token);
    try {
      const response = await axios.post(
        `${server_api}/profile`,
        {
          ...userData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response?.data);

      if (response.status === 200) {
        toast.success("profile saved successfully");
        setUserData({
          name: "",
          email: "",
          role: "",
          location: "",
          bio: "",
          githubUrl: "",
          linkedinUrl: "",
        });
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // handle skills
  const saveSkills = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${server_api}/profile`,
        {
          skills: userSkill,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Skills saved successfully");
      }
    } catch (error: any) {
      toast.error("Error saving skills: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const userHackathons = [
    {
      name: "Global AI Hackathon",
      date: "June 15-17, 2023",
      location: "New York, NY",
      isOnline: false,
    },
    {
      name: "Web3 Development Challenge",
      date: "July 8-10, 2023",
      location: "",
      isOnline: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile information, skills, and hackathon interests.
        </p>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="info">Basic Info</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
        </TabsList>

        {/* basic info */}
        <TabsContent value="info">
          <div className="grid gap-6">
            <form onSubmit={completeProfile}>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={"/user.svg"}
                        alt="Profile"
                        className="dark:bg-foreground p-2.5"
                      />
                      <AvatarFallback>{fallbackAvtar}</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={userData.name}
                          onChange={(e) => handleInput(e, setUserData)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          placeholder="john.doe@example.com"
                          onChange={(e) => handleInput(e, setUserData)}
                          value={userData.email}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="role">Role/Title</Label>
                        <Input
                          id="role"
                          name="role"
                          placeholder="Full Stack Developer"
                          onChange={(e) => handleInput(e, setUserData)}
                          value={userData.role}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="San Francisco, CA"
                          onChange={(e) => handleInput(e, setUserData)}
                          value={userData.location}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        onChange={(e) => handleInput(e, setUserData)}
                        value={userData.bio}
                        rows={4}
                        placeholder="Full Stack Developer with 5 years of experience. Passionate about building web applications and participating in hackathons."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="githubUrl">GitHub Profile</Label>
                      <Input
                        id="githubUrl"
                        name="githubUrl"
                        onChange={(e) => handleInput(e, setUserData)}
                        value={userData.githubUrl}
                        placeholder="https://github.com/johndoe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
                      <Input
                        id="linkedinUrl"
                        name="linkedinUrl"
                        onChange={(e) => handleInput(e, setUserData)}
                        value={userData.linkedinUrl}
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="cursor-pointer"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>
        </TabsContent>
        {/* basic info */}

        {/* skill info */}
        <TabsContent value="skills">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>My Skills</CardTitle>
                <CardDescription>
                  Add or remove skills to help others find you for hackathons.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Your Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {userSkill.map((skill) => (
                      <Badge
                        key={skill}
                        className="flex items-center gap-1 pl-3"
                      >
                        {skill}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-transparent"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {skill}</span>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userSkill">Add New Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter a skill..."
                      className="flex-1"
                      name="userSkill"
                      value={newSkill}
                      onChange={(e) => handleInput(e, setNewSkill)}
                    />
                    <Button onClick={handleAddSkill} className="cursor-pointer">
                      <Plus className="h-4 w-4 mr-2 " />
                      Add
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="default"
                    className="cursor-pointer"
                    onClick={saveSkills}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* hackathon */}
        <TabsContent value="hackathons">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hackathon Interests</CardTitle>
                <CardDescription>
                  Manage hackathons you're interested in participating.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Your Hackathon Interests</Label>
                  <div className="space-y-4">
                    {userHackathons.map((hackathon, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{hackathon.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{hackathon.date}</span>
                            {hackathon.isOnline ? (
                              <Globe className="h-4 w-4 ml-2" />
                            ) : (
                              <MapPin className="h-4 w-4 ml-2" />
                            )}
                            <span>
                              {hackathon.isOnline
                                ? "Online"
                                : hackathon.location}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="cursor-pointer"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="space-y-2">
                    Add New Hackathon Interest
                  </Label>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hackathonName">Hackathon Name</Label>
                        <Input
                          id="hackathonName"
                          name="hackathonName"
                          value={hackathon.hackathonName}
                          onChange={(e) => handleInput(e, setHackathon)}
                          placeholder="Enter hackathon name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hackathonDate">Date</Label>
                        <Input
                          id="hackathonDate"
                          name="hackathonDate"
                          value={hackathon.hackathonDate}
                          onChange={(e) => handleInput(e, setHackathon)}
                          placeholder="e.g., June 15-17, 2023"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hackathonLocation">Location</Label>
                        <Input
                          id="hackathonLocation"
                          name="hackathonLocation"
                          value={hackathon.hackathonLocation}
                          onChange={(e) => handleInput(e, setHackathon)}
                          placeholder="City, Country or Online"
                        />
                      </div>
                      <div className="flex items-center space-x-2 h-10 mt-8">
                        <input
                          type="checkbox"
                          id="is-online"
                          name="isOnline"
                          checked={hackathon.isOnline}
                          onChange={(e) => handleInput(e, setHackathon)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="is-online">
                          This is an online hackathon
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="cursor-pointer" onClick={addHackathon}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Hackathon
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
