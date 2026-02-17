"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Linkedin } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const WATERMARK_TEXT = "AccelerateSkillsLab";
const MEASURE_FONT_SIZE_PX = 100;

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [fontSizePx, setFontSizePx] = useState<number | null>(null);

  useEffect(() => {
    function updateFontSize() {
      const measure = measureRef.current;
      if (!measure) return;
      // Use viewport width so the watermark always spans the full screen
      const viewportWidth =
        typeof window !== "undefined" ? window.innerWidth : 0;
      const textWidth = measure.getBoundingClientRect().width;
      if (viewportWidth > 0 && textWidth > 0) {
        // Slight safety factor to avoid subpixel clipping at edges
        const targetWidth = viewportWidth * 0.99;
        const scale = targetWidth / textWidth;
        setFontSizePx(MEASURE_FONT_SIZE_PX * scale);
      }
    }

    updateFontSize();
    window.addEventListener("resize", updateFontSize);
    const ro = new ResizeObserver(updateFontSize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => {
      window.removeEventListener("resize", updateFontSize);
      ro.disconnect();
    };
  }, []);

  return (
    <footer
      className="relative overflow-hidden border-t border-white/10"
      //   style={{
      //     background:
      //       "linear-gradient(180deg, #0d1117 0%, #0a0e14 100%)",
      //   }}
    >
      <div className="container mx-auto px-4 sm:px-8 lg:px-20 py-16 relative z-10">
        {/* Top Section - Brand & Tagline */}
        <div className="mb-12">
          <Link href="/" className="inline-block mb-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Accelerate Skills Lab
            </h2>
          </Link>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl">
            Future of Learning.
          </p>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12 mb-16 lg:mb-28">
          {/* Programs Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Programs
            </h3>
            <nav className="space-y-3">
              <Link
                href="/courses/data-analytics"
                className="block text-white/70 hover:text-white transition-colors text-sm"
              >
                Data Analytics
              </Link>
              <Link
                href="/courses/data-engineering"
                className="block text-white/70 hover:text-white transition-colors text-sm"
              >
                Data Engineering
              </Link>
              <a
                href="#"
                className="block text-white/50 text-sm cursor-not-allowed"
              >
                More Programs (Coming Soon)
              </a>
            </nav>
          </div>

          {/* Why Us Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Why Us
            </h3>
            <nav className="space-y-3">
              <a
                href="/#why-choose"
                className="block text-white/70 hover:text-white transition-colors text-sm"
              >
                Why Choose Us
              </a>
              <a
                href="/#job-ready"
                className="block text-white/70 hover:text-white transition-colors text-sm"
              >
                Job-Ready Training
              </a>
            </nav>
          </div>

          {/* Company Column — below 425px: after Connect; from mobile-l/sm: normal (3rd) */}
          <div className="order-4 mobile-l:order-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <nav className="space-y-3">
              {/* <a
                href="#"
                className="block text-white/50 text-sm cursor-not-allowed"
              >
                About Us
              </a> */}
              <a
                href="/#contact"
                className="block text-white/70 hover:text-white transition-colors text-sm"
              >
                Contact Us
              </a>
              {/* <a
                href="#"
                className="block text-white/50 text-sm cursor-not-allowed"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="block text-white/50 text-sm cursor-not-allowed"
              >
                Terms of Service
              </a> */}
            </nav>
          </div>

          {/* Connect Column — below 425px: before Company; from mobile-l/sm: normal (4th) */}
          <div className="order-3 mobile-l:order-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="space-y-4">
              <a
                href="tel:+918106721085"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm group"
              >
                <Phone
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>+91 8106721085</span>
              </a>
              <a
                href="mailto:asl@accelerateskillslab.com"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm group"
              >
                <Mail
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>asl@accelerateskillslab.in</span>
              </a>
              <div className="flex items-start gap-2 text-white/70 text-sm group">
                <MapPin
                  size={16}
                  className="shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                />
                <span>
                  Unit 7, 15th Floor Aurora Waterfront, C Block, Salt Lake,
                  Sector V, Kolkata - 700091
                </span>
              </div>
              {/* <div className="flex items-center gap-3 ">
                <a
                  href="https://www.linkedin.com/company/accelerate-skills-lab/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-end gap-2 text-base text-white/70 hover:text-white hover:scale-105 transition-all"
                >
                  <Linkedin size={16} className="shrink-0" />
                  <span className="leading-none">LinkedIn</span>
                </a>
              </div> */}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-end items-center gap-4">
            <div className=" text-white/60 text-sm">
              <p>
                &copy; {new Date().getFullYear()} AccelerateSkillsLab. All
                rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Watermark */}
      <div
        ref={containerRef}
        className="absolute -bottom-3 sm:-bottom-6 md:-bottom-10 lg:-bottom-12 xl:-bottom-16 2xl:-bottom-20 left-1/2 -translate-x-1/2 w-screen pointer-events-none overflow-hidden z-0"
      >
        <div className="relative w-full">
          {/* Hidden span for measuring text width at a known font size */}
          <span
            ref={measureRef}
            className="absolute font-bold whitespace-nowrap invisible pointer-events-none"
            style={{ fontSize: MEASURE_FONT_SIZE_PX }}
            aria-hidden
          >
            {WATERMARK_TEXT}
          </span>
          <p
            className="font-bold text-white/5 whitespace-nowrap leading-none"
            style={{
              fontSize:
                fontSizePx != null
                  ? `${fontSizePx}px`
                  : "clamp(2rem, 8vw, 12rem)",
              textShadow: "0 0 40px rgba(255, 255, 255, 0.1)",
            }}
          >
            {WATERMARK_TEXT}
          </p>
        </div>
      </div>
    </footer>
  );
}
