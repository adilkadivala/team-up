"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { useValidateUser } from "@/store/user-context";

export function UserNav() {
  const validUser = useValidateUser();
  if (!validUser) return null;
  const { isAuthenticated, currentUser, logout } = validUser;

  const fallbackAvtar = currentUser?.name;

  return (
    <div className="flex items-center gap-4">
      <ModeToggle />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full dark:bg-foreground"
          >
            <Avatar className="size-4">
              <AvatarImage src={"/user.svg"} alt="User" />
              <AvatarFallback>{fallbackAvtar}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {currentUser?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {currentUser?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 cursor-pointer"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
