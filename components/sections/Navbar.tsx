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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10",
        isScrolled && "backdrop-blur-md shadow-sm",
      )}
      style={{
        background:
          "radial-gradient(circle at center, #2756f7 0%, #1a3db8 50%, #0f2568 100%)",
      }}
    >
      <div className="px-4 py-2 sm:px-8 lg:px-20">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name: "A" + "ccelerate Skills Lab", logo-only on small screens */}
          <div className="shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center gap-0 sm:gap-0.5"
              aria-label="Accelerate Skills Lab"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center">
                <Image
                  src="/asl_logo.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="object-contain w-full h-full "
                  priority
                />
              </div>
              <span className="hidden sm:inline text-lg sm:text-xl font-bold text-white leading-tight align-middle">
                ccelerate Skills Lab
              </span>
            </Link>
          </div>

          {/* Right Side - Button */}
          <div className="flex items-center gap-4">
            <Link href="/#courses" className="inline-block">
              <HoverBorderGradient
                containerClassName="rounded-full hover:border-primary transition-colors duration-200"
                as="div"
                className="px-5 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-medium dark:bg-black bg-white text-black dark:text-white flex items-center justify-center"
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
