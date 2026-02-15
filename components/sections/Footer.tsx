import Link from "next/link";
import { Phone, Mail, Linkedin } from "lucide-react";

export function Footer() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16 lg:mb-28">
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
                Data Analytics Program
              </Link>
              <Link
                href="/courses/data-engineering"
                className="block text-white/70 hover:text-white transition-colors text-sm"
              >
                Data Engineering Program
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

          {/* Company Column */}
          <div>
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

          {/* Connect Column */}
          <div>
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
                href="mailto:hello@accelerateskillslab.com"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm group"
              >
                <Mail
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>hello@accelerateskillslab.in</span>
              </a>
              <div className="flex items-center gap-3 ">
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
              </div>
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
      <div className="absolute -bottom-24 left-0 right-0 pointer-events-none overflow-hidden z-0">
        <div className="relative">
          <p
            className="text-[12rem] sm:text-[16rem] lg:text-[20rem] font-bold text-white/5 whitespace-nowrap leading-none"
            style={{
              textShadow: "0 0 40px rgba(255, 255, 255, 0.1)",
            }}
          >
            AccelerateSkillsLab
          </p>
        </div>
      </div>
    </footer>
  );
}
