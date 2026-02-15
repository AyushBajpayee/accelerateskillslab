"use client";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";
import { LampEffect } from "@/components/ui/lamp-effect";
import { motion } from "motion/react";
import { useState, useEffect, useRef, useCallback, useId } from "react";
import { ExpandableCardModal } from "@/components/ui/expandable-card-modal";
import {
  ArrowRight,
  Calendar,
  TrendingUp,
  IndianRupee,
  Briefcase,
  Expand,
  MessageSquare,
  Mic,
  Video,
  ScreenShare,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Code } from "lucide-react";
import Link from "next/link";
import { TiltedToolCard } from "@/components/ui/TiltedToolCard";
import {
  SiPython,
  SiPostgresql,
  SiDocker,
  SiApacheairflow,
  SiApachespark,
  SiApachekafka,
  SiDbt,
  SiAirbyte,
  SiAmazonwebservices,
  SiGithub,
} from "react-icons/si";
import { IconType } from "react-icons";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const tools: { name: string; icon: IconType }[] = [
  { name: "Python", icon: SiPython },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Apache Spark", icon: SiApachespark },
  { name: "Kafka", icon: SiApachekafka },
  { name: "Docker", icon: SiDocker },
  { name: "Apache Airflow", icon: SiApacheairflow },
  { name: "dbt", icon: SiDbt },
  { name: "Airbyte", icon: SiAirbyte },
  { name: "AWS", icon: SiAmazonwebservices },
  { name: "Git & GitHub", icon: SiGithub },
];

// Real salary data by career level - India (Sources: AmbitionBox 84K+ salaries, Glassdoor India, PayScale 2024-2025)
const salaryByLevel = [
  { level: "Entry Level", shortLabel: "Entry", salary: 6, years: "0-1 yr" },
  { level: "Junior DE", shortLabel: "Junior", salary: 11, years: "1-3 yrs" },
  { level: "Mid-Career", shortLabel: "Mid", salary: 18, years: "4-6 yrs" },
  { level: "Senior DE", shortLabel: "Senior", salary: 28, years: "7-9 yrs" },
  { level: "Lead/Staff DE", shortLabel: "Lead", salary: 40, years: "10+ yrs" },
  { level: "Engg. Manager", shortLabel: "Manager", salary: 50, years: "Mgmt" },
  {
    level: "Director/Principal",
    shortLabel: "Director",
    salary: 70,
    years: "Director",
  },
];

// India Big Data Technology & Service market size (Source: Mordor Intelligence — $16.75B in 2025, ~11.5% CAGR to $28.9B by 2030)
const marketGrowth = [
  { year: "2020", size: 9.7 },
  { year: "2021", size: 10.8 },
  { year: "2022", size: 12.0 },
  { year: "2023", size: 13.4 },
  { year: "2024", size: 15.0 },
  { year: "2025", size: 16.75 },
  { year: "2026", size: 18.7 },
  { year: "2028", size: 23.2 },
  { year: "2030", size: 28.9 },
];

const keyStats = [
  {
    icon: TrendingUp,
    value: "25-35%",
    label: "AI & Data Market Growth",
    sublabel: "NASSCOM-Deloitte 2024",
  },
  {
    icon: IndianRupee,
    value: "₹70L+",
    label: "Director-Level Package",
    sublabel: "Data Engineering Leadership",
  },
  {
    icon: Briefcase,
    value: "$28.9B",
    label: "India Big Data Market by 2030",
    sublabel: "~11.5% CAGR",
  },
];

const course = {
  id: "data-engineering",
  category: "Program",
  categoryColor: "bg-orange-500",
  categoryTextColor: "text-orange-500",
  categoryIcon: Code,
  title: "Data Engineering Zero to Hero",
  description:
    "This intensive 3-month program transforms absolute beginners into job-ready data engineers through hands-on projects and industry-relevant skills. Master Python, SQL, Airflow, dbt, AWS, and build production-grade data pipelines.",
  buttonText: "Enroll Now",
  buttonColor: "bg-orange-500 hover:bg-orange-600",
};

