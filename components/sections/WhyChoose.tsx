"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import {
  Video,
  BookOpen,
  FlaskConical,
  MessageCircleQuestion,
  FolderGit2,
  BriefcaseBusiness,
  BadgeDollarSign,
  type LucideIcon,
} from "lucide-react";
import "./WhyChooseBento.css";

/* ────────────────────────── types & data ────────────────────────── */

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  gridClass?: string;
}

const features: FeatureCard[] = [
  {
    icon: Video,
    title: "Live Classes",
    description:
      "Thrive in a vibrant learning environment with live classes that foster interaction and immersive learning.",
    gridClass: "xl:col-span-1 xl:row-span-2",
  },
  {
    icon: BookOpen,
    title: "Industry Based Curriculum",
    description:
      "Dive deep with a meticulously crafted curriculum that navigates the realms of data science with precision and clarity.",
    gridClass: "xl:col-span-2 xl:row-span-1",
  },
  {
    icon: FlaskConical,
    title: "Hands-On Practical Training",
    description:
      "Immerse yourself with tasks, quizzes, and projects following each topic, ensuring that theory marries practice seamlessly.",
    gridClass: "xl:col-span-1 xl:row-span-2",
  },
  {
    icon: MessageCircleQuestion,
    title: "Robust Doubt Support",
    description:
      "Erase uncertainties with robust doubt support, turning every question into a stepping stone toward mastery.",
    gridClass: "xl:col-span-1 xl:row-span-1",
  },
  {
    icon: FolderGit2,
    title: "Real-Time Projects",
    description:
      "Elevate your expertise with real-time projects that propel your practical understanding into the professional universe.",
    gridClass: "xl:col-span-1 xl:row-span-1",
  },
  {
    icon: BriefcaseBusiness,
    title: "Dedicated Job Preparation",
    description:
      "Harness the power of strategic job preparation that polishes your profile and preps you for your dream job.",
    gridClass: "xl:col-span-2 xl:row-span-1",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Fee Structure",
    description:
      "Unlock a treasure trove of knowledge without breaking the bank, with fees that champion affordability and value.",
    gridClass: "xl:col-span-2 xl:row-span-1",
  },
];

/* ────────────────────── framer‑motion variants ─────────────────── */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ───────────────────── constants ────────────────────────────────── */

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const GLOW_COLOR = "39, 86, 247"; // Datalumina blue
const MOBILE_BREAKPOINT = 768;

/* ───────────────────── helpers ──────────────────────────────────── */

const createParticleElement = (
  x: number,
  y: number,
  color: string = GLOW_COLOR,
): HTMLDivElement => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position:absolute;width:4px;height:4px;border-radius:50%;
    background:rgba(${color},1);box-shadow:0 0 6px rgba(${color},0.6);
    pointer-events:none;z-index:100;left:${x}px;top:${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number,
) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

/* ───────────────────── useMobileDetection ──────────────────────── */

function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

/* ───────────────────── ParticleCard ────────────────────────────── */

interface ParticleCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disableAnimations?: boolean;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

