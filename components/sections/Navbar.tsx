"use client";

import * as React from "react";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/10 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="font-bold text-2xl text-primary">
              AccelerateSkillsLab
            </Link>
          </div>

          {/* Right Side - Button */}
          <div className="flex items-center gap-4">
            <Link href="/#courses" className="inline-block">
              <HoverBorderGradient
                containerClassName="rounded-full hover:border-primary transition-colors duration-200"
                as="div"
                className="px-6 py-2.5 text-sm font-medium text-white flex items-center justify-center"
                innerStyle={{
                  background:
                    "radial-gradient(circle at center, #2756f7 0%, #1a3db8 50%, #0f2568 100%)",
                }}
              >
                Find Your Program
              </HoverBorderGradient>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
