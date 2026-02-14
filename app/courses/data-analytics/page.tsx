"use client";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";
import { LampEffect } from "@/components/ui/lamp-effect";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useId, useRef } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import {
  ArrowRight,
  Calendar,
  BarChart3,
  LineChart,
  Database,
  Table,
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
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { TiltedToolCard } from "@/components/ui/TiltedToolCard";
import { SiPython, SiPandas, SiNumpy, SiTableau, SiGithub } from "react-icons/si";
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
import { TrendingUp, IndianRupee, Briefcase } from "lucide-react";

const tools: { name: string; icon: IconType | React.ComponentType<{ size?: number; className?: string }> }[] = [
  { name: "Microsoft Excel", icon: Table },
  { name: "Python", icon: SiPython },
  { name: "Pandas", icon: SiPandas },
  { name: "NumPy", icon: SiNumpy },
  { name: "Matplotlib", icon: BarChart3 },
  { name: "Seaborn", icon: LineChart },
  { name: "SQL", icon: Database },
  { name: "Tableau", icon: SiTableau },
  { name: "Power BI", icon: BarChart3 },
  { name: "GitHub", icon: SiGithub },
];

// Real salary data by career level - India (Sources: AmbitionBox, Glassdoor India, Analytics India Mag 2024-2025)
const salaryByLevel = [
  { level: "Entry Level", shortLabel: "Entry", salary: 4, years: "0-1 yr" },
  { level: "Junior Analyst", shortLabel: "Junior", salary: 6.5, years: "1-3 yrs" },
  { level: "Mid-Career", shortLabel: "Mid", salary: 10, years: "4-6 yrs" },
  { level: "Senior Analyst", shortLabel: "Senior", salary: 15, years: "7-9 yrs" },
  { level: "Lead Analyst", shortLabel: "Lead", salary: 20, years: "10+ yrs" },
  { level: "Analytics Manager", shortLabel: "Manager", salary: 26, years: "Mgmt" },
  { level: "Director Analytics", shortLabel: "Director", salary: 50, years: "Director" },
];

// India Data Analytics market size growth (Sources: IMARC Group, Grand View Research — base $2.6B in 2024, ~27% CAGR)
const marketGrowth = [
  { year: "2020", size: 0.98 },
  { year: "2021", size: 1.25 },
  { year: "2022", size: 1.6 },
  { year: "2023", size: 2.04 },
  { year: "2024", size: 2.6 },
  { year: "2025", size: 3.31 },
  { year: "2026", size: 4.22 },
  { year: "2028", size: 6.86 },
  { year: "2030", size: 11.15 },
];

const keyStats = [
  {
    icon: TrendingUp,
    value: "51%",
    label: "Supply-Demand Gap",
    sublabel: "NASSCOM 2024",
  },
  {
    icon: IndianRupee,
    value: "₹50L+",
    label: "Director-Level Salary",
    sublabel: "Analytics Leadership",
  },
  {
    icon: Briefcase,
    value: "$27B",
    label: "India Market by 2033",
    sublabel: "~27% CAGR",
  },
];

const course = {
  id: "data-analytics",
  category: "Program",
  categoryColor: "bg-green-500",
  categoryTextColor: "text-green-500",
  categoryIcon: BookOpen,
  title: "Data Analytics: Zero to Hero",
  description:
    "This redesigned curriculum condenses the complete data analytics journey into an intensive 3-month program suitable for full-time learners or highly committed part-time students. Master Excel, Python, SQL, Tableau, Power BI, and build portfolio projects that land interviews.",
  buttonText: "Enroll Now",
  buttonColor: "bg-green-500 hover:bg-green-600",
};

const modules = [
  {
    week: "Week 1",
    title: "Data Analytics Fundamentals & Excel Mastery",
    description:
      "Build the essential foundation and master the most widely-used analytics tool in business organizations",
    lessons: 6,
    duration: "5 hr 31 min",
    subModules: [
      "What is Data Analytics & Career Overview - Understanding the analytics landscape, job roles, and career paths in 2025",
      "Statistical Foundations Essentials - Core probability, distributions, and hypothesis testing concepts needed for analysis",
      "Microsoft Excel Advanced Features - Pivot tables, advanced formulas, data analysis toolpack, and scenario modeling",
      "Data Visualization Fundamentals - Chart selection, visual perception principles, and telling stories with data",
      "Business Problem Framing - Identifying analytics questions, defining success metrics, and understanding business context",
      "Hands-On Project: Business Intelligence Dashboard - Build an interactive Excel dashboard from raw business data",
    ],
  },
  {
    week: "Week 2",
    title: "Statistical Analysis & Predictive Basics",
    description:
      "Move beyond descriptive analytics to predictive modeling fundamentals.",
    lessons: 6,
    duration: "8 hr 23 min",
    subModules: [
      "Descriptive vs Predictive Analytics - Understanding the analytics pyramid and when to apply each approach",
      "Regression Analysis Fundamentals - Simple and multiple regression, interpretation, and prediction",
      "Classification and Logistic Regression - Binary and multi-class classification, probability modeling, and model evaluation",
      "Model Evaluation Metrics - Accuracy, precision, recall, F1-score, ROC curves, and choosing appropriate metrics",
      "Avoiding Common Statistical Pitfalls - Overfitting, correlation vs causation, p-hacking, and data snooping",
      "Hands-On Project: Predictive Analytics Case Study - Build, evaluate, and interpret predictive models for a business scenario",
    ],
  },
  {
    week: "Week 3-4",
    title: "Python for Data Analytics",
    description:
      "Learn programming fundamentals specifically tailored to data manipulation and analysis tasks.",
    lessons: 12,
    duration: "8 hr 23 min",
    subModules: [
      "Python Basics & Data Structures - Variables, loops, conditionals, lists, dictionaries, and string manipulation",
      "Pandas for Data Manipulation - DataFrames, data loading, filtering, grouping, merging, and reshaping data",
      "NumPy for Numerical Analysis - Arrays, mathematical operations, statistical calculations, and linear algebra",
      "Data Visualization with Matplotlib & Seaborn - Creating statistical plots, customizing visualizations, and publication-ready graphics",
      "Automation and Reproducible Analysis - Writing reusable scripts, creating functions, and documenting analysis workflows",
      "Hands-On Project: End-to-End Python Analysis - Complete data analysis pipeline from loading through visualization using Python",
    ],
  },
  {
    week: "Week 5-6",
    title: "Data Cleaning, Preparation & EDA",
    description:
      "Learn the critical skills that consume 60-80% of real analyst work - preparing messy data for analysis.",
    lessons: 12,
    duration: "8 hr 23 min",
    subModules: [
      "Data Quality Assessment - Identifying missing values, duplicates, outliers, and data anomalies",
      "Data Cleaning Techniques - Handling missing data, standardizing formats, and resolving inconsistencies",
      "Data Transformation and Feature Engineering - Restructuring data, creating derived variables, and preparing for analysis",
      "Exploratory Data Analysis (EDA) Process - Statistical summaries, distributions, correlations, and pattern discovery",
      "Data Profiling and Documentation - Creating data dictionaries and understanding dataset characteristics",
      "Hands-On Project: Complete EDA Report - Transform raw messy dataset into analysis-ready clean data with comprehensive EDA",
    ],
  },
  {
    week: "Week 6-7",
    title: "SQL and Database Querying",
    description:
      "Master the universal language for accessing and manipulating data from relational databases.",
    lessons: 12,
    duration: "8 hr 23 min",
    subModules: [
      "SQL Fundamentals & SELECT Queries - Basic syntax, filtering, sorting, and retrieving data from databases",
      "Advanced Joins and Aggregations - INNER/OUTER joins, GROUP BY, HAVING, and complex aggregation patterns",
      "Subqueries and Window Functions - Nested queries and analytical window functions for sophisticated analysis",
      "Data Manipulation (INSERT, UPDATE, DELETE) - Writing data modification queries and understanding transactions",
      "Query Optimization and Performance - Writing efficient queries, understanding execution plans, and best practices",
      "Hands-On Project: Sales Analytics Database Query Suite - Build complete SQL solution for multi-part business analysis",
    ],
  },
  {
    week: "Week 7-8",
    title: "Business Intelligence Tools - Tableau & Power BI",
    description:
      "Master the industry-standard visualization platforms for creating interactive dashboards and reports.",
    lessons: 12,
    duration: "8 hr 23 min",
    subModules: [
      "Tableau Fundamentals - Interface navigation, connecting to data sources, basic chart creation, and mark properties",
      "Advanced Tableau Dashboards - Dashboard design, interactivity with filters and parameters, and dashboard best practices",
      "Power BI Essentials - Power BI desktop interface, data modeling, DAX basics, and Power BI Service publishing",
      "Power BI Advanced Features - Creating relationships, advanced DAX formulas, and building interactive reports",
      "Comparative Analysis: Tableau vs Power BI - Choosing the right tool for different scenarios and organizational contexts",
      "Hands-On Project: Multi-tool Dashboard Suite - Create same analytical dashboard in both Tableau and Power BI with interactivity",
    ],
  },
  {
    week: "Week 9-12",
    title: "Capstone Project & Portfolio Development",
    description:
      "Synthesize all skills into a comprehensive capstone project that demonstrates job readiness.",
    lessons: 12,
    duration: "8 hr 23 min",
    subModules: [
      "Capstone Project Planning - Defining analytical questions, obtaining datasets, and creating a project roadmap",
      "Data Integration & Preparation - Combining multiple data sources and comprehensive data cleaning",
      "Multi-Tool Analysis - Using SQL, Python, Excel, and BI tools as appropriate within a single project",
      "Advanced Visualizations & Storytelling - Creating compelling visual narratives that drive business decisions",
      "Documentation & GitHub Portfolio - Writing technical documentation, code comments, and hosting on GitHub",
      "Presentation & Communication - Presenting capstone findings to stakeholders with clear business impact messaging",
    ],
  },
];

// Module images mapping
const moduleImages: Record<string, string> = {
  "Week 1": "/courses/data-engineering/week1_4.png",
  "Week 2": "/courses/data-engineering/week5_7.png",
  "Week 3-4": "/courses/data-engineering/week8_11.png",
  "Week 5-6": "/courses/data-engineering/week12_15.png",
  "Week 6-7": "/courses/data-engineering/week16_20.png",
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
              Data Analytics Bootcamp - Live Session
            </span>
          </div>

          {/* Screen Share Content */}
          <div className="p-3">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-[#1e1e2e] border border-slate-700/50">
              {/* Course Roadmap Image */}
              <Image
                src="/courses/data-analytics/data_analytics_hero.png"
                alt="Data Analytics: The 3-Month Journey from Zero to Hero"
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
      className="w-full max-w-[800px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-[#0d1117] border border-[#ffffff12] sm:rounded-3xl overflow-hidden"
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
        <Expand size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
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

export default function DataAnalyticsPage() {
  const [activeModule, setActiveModule] = useState<
    (typeof modules)[number] | null
  >(null);
  const id = useId();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveModule(null);
      }
    }

    if (activeModule) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeModule]);

  useOutsideClick(modalRef as React.RefObject<HTMLDivElement>, () =>
    setActiveModule(null)
  );

  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Grid overlay for technical aesthetic - Applied to all sections */}
      <div className="fixed inset-0 bg-size-[20px_20px] bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] opacity-30 pointer-events-none" />

      <div className="relative z-10">
        {/* Course-specific Hero Section */}
        <section className="relative pt-[160px] pb-[200px] lg:pt-[280px] lg:pb-[250px] flex flex-col justify-center overflow-hidden">
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
                  3-Months Data Analytics Bootcamp
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                  <span className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl">
                    Data Analytics
                  </span>
                  <br />
                  <span className="text-primary">Zero-to-Hero program</span>
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed max-w-lg">
                  This redesigned curriculum condenses the complete data
                  analytics journey into an intensive 3-month program suitable
                  for full-time learners or highly committed part-time students.
                  Master Excel, Python, SQL, Tableau, Power BI, and build
                  portfolio projects that land interviews.
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
                    className="h-12 px-8 text-lg text-white flex items-center space-x-2"
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

        {/* Data Analytics as a Career Section */}
        <section className="relative py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                <span className="font-bold">Data Analytics as a Career</span>
                <br />
                <span
                  className="italic font-normal text-xl sm:text-2xl lg:text-3xl xl:text-4xl"
                  style={{
                    fontFamily:
                      '"IBM Plex Serif", "IBM Plex Serif Placeholder", serif',
                    letterSpacing: "-0.02em",
                  }}
                >
                  A high-growth career{" "}
                  <span className="text-primary">backed by real numbers.</span>
                </span>
              </h2>
            </motion.div>

            {/* Key Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-[1000px] mx-auto mb-14">
              {keyStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative rounded-2xl border border-[#ffffff12] bg-[#0d1117] p-4 overflow-visible"
                  >
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[0.5px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, #2756f7, transparent)",
                      }}
                    />
                    <div className="bg-[#111827] rounded-xl p-6 flex flex-col items-center gap-2 border border-blue-500/20 hover:border-blue-500/40 transition-colors h-full">
                      <Icon size={28} className="text-primary mb-1" />
                      <span className="text-3xl sm:text-4xl font-bold text-white">
                        {stat.value}
                      </span>
                      <span className="text-white text-sm sm:text-base font-medium text-center">
                        {stat.label}
                      </span>
                      <span className="text-gray-500 text-xs text-center">
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
              className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto text-center mb-14"
            >
              Data analytics is one of the fastest-growing career fields in
              India. NASSCOM reports a{" "}
              <span className="text-white font-semibold">
                51% supply-demand gap
              </span>{" "}
              for data professionals, with demand projected to exceed 1 million
              roles by 2026 and India&apos;s AI talent pool reaching 1.25
              million by 2027.
            </motion.p>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1200px] mx-auto">
              {/* Chart 1: Salary by Career Level */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative rounded-[32px] border border-[#ffffff12] bg-[#0d1117] p-4 overflow-visible"
              >
                <div
                  className="absolute bottom-0 left-[20%] -translate-x-1/2 w-[40%] h-[0.5px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #2756f7, transparent)",
                  }}
                />
                <div className="bg-[#111827] rounded-2xl p-6 sm:p-8 border border-blue-500/20">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    Salary by Career Level
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Average India data analyst compensation by seniority (LPA)
                  </p>
                  <div className="w-full h-[320px] sm:h-[360px]">
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
                          tickFormatter={(value: number) =>
                            `₹${value}L`
                          }
                          domain={[0, 55]}
                        />
                        <Tooltip
                          cursor={{ fill: "rgba(39, 86, 247, 0.08)" }}
                          contentStyle={{
                            backgroundColor: "#111827",
                            border: "1px solid rgba(59, 130, 246, 0.3)",
                            borderRadius: "12px",
                            padding: "12px 16px",
                          }}
                          labelStyle={{ color: "#fff", fontWeight: 600, marginBottom: 4 }}
                          itemStyle={{ color: "#9ca3af" }}
                          formatter={(value: number | undefined) => [
                            `₹${value ?? 0} LPA`,
                            "Avg. Salary",
                          ]}
                          labelFormatter={(label: unknown) => {
                            const labelStr = String(label);
                            const item = salaryByLevel.find(
                              (d) => d.shortLabel === labelStr
                            );
                            return item
                              ? `${item.level} (${item.years})`
                              : labelStr;
                          }}
                        />
                        <Bar dataKey="salary" radius={[6, 6, 0, 0]} maxBarSize={48}>
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
                  <p className="text-gray-600 text-xs mt-4 text-center">
                    Sources: AmbitionBox, Glassdoor India, Analytics India Mag (2024-2025)
                  </p>
                </div>
              </motion.div>

              {/* Chart 2: Market Size Growth */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative rounded-[32px] border border-[#ffffff12] bg-[#0d1117] p-4 overflow-visible"
              >
                <div
                  className="absolute top-0 right-[20%] translate-x-1/2 w-[40%] h-[0.5px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #2756f7, transparent)",
                  }}
                />
                <div className="bg-[#111827] rounded-2xl p-6 sm:p-8 border border-blue-500/20">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    Data Analytics Market Growth
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    India market size in USD billions (~27% CAGR)
                  </p>
                  <div className="w-full h-[320px] sm:h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={marketGrowth}
                        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient
                            id="marketGradient"
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
                          domain={[0, 12]}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#111827",
                            border: "1px solid rgba(59, 130, 246, 0.3)",
                            borderRadius: "12px",
                            padding: "12px 16px",
                          }}
                          labelStyle={{ color: "#fff", fontWeight: 600, marginBottom: 4 }}
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
                          fill="url(#marketGradient)"
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
                  <p className="text-gray-600 text-xs mt-4 text-center">
                    Sources: IMARC Group, Grand View Research (India)
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Descriptive Text - Part 2 (below charts) */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto text-center mt-14"
            >
              Fuelled by Digital India initiatives, 5G rollout, and rapid cloud
              adoption, India&apos;s data analytics market is set to reach{" "}
              <span className="text-white font-semibold">
                $27 billion by 2033
              </span>
              . With a clear career ladder from ₹4 LPA at entry level to ₹50L+
              at the director level, there has never been a better time to
              invest in data analytics skills.
            </motion.p>
          </div>
        </section>

        {/* Curriculum Section */}
        <section id="course-details" className="relative py-10 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                <span className="font-bold">Curriculum Breakdown</span>
                <br />
                <span
                  className="italic font-normal  text-xl sm:text-2xl lg:text-3xl xl:text-4xl"
                  style={{
                    fontFamily:
                      '"IBM Plex Serif", "IBM Plex Serif Placeholder", serif',
                    letterSpacing: "-0.02em",
                  }}
                >
                  Your 3-month roadmap to becoming a{" "}
                  <span className="text-primary">job-ready Data Analyst.</span>{" "}
                </span>
              </h2>
            </motion.div>

            {/* Modal Overlay */}
            <AnimatePresence>
              {activeModule && (
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
              {activeModule && (
                <div className="fixed inset-0 grid place-items-center z-[101] p-4">
                  {/* Close Button (Mobile) */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.05 } }}
                    className="absolute top-4 right-4 lg:hidden flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full h-10 w-10 border border-white/20 hover:bg-white/20 transition-colors z-[102]"
                    onClick={() => setActiveModule(null)}
                    aria-label="Close modal"
                  >
                    <CloseIcon />
                  </motion.button>

                  {/* Expanded Card */}
                  <div ref={modalRef} role="dialog" aria-modal="true">
                    <ExpandedModuleCard
                      module={activeModule}
                      layoutId={`module-${activeModule.week}-${id}`}
                    />
                  </div>
                </div>
              )}
            </AnimatePresence>

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                <span className="font-bold">Tools & Technologies Covered</span>
                <br />
                <span
                  className="italic font-normal text-xl sm:text-2xl lg:text-3xl xl:text-4xl"
                  style={{
                    fontFamily:
                      '"IBM Plex Serif", "IBM Plex Serif Placeholder", serif',
                    letterSpacing: "-0.02em",
                  }}
                >
                  Industry-standard tools you will{" "}
                  <span className="text-primary">master in this program.</span>
                </span>
              </h2>
            </motion.div>

            {/* Tools Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-[1100px] mx-auto place-items-center">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <TiltedToolCard>
                      <Icon size={40} className="text-primary" />
                      <span className="text-white text-sm sm:text-base font-medium text-center">
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
