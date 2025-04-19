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

export default function ProfilePage() {
  // Mock data
  const userSkills = [
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
  ];
  const suggestedSkills = [
    "Next.js",
    "GraphQL",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Redux",
  ];
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

        <TabsContent value="info">
          <div className="grid gap-6">
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
                    <AvatarImage src="/user.svg" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button>Change Avatar</Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue="john.doe@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Role/Title</Label>
                      <Input id="role" defaultValue="Full Stack Developer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="San Francisco, CA" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      defaultValue="Full Stack Developer with 5 years of experience. Passionate about building web applications and participating in hackathons."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub Profile</Label>
                    <Input
                      id="github"
                      defaultValue="https://github.com/johndoe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      defaultValue="https://linkedin.com/in/johndoe"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

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
                    {userSkills.map((skill) => (
                      <Badge
                        key={skill}
                        className="flex items-center gap-1 pl-3"
                      >
                        {skill}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-transparent"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {skill}</span>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Add New Skills</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter a skill..." className="flex-1" />
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Suggested Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {suggestedSkills.map((skill) => (
                      <SkillBadge key={skill} skill={skill} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

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
                        <Button variant="destructive" size="sm">
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Add New Hackathon Interest</Label>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hackathon-name">Hackathon Name</Label>
                        <Input
                          id="hackathon-name"
                          placeholder="Enter hackathon name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hackathon-date">Date</Label>
                        <Input
                          id="hackathon-date"
                          placeholder="e.g., June 15-17, 2023"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hackathon-location">Location</Label>
                        <Input
                          id="hackathon-location"
                          placeholder="City, Country or Online"
                        />
                      </div>
                      <div className="flex items-center space-x-2 h-10 mt-8">
                        <input
                          type="checkbox"
                          id="is-online"
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
                <Button>
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
