"use client";

import type React from "react";

import { cn, handleInput } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { authStateChanged, useValidateUser } from "@/store/user-context";

const server_api = process.env.NEXT_PUBLIC_SERVER_API;

export function LoginForm({
  className,
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const userContext = useValidateUser();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | "">("");

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handlelogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${server_api}/login`, { ...userData });

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;

        if (accessToken) {
          // Store both tokens
          localStorage.setItem("accessToken", accessToken);

          if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
          }

          toast.success("User authenticated successfully");

          // Trigger context refresh
          authStateChanged();

          // If available, explicitly refresh the context
          if (userContext) {
            await userContext.refreshUserContext();
          }

          router.push("/dashboard");
        } else {
          toast.error("No token received");
        }
      }
    } catch (error: any) {
      if (error?.response?.status === 402) {
        setError(error?.response?.data.message);
        toast.info("please create account !!");
        router.push("/sign-up");
      } else if (error?.response?.status === 401) {
        toast.error(error?.response?.data?.message || "Authentication failed");

        // Try to refresh token
        try {
          const refresh = await axios.post(`${server_api}/refresh`, {
            email: userData.email,
            password: userData.password,
          });

          const { accessToken, refreshToken } = refresh.data;

          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            if (refreshToken) {
              localStorage.setItem("refreshToken", refreshToken);
            }

            toast.success("Token refreshed");

            // Trigger context refresh
            authStateChanged();

            // If available, explicitly refresh the context
            if (userContext) {
              await userContext.refreshUserContext();
            }

            router.push("/dashboard");
          }
        } catch (refreshError: any) {
          console.log(refreshError?.message);
          toast.error("Failed to refresh token. Please log in again.");
        }
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setUserData({
        email: "",
        password: "",
      });
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handlelogin}
      method="post"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        {!error ? (
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        ) : (
          <p className="text-rose-500">{error}</p>
        )}
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            name="email"
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
            value={userData.password}
            name="password"
            onChange={(e) => handleInput(e, setUserData)}
          />
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "compairing..." : "Login"}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