const modules = [
  {
    week: "Week 1-2",
    title: "Python for Data Engineering",
    description:
      "Build the essential Python foundation needed for data engineering - from basics to advanced data manipulation and pipeline building.",
    lessons: 24,
    duration: "40+ hours",
    subModules: [
      "Python Fundamentals & Setup - Installing Python 3.12, VS Code, Git, variables, data types, operators, and your first scripts",
      "Control Flow & Data Structures - Master conditionals, loops, lists, tuples, sets, dictionaries, and list comprehensions",
      "Functions, Modules & File Handling - Write reusable code, handle CSV/JSON files, work with built-in modules, and error handling",
      "Object-Oriented Programming & Advanced Python - Classes, inheritance, APIs, virtual environments, Pandas, and NumPy basics",
      "Hands-On Projects - Build calculators, data processors, ETL scripts, and complete Python ETL pipeline from scratch",
    ],
  },
  {
    week: "Week 3-4",
    title: "SQL & Database Fundamentals",
    description:
      "Master the universal language for data access and manipulation with PostgreSQL, from basics to advanced analytical functions.",
    lessons: 18,
    duration: "30+ hours",
    subModules: [
      "SQL Basics & Data Retrieval - Relational database concepts, PostgreSQL setup, SELECT queries, WHERE, ORDER BY, aggregates, GROUP BY",
      "Advanced SQL & Data Manipulation - INSERT/UPDATE/DELETE, all join types, subqueries, CTEs, CASE statements, constraints, indexes",
      "Window Functions & Database Design - ROW_NUMBER, RANK, LAG/LEAD, running totals, normalization, ERDs, transactions, views",
      "Real-world Practice - Build e-commerce databases, write analytical queries, optimize performance, and design complete schemas",
      "Capstone Exercise - Design, implement, and query a complete database with 15+ analytical queries and comprehensive documentation",
    ],
  },
  {
    week: "Week 5-9",
    title: "Data Engineering & ELT Tools",
    description:
      "Learn industry-standard tools for building production data pipelines: Airflow for orchestration, dbt for transformations, and modern data stack integration.",
    lessons: 24,
    duration: "45+ hours",
    subModules: [
      "Data Engineering Fundamentals - ETL vs ELT, pipeline architectures, batch vs streaming, data warehousing, star/snowflake schemas, data quality",
      "Apache Airflow - Workflow Orchestration - Set up Airflow with Docker, create DAGs, operators, task dependencies, scheduling, monitoring, and alerting",
      "dbt (Data Build Tool) - Transform data using dbt Core, models, sources/refs, materialization, Jinja templating, tests, documentation, and macros",
      "Modern Data Stack & Integration - Airbyte for ingestion, integrate Airflow with dbt, data catalogs, and build complete ELT pipelines",
      "Integration Project - Extract from multiple sources with Airbyte, transform with dbt, orchestrate with Airflow, add data quality tests",
    ],
  },
  {
    week: "Week 10-12",
    title: "Cloud & AWS for Data Engineering",
    description:
      "Deploy production-grade data infrastructure on AWS - from storage and compute to data lakes, analytics services, and pipeline architecture.",
    lessons: 24,
    duration: "50+ hours",
    subModules: [
      "Cloud Computing & AWS Fundamentals - Cloud models, AWS account setup, IAM, regions, AWS CLI, security best practices, cost management",
      "AWS Storage & Compute Services - S3 buckets and lifecycle, EC2, Lambda serverless, RDS PostgreSQL, Redshift intro, VPC basics",
      "AWS Data Services & Analytics - AWS Glue for ETL, Glue Data Catalog, Crawlers, Athena for querying S3, partitioning, Kinesis streaming",
      "AWS Data Pipeline Architecture - MWAA (Managed Airflow), CloudWatch monitoring, SNS notifications, EventBridge, CloudFormation, CI/CD",
      "End-to-End AWS Project - Design complete data pipeline architecture, implement with multiple AWS services, add monitoring and documentation",
    ],
  },
  {
    week: "Week 13-17",
    title: "Capstone Project - Complete Data Platform",
    description:
      "Build a production-ready data platform from scratch: design architecture, implement ingestion, transformation, orchestration, and analytics on AWS.",
    lessons: 20,
    duration: "60+ hours",
    subModules: [
      "Project Planning & Design - Architecture diagrams, technical design documents, database schema design, star schema, ERD, repository setup",
      "Implementation Part 1 - AWS infrastructure (S3, RDS), data sources setup, Airbyte connectors, data ingestion to S3, infrastructure documentation",
      "Implementation Part 2 - dbt project with staging/intermediate/marts layers, fact/dimension tables, data quality tests, Airflow orchestration",
      "Implementation Part 3 - AWS Glue & Athena setup, analytical queries, CloudWatch dashboards, monitoring, alerting, comprehensive documentation",
      "Finalization & Presentation - Code optimization, end-to-end testing, presentation preparation, GitHub portfolio, technical documentation package",
    ],
  },
];

