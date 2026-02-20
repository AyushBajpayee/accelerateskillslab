"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX, Mail } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { cn } from "@/lib/utils";

const MOBILE_L_PX = 425;

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMobileLOrWider, setIsMobileLOrWider] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const check = () => setIsMobileLOrWider(window.innerWidth >= MOBILE_L_PX);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  React.useEffect(() => {
    const audio = new Audio("/audio/soft_ed_tech_music.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 navbar-gradient",
          isScrolled && "backdrop-blur-md shadow-sm",
        )}
      >
        <div className="px-4 py-2 sm:px-8 lg:px-20">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand Name: "A" + "ccelerate Skills Lab", logo-only on small screens */}
            <div className="shrink-0 flex items-center">
              <Link
                href="/"
                className="flex items-center"
                aria-label="Accelerate Skills Lab"
              >
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center">
                  <div className="absolute inset-0 -m-3 rounded-full pointer-events-none" />
                  <Image
                    src="/asl_logo2.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="relative object-contain object-center w-full h-full"
                    priority
                  />
                </div>
                <span className="inline text-lg sm:text-[1.325rem] font-bold text-[#00265f] leading-none mt-3">
                  ccelerate Skills Lab
                </span>
              </Link>
            </div>

            {/* Right Side - Button */}
            <div className="flex items-center">
              <Link
                href={`${pathname}#contact`}
                className="inline-block"
                aria-label="Contact Us"
              >
                <HoverBorderGradient
                  containerClassName="rounded-full hover:border-primary transition-colors duration-200 inline-flex"
                  as="div"
                  className="w-9 h-9 mobile-l:w-auto mobile-l:h-auto p-0 mobile-l:px-5 mobile-l:py-2.5 sm:px-7 text-sm font-medium dark:bg-black bg-white text-black dark:text-white flex items-center justify-center shrink-0"
                  innerStyle={
                    isMobileLOrWider
                      ? {
                          background:
                            "radial-gradient(circle at center, #2756f7 0%, #1a3db8 50%, #0f2568 100%)",
                        }
                      : undefined
                  }
                >
                  <Mail
                    className="w-4 h-4 sm:w-5 sm:h-5  shrink-0 mobile-l:hidden"
                    aria-hidden
                  />
                  <span className="hidden mobile-l:inline">Contact Us</span>
                </HoverBorderGradient>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Sound Toggle - Fixed bottom right */}
      <div className="group/sound fixed bottom-6 right-6 z-9999">
        <HoverBorderGradient
          containerClassName="rounded-full hover:border-primary transition-colors duration-200 shadow-lg shadow-black/20"
          as="button"
          className="w-11 h-11 sm:w-12 sm:h-12 dark:bg-black bg-white text-black dark:text-white flex items-center justify-center"
          onClick={toggleSound}
          aria-label={isPlaying ? "Sound Off" : "Sound On"}
          animating={isPlaying}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </HoverBorderGradient>
        {/* Tooltip */}
        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2.5 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover/sound:opacity-100">
          {isPlaying ? "Sound Off" : "Sound On"}
        </span>
      </div>
    </>
  );
}
