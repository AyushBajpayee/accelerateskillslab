"use client";

import { motion } from "motion/react";
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

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Tailwind classes to control grid span on lg */
  gridClass?: string;
}

const features: FeatureCard[] = [
  {
    icon: Video,
    title: "Live Classes",
    description:
      "Thrive in a vibrant learning environment with live classes that foster interaction and immersive learning.",
    gridClass: "lg:col-span-1 lg:row-span-2",
  },
  {
    icon: BookOpen,
    title: "Industry Based Curriculum",
    description:
      "Dive deep with a meticulously crafted curriculum that navigates the realms of data science with precision and clarity.",
    gridClass: "lg:col-span-2 lg:row-span-1",
  },
  {
    icon: FlaskConical,
    title: "Hands-On Practical Training",
    description:
      "Immerse yourself with tasks, quizzes, and projects following each topic, ensuring that theory marries practice seamlessly.",
    gridClass: "lg:col-span-1 lg:row-span-2",
  },
    {
    icon: MessageCircleQuestion,
    title: "Robust Doubt Support",
    description:
      "Erase uncertainties with robust doubt support, turning every question into a stepping stone toward mastery.",
    gridClass: "lg:col-span-1 lg:row-span-1",
  },
  {
    icon: FolderGit2,
    title: "Real-Time Projects",
    description:
      "Elevate your expertise with real-time projects that propel your practical understanding into the professional universe.",
    gridClass: "lg:col-span-1 lg:row-span-1",
  },
  {
    icon: BriefcaseBusiness,
    title: "Dedicated Job Preparation",
    description:
      "Harness the power of strategic job preparation that polishes your profile and preps you for your dream job.",
    gridClass: "lg:col-span-2 lg:row-span-1",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Fee Structure",
    description:
      "Unlock a treasure trove of knowledge without breaking the bank, with fees that champion affordability and value.",
    gridClass: "lg:col-span-2 lg:row-span-1",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function WhyChoose() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-8 lg:px-20">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-14 lg:mb-20"
        >
          Why choose this bootcamp?
        </motion.h2>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-auto"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className={`group relative flex flex-col items-center text-center gap-4 p-6 lg:p-8 rounded-2xl border border-white/5 bg-[#111827] hover:border-primary/20 transition-colors duration-300 ${feature.gridClass ?? ""}`}
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
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
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
