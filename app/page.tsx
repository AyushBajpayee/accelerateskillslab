import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HonestSection } from "@/components/sections/HonestSection";
import { Navbar } from "@/components/sections/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Hero />
      <HonestSection />
      <Features />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
