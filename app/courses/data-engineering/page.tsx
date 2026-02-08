"use client";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";
import { LampEffect } from "@/components/ui/lamp-effect";
import { motion } from "motion/react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Navbar } from "@/components/sections/Navbar";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Code } from "lucide-react";
import Link from "next/link";
import { TiltedToolCard } from "@/components/ui/TiltedToolCard";
import {
  SiPython,
  SiPostgresql,
  SiPandas,
  SiNumpy,
  SiDocker,
  SiApacheairflow,
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
  { name: "Pandas", icon: SiPandas },
  { name: "NumPy", icon: SiNumpy },
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
  { level: "Director/Principal", shortLabel: "Director", salary: 70, years: "Director" },
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
  category: "Course",
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
    week: "Week 1-4",
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
    week: "Week 5-7",
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
    week: "Week 8-11",
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
    week: "Week 12-15",
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
    week: "Week 16-20",
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

// Module images mapping
const moduleImages: Record<string, string> = {
  "Week 1-4": "/courses/data-engineering/week1_4.png",
  "Week 5-7": "/courses/data-engineering/week5_7.png",
  "Week 8-11": "/courses/data-engineering/week8_11.png",
  "Week 12-15": "/courses/data-engineering/week12_15.png",
  "Week 16-20": "/courses/data-engineering/week16_20.png",
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
                src="/courses/data-engineering/data-eng-hero.png"
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

function ModuleCard({
  module,
  index,
}: {
  module: (typeof modules)[0];
  index: number;
}) {
  const moduleImage = moduleImages[module.week];

  return (
    <Dialog>
      <div className="relative bg-[#111827] rounded-2xl p-6 sm:p-8 border border-blue-500/30 hover:border-blue-500/50 transition-colors">
        {/* Expand Button - Top Right */}
        <DialogTrigger asChild>
          <button
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 transition-all group"
            aria-label="Expand module details"
          >
            <Expand size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
          </button>
        </DialogTrigger>

        <div className="flex flex-col gap-4 pr-12">
          {/* Week Badge */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium">
              <Calendar size={16} />
              {module.week}
            </div>
          </div>

          {/* Module Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {module.title}
          </h3>

          {/* Module Description */}
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {module.description}
          </p>
        </div>
      </div>

      {/* Modal Content */}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d1117] border-[#ffffff12] p-0">
        {/* Image Section */}
        {moduleImage && (
          <div className="relative w-full rounded-t-lg overflow-hidden bg-[#0a0f1a]">
            <Image
              src={moduleImage}
              alt={module.title}
              width={1024}
              height={576}
              className="w-full h-auto object-contain"
            />
          </div>
        )}

        <div className="px-6 pt-5 pb-8 space-y-5">
          <DialogHeader className="space-y-2">
            {/* Week Badge in Modal */}
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium">
                <Calendar size={14} />
                {module.week}
              </div>
            </div>

            <DialogTitle className="text-lg sm:text-xl font-bold text-white">
              {module.title}
            </DialogTitle>

            <DialogDescription className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              {module.description}
            </DialogDescription>
          </DialogHeader>

          {/* Detailed Sub-modules */}
          <div className="pt-4 border-t border-white/10">
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function DataEngineeringPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Grid overlay for technical aesthetic - Applied to all sections */}
      <div className="fixed inset-0 bg-size-[20px_20px] bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] opacity-30 pointer-events-none" />

      <div className="relative z-10">
        <Navbar />

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
                  3-Months Data Engineering Bootcamp
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                  <span className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl">
                    Data Engineering
                  </span>
                  <br />
                  <span className="text-primary">Zero-to-Hero program</span>
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed max-w-lg">
                  This intensive 3-month program transforms absolute beginners
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

        {/* Data Engineering as a Career Section */}
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
                <span className="font-bold">Data Engineering as a Career</span>
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
              Data engineering is among the fastest-growing tech specializations
              in India. NASSCOM-Deloitte projects AI and data talent demand to
              grow from 650,000 to over{" "}
              <span className="text-white font-semibold">
                1.25 million by 2027
              </span>
              , with data engineers seeing a strong hiring rebound in 2025 —
              led by BFSI (57% of roles) and concentrated in Bengaluru and
              Hyderabad.
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
                    Average India data engineer compensation by seniority (LPA)
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
                    Big Data Market Growth
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    India market size in USD billions (~11.5% CAGR)
                  </p>
                  <div className="w-full h-[320px] sm:h-[360px]">
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
                  <p className="text-gray-600 text-xs mt-4 text-center">
                    Source: Mordor Intelligence (India Big Data Market)
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
              Powered by cloud-first enterprise strategies, Digital India
              initiatives, and data localization norms, India&apos;s big data
              market is on track to reach{" "}
              <span className="text-white font-semibold">
                $28.9 billion by 2030
              </span>
              . With a career ladder from ₹6 LPA at entry level to ₹70L+ at
              the director level, data engineering offers one of the steepest
              salary growth curves in tech.
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
                  <span className="text-primary">
                    job-ready Data Engineer.
                  </span>{" "}
                </span>
              </h2>
            </motion.div>

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
                      <ModuleCard module={module} index={index} />
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
