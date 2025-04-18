import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Globe } from "lucide-react";
import Link from "next/link";

interface HackathonCardProps {
  name: string;
  date: string;
  location: string;
  isOnline: boolean;
  tags: string[];
  id: string;
  interested?: boolean;
}

export function HackathonCard({
  name,
  date,
  location,
  isOnline,
  tags,
  id,
  interested = false,
}: HackathonCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
          </div>
          {interested && <Badge variant="secondary">Interested</Badge>}
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-center gap-2 text-sm">
          {isOnline ? (
            <>
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>Online</span>
            </>
          ) : (
            <>
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{location}</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/hackathons/${id}`}>Details</Link>
        </Button>
        <Button size="sm" variant={interested ? "destructive" : "default"}>
          {interested ? "Remove Interest" : "I'm Interested"}
        </Button>
      </CardFooter>
    </Card>
  );
}
