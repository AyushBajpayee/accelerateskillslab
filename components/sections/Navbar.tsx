"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
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
      <div className="container mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-1.5">
              <div className="relative w-10 h-10  shrink-0">
                <Image
                  src="/mainLogo.png"
                  alt="AccelerateSkillsLab Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col -space-y-0.5">
                <span className="text-sm sm:text-base font-medium text-white leading-[1.25]">
                  Accelerate
                </span>
                <span className="text-lg sm:text-xl font-bold text-white leading-[1.25]">
                  SkillsLab
                </span>
              </div>
            </Link>
          </div>

          {/* Right Side - Button */}
          <div className="flex items-center gap-4">
            <Link href="/#courses" className="inline-block">
              <HoverBorderGradient
                containerClassName="rounded-full hover:border-primary transition-colors duration-200"
                as="div"
                className="px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-medium text-white flex items-center justify-center"
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
