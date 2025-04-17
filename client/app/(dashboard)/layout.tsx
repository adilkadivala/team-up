import type React from "react";
import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team-Up - Find Your Perfect Hackathon Teammate",
  description:
    "Connect with skilled developers, designers, and innovators to build winning projects at hackathons worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
