"use client";

import { useRef, useState, useEffect, useId } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
  AnimatePresence,
} from "motion/react";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

interface JobReadyCard {
  title: string;
  subtitle: string;
  expandedDescription: string;
  accentColor: string;
  accentBg: string;
  imageSrc: string;
  benefits: string[];
}

const items: JobReadyCard[] = [
  {
    title: "Profile Building",
    subtitle: "Precision Profile Optimization",
    expandedDescription:
      "Stop being invisible to automated filters. We surgically reconstruct your profile to align with the exact search patterns used by top-tier tech recruiters. By highlighting your hands-on projects and technical DNA, we ensure your resume outperforms the generic competition and lands you in the interview room of your dream company.",
    accentColor: "text-rose-400",
    accentBg: "bg-rose-500/15",
    imageSrc: "/job-ready/job_2.png",
    benefits: [
      "ATS-optimized resume templates",
      "LinkedIn profile optimization",
      "Personal branding strategy",
      "Portfolio development guidance",
      "GitHub profile enhancement",
      "Professional networking strategies",
    ],
  },
  {
    title: "Interview Preparation",
    subtitle: "Precision Interview Mentorship",
    expandedDescription:
      "Master the art of the technical interview with coaching from the people who actually hire. We go beyond generic mock sessions to provide surgical feedback on your problem-solving logic and communication style. By practicing with our in-house recruitment experts, you'll learn the \"insider\" triggers that turn a standard interview into a confirmed job offer.",
    accentColor: "text-violet-400",
    accentBg: "bg-violet-500/15",
    imageSrc: "/job-ready/job_1.png",
    benefits: [
      "Master 200 critical interview questions",
      "Mock interviews with industry experts",
      "Personalized feedback and improvement plans",
      "Behavioral and technical question practice",
      "Real-time interview simulations",
      "Industry-specific preparation strategies",
    ],
  },
  {
    title: "Placement Assistance",
    subtitle: "The \"Accelerated Entry\" Approach",
    expandedDescription:
      "Your first career move shouldn't be a guessing game. We act as your personal career radar, scouting real-time job leads and market demands specifically suited for your skill level. By providing you with direct, verified opportunities from our recruitment network, we eliminate the noise of generic job portals and put you on the fast track to a confirmed offer.",
    accentColor: "text-sky-400",
    accentBg: "bg-sky-500/15",
    imageSrc: "/job-ready/job_3.png",
    benefits: [
      "Direct access to verified job opportunities",
      "Real-time market demand insights",
      "Personalized job matching",
      "Recruitment network connections",
      "Fast-track to confirmed offers",
      "Career guidance and support",
    ],
  },
  {
    title: "Our Dual-Mission Framework",
    subtitle: "ASL bridges the \"Last-Mile Gap\" with focused technical upskilling and strategic recruitment solutions.",
    expandedDescription:
      "For the Candidate: Our Instructor-Led Training (ILT) is designed to stress-test your logic, refine your technical DNA, and ensure you are Day-One ready for the global data economy.\n\nFor the Enterprise: We act as your internal talent factory. By leveraging our in-house HR wing and technical SMEs, we align our trainees and specialized external talent with your specific tech stack and business requirements.",
    accentColor: "text-emerald-400",
    accentBg: "bg-emerald-500/15",
    imageSrc: "/job-ready/job_1.png",
    benefits: [
      "Instructor-Led Training (ILT)",
      "Day-One readiness for global market",
      "In-house HR wing support",
      "Technical SME alignment",
      "Custom tech stack matching",
      "End-to-end talent solutions",
    ],
  },
];

function CloseIcon() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
}