// Module images mapping (keys must match module.week) — from public/courses/data-engineering
const moduleImages: Record<string, string> = {
  "Week 1-2": "/courses/data-engineering/de_week1_2.png",
  "Week 3-4": "/courses/data-engineering/de_week3_4.png",
  "Week 5-9": "/courses/data-engineering/de_week5_9.png",
  "Week 10-12": "/courses/data-engineering/de_week10_12.png",
  "Week 13-17": "/courses/data-engineering/de_week_13_17.png",
};

function ScreenShareMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative w-full mx-auto lg:mx-0"
    >
      {/* Main container with gradient border */}
      <div className="rounded-2xl bg-linear-to-br from-slate-800 to-slate-900 p-1 shadow-2xl">
        <div className="rounded-xl bg-slate-900 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-slate-400 ml-2">
              Data Engineering Bootcamp - Live Session
            </span>
          </div>

          {/* Screen Share Content */}
          <div className="p-3">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-[#1e1e2e] border border-slate-700/50">
              {/* Course Roadmap Image */}
              <Image
                src="/courses/data-engineering/de_eng_hero.png"
                alt="Data Engineering Roadmap: From Zero to Hero in 20 Weeks"
                fill
                className="object-cover"
              />

              {/* Screen share indicator */}
              <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 bg-red-500/90 rounded text-[10px] text-white">
                <ScreenShare size={10} />
                <span>Sharing</span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="px-4 py-3 border-t border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-slate-400">
                Instructor Sharing Screen
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 transition-colors">
                <MessageSquare size={14} />
              </button>
              <button className="p-1.5 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 transition-colors">
                <Mic size={14} />
              </button>
              <button className="p-1.5 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 transition-colors">
                <Video size={14} />
              </button>
              <button className="p-1.5 rounded-lg bg-red-500/80 text-white hover:bg-red-500 transition-colors">
                <ScreenShare size={14} />
              </button>
              <button className="p-1.5 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 transition-colors">
                <Settings size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-3xl -z-10" />
    </motion.div>
  );
}

