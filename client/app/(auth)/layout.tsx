export const metadata = {
  title: "Team-Up",
  description:
    "Connect with skilled developers, designers, and innovators to build winning projects at hackathons worldwide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
