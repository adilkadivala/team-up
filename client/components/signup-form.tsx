"use client";

import { cn, handleInput } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const server_api = process.env.NEXT_PUBLIC_SERVER_API;

export function SignUpForm({
  className,
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(`${server_api}/register`, {
        ...userData,
      });

      if (response.status === 200) {
        toast.success("profile saved successfully");
        setUserData({
          name: "",
          email: "",
          password: "",
        });

        localStorage.setItem("accessToken", response?.data?.accessToken);
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">SignUp to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your credintials to SignUp
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="name"
            name="name"
            placeholder="Jhon Dow"
            value={userData.name}
            onChange={(e) => handleInput(e, setUserData)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="JhonDow@example.com"
            value={userData.email}
            onChange={(e) => handleInput(e, setUserData)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Jhon@12#$5"
            value={userData.password}
            onChange={(e) => handleInput(e, setUserData)}
          />
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Signing..." : "Sign up"}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
