import { About } from "@/components/sections/About";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { Partners } from "@/components/sections/Partners";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Hero />
      <Partners />
      <Features />
      <About />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
