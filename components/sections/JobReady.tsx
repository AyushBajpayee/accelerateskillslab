"use client";

import { motion } from "motion/react";
import { MessageSquareMore, FileUser, Presentation, type LucideIcon } from "lucide-react";

interface JobReadyCard {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor: string;
  accentBg: string;
}

const items: JobReadyCard[] = [
  {
    icon: MessageSquareMore,
    title: "Interview Preparation",
    description:
      "Dedicated interview prep of the 200 most important interview questions.",
    accentColor: "text-violet-400",
    accentBg: "bg-violet-500/15",
  },
  {
    icon: FileUser,
    title: "Profile Building",
    description:
      "Dedicated sessions on resume building, LinkedIn branding, etc.",
    accentColor: "text-rose-400",
    accentBg: "bg-rose-500/15",
  },
  {
    icon: Presentation,
    title: "Industry Connect",
    description:
      "Guest lectures by people from the industry each month.",
    accentColor: "text-sky-400",
    accentBg: "bg-sky-500/15",
  },
];

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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-[1000px] mx-auto">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                className="group relative flex flex-col items-center text-center gap-5 p-8 rounded-2xl border border-white/5 bg-[#111827] hover:border-primary/20 transition-colors duration-300"
              >
                {/* Icon Circle */}
                <div
                  className={`flex items-center justify-center w-20 h-20 rounded-full ${item.accentBg} ${item.accentColor} shrink-0 group-hover:scale-105 transition-transform duration-300`}
                >
                  <Icon size={36} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold tracking-wide text-white">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
