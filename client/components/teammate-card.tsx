import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

interface TeammateCardProps {
  name: string;
  role: string;
  location: string;
  skills: string[];
  hackathons: string[];
  avatarUrl?: string;
  id: string;
}

export function TeammateCard({
  name,
  role,
  location,
  skills,
  hackathons,
  avatarUrl,
  id,
}: TeammateCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={avatarUrl || "/user.svg"}
            alt={name}
            className="dark:bg-foreground p-2"
          />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <h3 className="text-lg font-semibold leading-none">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div>
          <p className="text-sm font-medium mb-1">Location</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
        <div>
          <p className="text-sm font-medium mb-1">Skills</p>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-1">Interested Hackathons</p>
          <div className="flex flex-wrap gap-1">
            {hackathons.map((hackathon) => (
              <Badge key={hackathon} variant="outline" className="text-xs">
                {hackathon}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/profile/${id}`}>View Profile</Link>
        </Button>
        <Button size="sm" className="gap-1" asChild>
          <Link href={`/dashboard/messages/${id}`}>
            <MessageSquare className="h-4 w-4" />
            Message
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
