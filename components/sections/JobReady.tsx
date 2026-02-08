"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from "motion/react";
import Image from "next/image";

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

interface JobReadyCard {
  title: string;
  description: string;
  accentColor: string;
  accentBg: string;
  imageSrc: string;
}

const items: JobReadyCard[] = [
  {
    title: "Interview Preparation",
    description:
      "Dedicated interview prep of the 200 most important interview questions.",
    accentColor: "text-violet-400",
    accentBg: "bg-violet-500/15",
    imageSrc: "/job-ready/job_1.png",
  },
  {
    title: "Profile Building",
    description:
      "Dedicated sessions on resume building, LinkedIn branding, etc.",
    accentColor: "text-rose-400",
    accentBg: "bg-rose-500/15",
    imageSrc: "/job-ready/job_2.png",
  },
  {
    title: "Industry Connect",
    description:
      "Guest lectures by people from the industry each month.",
    accentColor: "text-sky-400",
    accentBg: "bg-sky-500/15",
    imageSrc: "/job-ready/job_3.png",
  },
];

function TiltedJobCard({
  item,
  index,
}: {
  item: JobReadyCard;
  index: number;
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1,
      }}
      className="relative w-full perspective-midrange"
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="group relative flex flex-col items-center text-center gap-3 p-4 pb-6 rounded-2xl border border-white/5 bg-[#111827] hover:border-primary/20 transition-colors duration-300 h-full"
      >
        {/* Card Image */}
        <div className="w-full overflow-hidden rounded-xl">
          <Image
            src={item.imageSrc}
            alt={item.title}
            width={600}
            height={400}
            className="w-full aspect-3/2 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Title */}
        <h3 className={`text-base font-bold tracking-wide ${item.accentColor}`}>
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      </motion.div>
    </motion.figure>
  );
}

export function JobReady() {
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
          Skills alone don&apos;t land jobs. We prepare you for every step of
          the hiring process.
        </motion.p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {items.map((item, index) => (
            <TiltedJobCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
