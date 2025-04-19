"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Trophy,
  Settings,
  UserCircle,
  LogOut,
  LogOutIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
[];

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "My Profile",
    href: "/dashboard/profile",
    icon: <UserCircle className="h-5 w-5" />,
  },
  {
    title: "Find Teammates",
    href: "/dashboard/browse",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Hackathons",
    href: "/dashboard/hackathons",
    icon: <Trophy className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useClerk();

  return (
    <div className="hidden md:flex flex-col h-screen w-64 border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <Users className="h-6 w-6" />
          <span>TeamMate</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 cursor-pointer"
          onClick={() => signOut({ redirectUrl: "/" })}
        >
          <LogOutIcon className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
