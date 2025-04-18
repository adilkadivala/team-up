"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  skill: string;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

export function SkillBadge({
  skill,
  className,
  onClick,
  selected,
}: SkillBadgeProps) {
  return (
    <Badge
      className={cn(
        "cursor-pointer hover:bg-primary/80",
        selected && "bg-primary text-primary-foreground",
        !selected && "bg-secondary text-secondary-foreground",
        className
      )}
      onClick={onClick}
    >
      {skill}
    </Badge>
  );
}