function ParticleCard({
  children,
  className = "",
  style,
  disableAnimations = false,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = GLOW_COLOR,
  enableTilt = false,
  clickEffect = true,
  enableMagnetism = true,
}: ParticleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  /* ── initialise particle pool ── */
  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor,
      ),
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  /* ── clear particles ── */
  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach((p) => {
      gsap.to(p, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          p.parentNode?.removeChild(p);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  /* ── spawn particles ── */
  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();

    memoizedParticles.current.forEach((particle, i) => {
      const id = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current!.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
        );
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, i * 100);
      timeoutsRef.current.push(id);
    });
  }, [initializeParticles]);

  /* ── mouse / click listeners ── */
  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const el = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt) {
        gsap.to(el, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt)
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      if (enableMagnetism)
        gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      if (enableTilt) {
        gsap.to(el, {
          rotateX: ((y - cy) / cy) * -10,
          rotateY: ((x - cx) / cx) * 10,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
      if (enableMagnetism) {
        magnetismAnimationRef.current = gsap.to(el, {
          x: (x - cx) * 0.05,
          y: (y - cy) * 0.05,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDist = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position:absolute;width:${maxDist * 2}px;height:${maxDist * 2}px;
        border-radius:50%;pointer-events:none;z-index:1000;
        background:radial-gradient(circle,rgba(${glowColor},0.4) 0%,rgba(${glowColor},0.2) 30%,transparent 70%);
        left:${x - maxDist}px;top:${y - maxDist}px;
      `;
      el.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        },
      );
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
  ]);

  return (
    <div
      ref={cardRef}
      className={`particle-container ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/* ───────────────────── GlobalSpotlight ─────────────────────────── */

interface GlobalSpotlightProps {
  gridRef: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}

function GlobalSpotlight({
  gridRef,
  disabled = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = GLOW_COLOR,
}: GlobalSpotlightProps) {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disabled || !gridRef?.current) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position:fixed;width:800px;height:800px;border-radius:50%;
      pointer-events:none;z-index:200;opacity:0;
      transform:translate(-50%,-50%);mix-blend-mode:screen;
      background:radial-gradient(circle,
        rgba(${glowColor},0.15) 0%,rgba(${glowColor},0.08) 15%,
        rgba(${glowColor},0.04) 25%,rgba(${glowColor},0.02) 40%,
        rgba(${glowColor},0.01) 65%,transparent 70%);
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const inside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll(".magic-bento-card");

      if (!inside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        cards.forEach((c) =>
          (c as HTMLElement).style.setProperty("--glow-intensity", "0"),
        );
        return;
      }

      const { proximity, fadeDistance } =
        calculateSpotlightValues(spotlightRadius);
      let minDist = Infinity;

      cards.forEach((card) => {
        const el = card as HTMLElement;
        const cr = el.getBoundingClientRect();
        const cx = cr.left + cr.width / 2;
        const cy = cr.top + cr.height / 2;
        const dist =
          Math.hypot(e.clientX - cx, e.clientY - cy) -
          Math.max(cr.width, cr.height) / 2;
        const eff = Math.max(0, dist);
        minDist = Math.min(minDist, eff);

        let glow = 0;
        if (eff <= proximity) glow = 1;
        else if (eff <= fadeDistance)
          glow = (fadeDistance - eff) / (fadeDistance - proximity);

        updateCardGlowProperties(
          el,
          e.clientX,
          e.clientY,
          glow,
          spotlightRadius,
        );
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOp =
        minDist <= proximity
          ? 0.8
          : minDist <= fadeDistance
            ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOp,
        duration: targetOp > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gridRef.current
        ?.querySelectorAll(".magic-bento-card")
        .forEach((c) =>
          (c as HTMLElement).style.setProperty("--glow-intensity", "0"),
        );
      if (spotlightRef.current)
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disabled, spotlightRadius, glowColor]);

  return null;
}

/* ───────────────────── WhyChoose (main export) ─────────────────── */

const AUTO_SCROLL_INTERVAL = 2500;
const AUTO_SCROLL_RESUME_DELAY = 3000;

export function WhyChoose() {
  const gridRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();

  /* ── carousel state ── */
  const [activeIndex, setActiveIndex] = useState(0);
  const autoScrollPaused = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── scroll to a specific card index ── */
  const scrollToIndex = useCallback((index: number) => {
    const container = carouselRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement | undefined;
    if (child) {
      // Use scrollTo on the container instead of scrollIntoView to avoid
      // the browser scrolling the entire page to this section.
      container.scrollTo({
        left: child.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
    }
  }, []);

  /* ── track which card is currently visible via scroll position ── */
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      // Each card is full-width; account for gap (16px = gap-4)
      const slideWidth = containerWidth + 16;
      const index = Math.round(scrollLeft / slideWidth);
      setActiveIndex(Math.min(Math.max(0, index), features.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── auto-scroll ── */
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      if (autoScrollPaused.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % features.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [isMobile, scrollToIndex]);

  /* ── pause auto-scroll on touch, resume after delay ── */
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const pause = () => {
      autoScrollPaused.current = true;
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };

    const resume = () => {
      resumeTimeoutRef.current = setTimeout(() => {
        autoScrollPaused.current = false;
      }, AUTO_SCROLL_RESUME_DELAY);
    };

    container.addEventListener("touchstart", pause, { passive: true });
    container.addEventListener("touchend", resume, { passive: true });

    return () => {
      container.removeEventListener("touchstart", pause);
      container.removeEventListener("touchend", resume);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  return (
    <section id="why-choose" className="py-10 lg:py-20 bento-section">
      <div className="container mx-auto px-4 sm:px-8 lg:px-20">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-regular sm:text-4xl lg:text-5xl text-center mb-4"
        >
          <span className="font-bold">Why choose</span>{" "}
          <span
            className="italic"
            style={{ fontFamily: '"IBM Plex Serif", serif' }}
          >
            our
          </span>{" "}
          <span className="text-primary font-bold">Zero-to-Hero </span>
          <span className="font-bold">Bootcamps ?</span>{" "}
        </motion.h2>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="text-base sm:text-lg lg:text-xl text-muted-foreground text-center mb-14 lg:mb-20 max-w-3xl mx-auto"
        >
          Breaking into data engineering careers shouldn&apos;t feel this hard.
        </motion.p>

        {/* Spotlight (renders nothing visually, just attaches listeners) */}
        <GlobalSpotlight gridRef={gridRef} disabled={isMobile} />

        {/* ── Mobile Carousel ── */}
        <div className="sm:hidden">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="w-full shrink-0 snap-center"
                >
                  <div className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-white/5 bg-[#111827] h-full">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    {/* Title */}
                    <h3 className="text-sm font-bold tracking-wide uppercase text-white">
                      {feature.title}
                    </h3>
                    {/* Description */}
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dot navigation */}
          <div className="flex justify-center gap-2 mt-4">
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  scrollToIndex(i);
                  setActiveIndex(i);
                  autoScrollPaused.current = true;
                  if (resumeTimeoutRef.current)
                    clearTimeout(resumeTimeoutRef.current);
                  resumeTimeoutRef.current = setTimeout(() => {
                    autoScrollPaused.current = false;
                  }, AUTO_SCROLL_RESUME_DELAY);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "bg-primary w-4" : "bg-white/20"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop Bento Grid ── */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="hidden sm:grid sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-5 auto-rows-auto"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                className={feature.gridClass ?? ""}
              >
                <ParticleCard
                  className={`magic-bento-card magic-bento-card--border-glow group relative flex flex-col items-center text-center gap-4 p-6 xl:p-8 rounded-2xl border border-white/5 bg-[#111827] hover:border-primary/20 transition-colors duration-300 h-full`}
                  disableAnimations={isMobile}
                  glowColor={GLOW_COLOR}
                  enableTilt={false}
                  enableMagnetism={true}
                  clickEffect={true}
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors duration-300 relative z-10">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold tracking-wide uppercase text-white relative z-10">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-muted-foreground relative z-10">
                    {feature.description}
                  </p>
                </ParticleCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