function ExpandedModuleCard({
  module,
  layoutId,
}: {
  module: (typeof modules)[0];
  layoutId: string;
}) {
  const moduleImage = moduleImages[module.week];

  return (
    <motion.div
      layoutId={layoutId}
      className="w-full max-w-[800px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-[#0d1117] border border-[#ffffff12] rounded-2xl sm:rounded-3xl overflow-hidden"
    >
      {/* Image Section */}
      {moduleImage && (
        <motion.div
          layoutId={`image-${module.week}-${layoutId}`}
          className="relative w-full overflow-hidden bg-[#0a0f1a]"
        >
          <Image
            src={moduleImage}
            alt={module.title}
            width={1024}
            height={576}
            className="w-full h-auto object-contain"
          />
        </motion.div>
      )}

      <div className="px-6 pt-5 pb-8 space-y-5">
        {/* Week Badge */}
        <div className="flex items-center gap-3">
          <motion.div
            layoutId={`badge-${module.week}-${layoutId}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium"
          >
            <Calendar size={14} />
            {module.week}
          </motion.div>
        </div>

        {/* Title */}
        <motion.h3
          layoutId={`title-${module.week}-${layoutId}`}
          className="text-lg sm:text-xl font-bold text-white"
        >
          {module.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          layoutId={`description-${module.week}-${layoutId}`}
          className="text-gray-400 text-xs sm:text-sm leading-relaxed"
        >
          {module.description}
        </motion.p>

        {/* Detailed Sub-modules */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pt-4 border-t border-white/10"
        >
          <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">
            What You&apos;ll Learn
          </h4>
          <div className="space-y-3">
            {module.subModules.map((subModule, subIndex) => {
              const cleanModule = subModule.replace(/^\d+\.\s*/, "");
              const parts = cleanModule.split(" - ");
              const title = parts[0];
              const description = parts.slice(1).join(" - ");

              return (
                <div
                  key={subIndex}
                  className="text-gray-400 text-xs sm:text-sm leading-relaxed"
                >
                  {description ? (
                    <>
                      <span className="font-semibold text-white">{title}</span>
                      {" - " + description}
                    </>
                  ) : (
                    <span className="font-semibold text-white">{title}</span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ModuleCard({
  module,
  index,
  onClick,
  layoutId,
}: {
  module: (typeof modules)[0];
  index: number;
  onClick: () => void;
  layoutId: string;
}) {
  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className="relative bg-[#111827] rounded-2xl p-6 sm:p-8 border border-blue-500/30 hover:border-blue-500/50 transition-colors cursor-pointer"
      role="button"
      aria-label={`View details about ${module.title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Expand Button - Top Right */}
      <div
        className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 transition-all group"
        aria-hidden="true"
      >
        <Expand
          size={18}
          className="text-gray-400 group-hover:text-primary transition-colors"
        />
      </div>

      <div className="flex flex-col gap-4 pr-12">
        {/* Week Badge */}
        <div className="flex items-center gap-3">
          <motion.div
            layoutId={`badge-${module.week}-${layoutId}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium"
          >
            <Calendar size={16} />
            {module.week}
          </motion.div>
        </div>

        {/* Module Title */}
        <motion.h3
          layoutId={`title-${module.week}-${layoutId}`}
          className="text-xl sm:text-2xl font-bold text-white"
        >
          {module.title}
        </motion.h3>

        {/* Module Description */}
        <motion.p
          layoutId={`description-${module.week}-${layoutId}`}
          className="text-gray-400 text-sm sm:text-base leading-relaxed"
        >
          {module.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

const CHART_COUNT = 2;
const CHART_AUTO_SCROLL_INTERVAL = 2500;
const CHART_AUTO_SCROLL_RESUME_DELAY = 3000;

export default function DataEngineeringPage() {
  const [activeModule, setActiveModule] = useState<
    (typeof modules)[number] | null
  >(null);
  const id = useId();

  /* ── Chart carousel state (mobile) ── */
  const chartCarouselRef = useRef<HTMLDivElement>(null);
  const [chartActiveIndex, setChartActiveIndex] = useState(0);
  const chartAutoScrollPaused = useRef(false);
  const chartResumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const scrollToChartIndex = useCallback((index: number) => {
    const container = chartCarouselRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement | undefined;
    if (child) {
      container.scrollTo({
        left: child.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
    }
  }, []);

  /* Track active chart via scroll position */
  useEffect(() => {
    const container = chartCarouselRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const slideWidth = containerWidth + 16;
      const index = Math.round(scrollLeft / slideWidth);
      setChartActiveIndex(Math.min(Math.max(0, index), CHART_COUNT - 1));
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  /* Auto-scroll charts on mobile */
  useEffect(() => {
    const interval = setInterval(() => {
      if (chartAutoScrollPaused.current) return;
      if (window.innerWidth >= 1024) return;
      setChartActiveIndex((prev) => {
        const next = (prev + 1) % CHART_COUNT;
        scrollToChartIndex(next);
        return next;
      });
    }, CHART_AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [scrollToChartIndex]);

  /* Pause auto-scroll on touch, resume after delay */
  useEffect(() => {
    const container = chartCarouselRef.current;
    if (!container) return;
    const pause = () => {
      chartAutoScrollPaused.current = true;
      if (chartResumeTimeoutRef.current)
        clearTimeout(chartResumeTimeoutRef.current);
    };
    const resume = () => {
      chartResumeTimeoutRef.current = setTimeout(() => {
        chartAutoScrollPaused.current = false;
      }, CHART_AUTO_SCROLL_RESUME_DELAY);
    };
    container.addEventListener("touchstart", pause, { passive: true });
    container.addEventListener("touchend", resume, { passive: true });
    return () => {
      container.removeEventListener("touchstart", pause);
      container.removeEventListener("touchend", resume);
      if (chartResumeTimeoutRef.current)
        clearTimeout(chartResumeTimeoutRef.current);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Grid overlay for technical aesthetic - Applied to all sections */}
      <div className="fixed inset-0 bg-size-[20px_20px] bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] opacity-30 pointer-events-none" />

      <div className="relative z-10">
        {/* Course-specific Hero Section */}
        <section className="relative py-[160px] lg:min-h-[80vh] lg:pt-24 lg:pb-16 flex flex-col justify-center overflow-hidden">
          {/* Layered Aceternity Backgrounds */}
          <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60"
            fill="#2756f7"
          />
          <BackgroundBeams className="opacity-60" />

          {/* Sun Lamp Effect - positioned at bottom center */}
          <LampEffect className="opacity-80" fill="#2756f7" position="bottom" />

          <div className="container mx-auto px-4 sm:px-8 lg:px-20 relative z-10">
            {/* Two column layout - reversed on mobile so video appears first */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-8 lg:gap-0">
              {/* Text Content - Left side */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-1 lg:max-w-none"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  4-Months Data Engineering Bootcamp
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                  <span className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl">
                    Data Engineering
                  </span>
                  <br />
                  <span className="text-primary">Zero-to-Hero program</span>
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed max-w-lg">
                  This intensive 4-months program transforms absolute beginners
                  into job-ready data engineers through hands-on projects and
                  industry-relevant skills. Master Python, SQL, Airflow, dbt,
                  AWS, and build production-grade data pipelines.
                </p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <HoverBorderGradient
                    containerClassName="rounded-full w-fit"
                    as="a"
                    href="#course-details"
                    className="px-5 py-2.5 sm:px-7 text-sm font-medium text-white flex items-center space-x-2"
                    innerStyle={{
                      background:
                        "radial-gradient(circle at center, #2756f7 0%, #1a3db8 50%, #0f2568 100%)",
                    }}
                  >
                    <span>Curriculum</span>
                    <ArrowRight size={18} />
                  </HoverBorderGradient>
                </motion.div>
              </motion.div>

              {/* Screen Share Mockup - Right side */}
              <div className="flex-1 lg:flex-[1.5] flex justify-start lg:min-w-0">
                <ScreenShareMockup />
              </div>
            </div>
          </div>
        </section>

        {/* Data Engineering as a Career Section */}
        <section className="relative py-10 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-3xl sm:text-4xl lg:text-5xl text-center mb-4"
            >
              <span className="font-bold">Data Engineering</span>{" "}
              <span
                className="italic"
                style={{ fontFamily: '"IBM Plex Serif", serif' }}
              >
                as a
              </span>{" "}
              <span className="text-primary font-bold">Career</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground text-center mb-10 lg:mb-14 max-w-3xl mx-auto"
            >
              A high-growth career backed by real numbers.
            </motion.p>

            {/* Key Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mobile-m:gap-4 sm:gap-6 max-w-[1000px] mx-auto mb-10 lg:mb-14">
              {keyStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`relative rounded-xl sm:rounded-2xl border border-[#ffffff12] bg-[#0d1117] p-2 mobile-m:p-2.5 sm:p-4 overflow-visible ${index === keyStats.length - 1 ? "col-span-2 max-w-[60%] mx-auto sm:col-span-1 sm:max-w-none" : ""}`}
                  >
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[0.5px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, #2756f7, transparent)",
                      }}
                    />
                    <div className="bg-[#111827] rounded-lg sm:rounded-xl p-3 mobile-m:p-4 sm:p-6 flex flex-col items-center gap-1 sm:gap-2 border border-blue-500/20 hover:border-blue-500/40 transition-colors h-full">
                      <Icon
                        size={28}
                        className="text-primary mb-0.5 sm:mb-1 w-5! h-5! sm:w-7! sm:h-7!"
                      />
                      <span className="text-xl mobile-m:text-2xl sm:text-4xl font-bold text-white">
                        {stat.value}
                      </span>
                      <span className="text-white text-xs mobile-m:text-sm sm:text-base font-medium text-center">
                        {stat.label}
                      </span>
                      <span className="text-gray-500 text-[10px] mobile-m:text-xs sm:text-xs text-center">
                        {stat.sublabel}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Descriptive Text - Part 1 (above charts) */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto text-center mb-10 lg:mb-14"
            >
              Data engineering is among the fastest-growing tech specializations
              in India. NASSCOM-Deloitte projects AI and data talent demand to
              grow from 650,000 to over{" "}
              <span className="text-white font-semibold">
                1.25 million by 2027
              </span>
              , with data engineers seeing a strong hiring rebound in 2025 - led
              by BFSI (57% of roles) and concentrated in Bengaluru and
              Hyderabad.
            </motion.p>

            {/* Charts Grid / Mobile Carousel */}
            <div
              ref={chartCarouselRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:snap-none max-w-[1200px] mx-auto"
            >
              {/* Chart 1: Salary by Career Level */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="shrink-0 w-full snap-center relative rounded-2xl sm:rounded-[32px] border border-[#ffffff12] bg-[#0d1117] p-3 sm:p-4 overflow-visible"
              >
                <div
                  className="absolute bottom-0 left-[20%] -translate-x-1/2 w-[40%] h-[0.5px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #2756f7, transparent)",
                  }}
                />
                <div className="bg-[#111827] rounded-xl sm:rounded-2xl px-4 py-4 sm:p-6 lg:p-8 border border-blue-500/20">
                  <h3 className="text-base sm:text-xl font-bold text-white mb-0.5 sm:mb-1">
                    Salary by Career Level
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-6">
                    Average India data engineer compensation by seniority (LPA)
                  </p>
                  <div className="w-full h-[230px] sm:h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={salaryByLevel}
                        margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#1e293b"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="shortLabel"
                          tick={{ fill: "#9ca3af", fontSize: 12 }}
                          tickLine={false}
                          axisLine={{ stroke: "#1e293b" }}
                          angle={-35}
                          textAnchor="end"
                          height={50}
                        />
                        <YAxis
                          tick={{ fill: "#9ca3af", fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value: number) => `₹${value}L`}
                          domain={[0, 75]}
                        />
                        <Tooltip
                          cursor={{ fill: "rgba(39, 86, 247, 0.08)" }}
                          contentStyle={{
                            backgroundColor: "#111827",
                            border: "1px solid rgba(59, 130, 246, 0.3)",
                            borderRadius: "12px",
                            padding: "12px 16px",
                          }}
                          labelStyle={{
                            color: "#fff",
                            fontWeight: 600,
                            marginBottom: 4,
                          }}
                          itemStyle={{ color: "#9ca3af" }}
                          formatter={(value: number | undefined) => [
                            `₹${value ?? 0} LPA`,
                            "Avg. Salary",
                          ]}
                          labelFormatter={(label: unknown) => {
                            const labelStr = String(label);
                            const item = salaryByLevel.find(
                              (d) => d.shortLabel === labelStr,
                            );
                            return item
                              ? `${item.level} (${item.years})`
                              : labelStr;
                          }}
                        />
                        <Bar
                          dataKey="salary"
                          radius={[6, 6, 0, 0]}
                          maxBarSize={48}
                        >
                          {salaryByLevel.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                index >= 5
                                  ? "#2756f7"
                                  : `rgba(39, 86, 247, ${0.35 + index * 0.1})`
                              }
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-gray-600 text-xs mt-2 sm:mt-4 text-center">
                    Sources: AmbitionBox, Glassdoor India, PayScale (2024-2025)
                  </p>
                </div>
              </motion.div>

              {/* Chart 2: Market Size Growth */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="shrink-0 w-full snap-center relative rounded-2xl sm:rounded-[32px] border border-[#ffffff12] bg-[#0d1117] p-3 sm:p-4 overflow-visible"
              >
                <div
                  className="absolute top-0 right-[20%] translate-x-1/2 w-[40%] h-[0.5px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #2756f7, transparent)",
                  }}
                />
                <div className="bg-[#111827] rounded-xl sm:rounded-2xl px-4 py-4 sm:p-6 lg:p-8 border border-blue-500/20">
                  <h3 className="text-base sm:text-xl font-bold text-white mb-0.5 sm:mb-1">
                    Big Data Market Growth
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-6">
                    India market size in USD billions (~11.5% CAGR)
                  </p>
                  <div className="w-full h-[230px] sm:h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={marketGrowth}
                        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient
                            id="deMarketGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#2756f7"
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="95%"
                              stopColor="#2756f7"
                              stopOpacity={0.02}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#1e293b"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="year"
                          tick={{ fill: "#9ca3af", fontSize: 12 }}
                          tickLine={false}
                          axisLine={{ stroke: "#1e293b" }}
                        />
                        <YAxis
                          tick={{ fill: "#9ca3af", fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value: number) => `$${value}B`}
                          domain={[0, 32]}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#111827",
                            border: "1px solid rgba(59, 130, 246, 0.3)",
                            borderRadius: "12px",
                            padding: "12px 16px",
                          }}
                          labelStyle={{
                            color: "#fff",
                            fontWeight: 600,
                            marginBottom: 4,
                          }}
                          itemStyle={{ color: "#9ca3af" }}
                          formatter={(value: number | undefined) => [
                            `$${value ?? 0}B`,
                            "Market Size",
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="size"
                          stroke="#2756f7"
                          strokeWidth={2.5}
                          fill="url(#deMarketGradient)"
                          dot={{
                            fill: "#2756f7",
                            stroke: "#111827",
                            strokeWidth: 2,
                            r: 4,
                          }}
                          activeDot={{
                            fill: "#2756f7",
                            stroke: "#fff",
                            strokeWidth: 2,
                            r: 6,
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-gray-600 text-xs mt-2 sm:mt-4 text-center">
                    Source: Mordor Intelligence (India Big Data Market)
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Chart Dot Navigation - Mobile Only */}
            <div className="flex justify-center gap-2 mt-4 lg:hidden">
              {Array.from({ length: CHART_COUNT }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    scrollToChartIndex(i);
                    setChartActiveIndex(i);
                    chartAutoScrollPaused.current = true;
                    if (chartResumeTimeoutRef.current)
                      clearTimeout(chartResumeTimeoutRef.current);
                    chartResumeTimeoutRef.current = setTimeout(() => {
                      chartAutoScrollPaused.current = false;
                    }, CHART_AUTO_SCROLL_RESUME_DELAY);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    chartActiveIndex === i ? "bg-primary w-4" : "bg-white/20"
                  }`}
                  aria-label={`Go to chart ${i + 1}`}
                />
              ))}
            </div>

            {/* Descriptive Text - Part 2 (below charts) */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto text-center mt-14"
            >
              Powered by cloud-first enterprise strategies, Digital India
              initiatives, and data localization norms, India&apos;s big data
              market is on track to reach{" "}
              <span className="text-white font-semibold">
                $28.9 billion by 2030
              </span>
              . With a career ladder from ₹6 LPA at entry level to ₹70L+ at the
              director level, data engineering offers one of the steepest salary
              growth curves in tech.
            </motion.p>
          </div>
        </section>

        {/* Curriculum Section */}
        <section id="course-details" className="relative py-10 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-3xl sm:text-4xl lg:text-5xl text-center mb-4"
            >
              <span className="font-bold">Curriculum</span>{" "}
              <span
                className="italic"
                style={{ fontFamily: '"IBM Plex Serif", serif' }}
              >
                Breakdown
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground text-center mb-14 lg:mb-20 max-w-3xl mx-auto"
            >
              Your 3-month roadmap to becoming a{" "}
              <span className="text-primary font-medium">
                job-ready Data Engineer.
              </span>
            </motion.p>

            {/* Expanded Card Modal */}
            <ExpandableCardModal
              isOpen={!!activeModule}
              onClose={() => setActiveModule(null)}
            >
              {activeModule && (
                <ExpandedModuleCard
                  module={activeModule}
                  layoutId={`module-${activeModule.week}-${id}`}
                />
              )}
            </ExpandableCardModal>

            {/* Timeline Container */}
            <div className="relative max-w-[1200px] mx-auto">
              {/* Dashed timeline line — z-0 so it renders behind the cards, extends above/below cards */}
              <div className="absolute -top-16 -bottom-16 left-4 lg:left-1/2 lg:-translate-x-px w-px border-l-2 border-dashed border-blue-500/30 z-0" />

              <div className="flex flex-col gap-8 lg:gap-16">
                {modules.map((module, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        x: isLeft ? -30 : 30,
                      }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                      className={`relative w-full lg:w-[60%] ${
                        isLeft ? "lg:mr-auto" : "lg:ml-auto"
                      } pl-10 lg:pl-4 rounded-[32px] border border-[#ffffff12] bg-[#0d1117] p-4 overflow-visible`}
                    >
                      {/* Blue Highlighter Glow - Bottom */}
                      <div
                        className="absolute bottom-0 left-[20%] -translate-x-1/2 w-[40%] h-[0.5px] rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, #2756f7, transparent)",
                        }}
                      />

                      {/* Blue Highlighter Glow - Top */}
                      <div
                        className="absolute top-0 right-[20%] translate-x-1/2 w-[40%] h-[0.5px] rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, #2756f7, transparent)",
                        }}
                      />

                      {/* Mobile timeline dot */}
                      <div className="absolute left-[11px] top-8 w-[10px] h-[10px] rounded-full bg-primary border-2 border-[#0d1117] z-20 lg:hidden" />

                      {/* Module */}
                      <ModuleCard
                        module={module}
                        index={index}
                        onClick={() => setActiveModule(module)}
                        layoutId={`module-${module.week}-${id}`}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Tools & Technologies Covered Section */}
        <section className="relative py-10 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-3xl sm:text-4xl lg:text-5xl text-center mb-4"
            >
              <span className="font-bold">Tools &</span>{" "}
              <span
                className="italic"
                style={{ fontFamily: '"IBM Plex Serif", serif' }}
              >
                Technologies
              </span>{" "}
              <span className="text-primary font-bold">Covered</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground text-center mb-10 lg:mb-14 max-w-3xl mx-auto"
            >
              Industry-standard tools you will{" "}
              <span className="text-primary font-medium">
                master in this program.
              </span>
            </motion.p>

            {/* Tools Grid — responsive gaps, no overlap: min-w-0 on cells */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 mobile-m:gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-6 max-w-[1100px] px-8 md:px-0 mx-auto place-items-center">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="w-full min-w-0 max-w-full"
                  >
                    <TiltedToolCard>
                      <Icon
                        size={40}
                        className="text-primary w-6! h-6! mobile-m:w-7! mobile-m:h-7! sm:w-8! sm:h-8! md:w-9! md:h-9! lg:w-10! lg:h-10! xl:w-10! xl:h-10!"
                      />
                      <span className="text-white text-[11px] mobile-m:text-xs sm:text-sm md:text-base lg:text-base xl:text-base font-medium text-center leading-tight">
                        {tool.name}
                      </span>
                    </TiltedToolCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <Contact />
        <Footer />
      </div>
    </main>
  );
}