function ExpandedJobCard({
  item,
  layoutId,
}: {
  item: JobReadyCard;
  layoutId: string;
}) {
  return (
    <motion.div
      layoutId={layoutId}
      className="w-full max-w-[800px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-[#111827] border border-white/10 sm:rounded-3xl overflow-hidden"
    >
      {/* Image */}
      <motion.div
        layoutId={`image-${item.title}-${layoutId}`}
        className="relative w-full overflow-hidden bg-[#0a0f1a]"
      >
        <Image
          src={item.imageSrc}
          alt={item.title}
          width={800}
          height={533}
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Header with Title & Subtitle */}
        <div>
          <motion.h3
            layoutId={`title-${item.title}-${layoutId}`}
            className={`text-2xl font-bold mb-2 ${item.accentColor}`}
          >
            {item.title}
          </motion.h3>
          <motion.p
            layoutId={`subtitle-${item.title}-${layoutId}`}
            className="text-lg font-semibold text-muted-foreground"
          >
            {item.subtitle}
          </motion.p>
        </div>

        {/* Expanded Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pt-4"
        >
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {item.expandedDescription}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function TiltedJobCard({
  item,
  index,
  onClick,
  layoutId,
}: {
  item: JobReadyCard;
  index: number;
  onClick: () => void;
  layoutId: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateAmplitude = 10;
  const scaleOnHover = 1.03;

  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.figure
      ref={ref}
      layoutId={layoutId}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1,
      }}
      className="relative w-full perspective-midrange cursor-pointer"
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      aria-label={`View details about ${item.title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="group relative flex flex-col items-center text-center gap-2 p-3 pb-4 rounded-2xl border border-white/5 bg-[#111827] hover:border-primary/20 transition-colors duration-300 h-full"
      >
        {/* Card Image */}
        <motion.div
          layoutId={`image-${item.title}-${layoutId}`}
          className="w-full overflow-hidden rounded-xl"
        >
          <Image
            src={item.imageSrc}
            alt={item.title}
            width={400}
            height={267}
            className="w-full aspect-3/2 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Title */}
        <motion.h3
          layoutId={`title-${item.title}-${layoutId}`}
          className={`text-base font-bold tracking-wide ${item.accentColor}`}
        >
          {item.title}
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          layoutId={`subtitle-${item.title}-${layoutId}`}
          className="text-sm leading-relaxed text-muted-foreground font-medium"
        >
          {item.subtitle}
        </motion.p>
      </motion.div>
    </motion.figure>
  );
}

export function JobReady() {
  const [active, setActive] = useState<(typeof items)[number] | null>(null);
  const id = useId();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(modalRef as React.RefObject<HTMLDivElement>, () =>
    setActive(null)
  );

  return (
    <section className="py-10 lg:py-20">
      <div className="container mx-auto px-4 sm:px-8 lg:px-20">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-regular sm:text-4xl lg:text-5xl text-center mb-4"
        >
          <span className="font-bold">Making you</span>{" "}
          <span
            className="italic"
            style={{ fontFamily: '"IBM Plex Serif", serif' }}
          >
            truly
          </span>{" "}
          <span className="text-primary font-bold">Job-Ready</span>
        </motion.h2>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="text-base sm:text-lg lg:text-xl text-muted-foreground text-center mb-14 lg:mb-20 max-w-3xl mx-auto"
        >
          ASL's Precision-Led Upskilling for the Modern Data Economy .
        </motion.p>

        {/* Modal Overlay */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
          )}
        </AnimatePresence>

        {/* Expanded Modal */}
        <AnimatePresence>
          {active && (
            <div className="fixed inset-0 grid place-items-center z-[101] p-4">
              {/* Close Button (Mobile) */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="absolute top-4 right-4 lg:hidden flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full h-10 w-10 border border-white/20 hover:bg-white/20 transition-colors z-[102]"
                onClick={() => setActive(null)}
                aria-label="Close modal"
              >
                <CloseIcon />
              </motion.button>

              {/* Expanded Card */}
              <div ref={modalRef} role="dialog" aria-modal="true">
                <ExpandedJobCard
                  item={active}
                  layoutId={`card-${active.title}-${id}`}
                />
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          {items.map((item, index) => (
            <TiltedJobCard
              key={item.title}
              item={item}
              index={index}
              onClick={() => setActive(item)}
              layoutId={`card-${item.title}-${id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
