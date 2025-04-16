import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Feature from "@/components/features";
import Workflow from "@/components/work-flow";
import GetReady from "@/components/get-ready";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col px-3">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Feature />
        <Workflow />
        <GetReady />
      </main>
      <Footer />
    </div>
  );
}
