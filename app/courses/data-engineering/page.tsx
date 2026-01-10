"use client";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";
import { LampEffect } from "@/components/ui/lamp-effect";
import { motion } from "motion/react";
import { ArrowRight, Calendar, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { HonestSection } from "@/components/sections/HonestSection";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Code } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

function ModuleCard({
  module,
  index,
}: {
  module: (typeof modules)[0];
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-[#111827] rounded-2xl p-6 sm:p-8 border border-blue-500/30 hover:border-blue-500/50 transition-colors">
      <div className="flex flex-col gap-4">
        {/* Week Badge and Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium">
              <Calendar size={16} />
              {module.week}
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors p-2 -mt-2 -mr-2 cursor-pointer"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <ChevronDown
              size={20}
              className={`transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Module Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {module.title}
        </h3>

        {/* Module Description */}
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
          {module.description}
        </p>

        {/* Expandable Sub-modules */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          {isExpanded && (
            <div className="pt-4 mt-4 border-t border-white/5">
              <div className="space-y-3">
                {module.subModules.map((subModule, subIndex) => {
                  // Remove numbered prefix (e.g., "1. ") if present
                  const cleanModule = subModule.replace(/^\d+\.\s*/, "");
                  // Split by " - " to separate title and description
                  const parts = cleanModule.split(" - ");
                  const title = parts[0];
                  const description = parts.slice(1).join(" - ");

                  return (
                    <div
                      key={subIndex}
                      className="text-gray-400 text-sm sm:text-base leading-relaxed"
                    >
                      {description ? (
                        <>
                          <span className="font-semibold text-white">
                            {title}
                          </span>
                          {" - " + description}
                        </>
                      ) : (
                        <span className="font-semibold text-white">
                          {title}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
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
        <section className="relative pt-[160px] pb-[120px] lg:pt-[160px] lg:pb-[120px] overflow-hidden">
          {/* Layered Aceternity Backgrounds */}
          <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60"
            fill="#2756f7"
          />
          <BackgroundBeams className="opacity-60" />

          {/* Sun Lamp Effect - positioned at bottom center */}
          <LampEffect className="opacity-80" fill="#2756f7" position="bottom" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center">
              {/* Text Content - Centered */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl text-center"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  3-Months Data Engineering Bootcamp
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                  <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                    Data Engineering
                  </span>
                  <br />
                  <span className="text-primary">Zero-to-Hero program</span>
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
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
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="a"
                    href="#course-details"
                    className="h-14 px-10 text-lg dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                  >
                    <span>Curriculum</span>
                    <ArrowRight size={20} />
                  </HoverBorderGradient>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <HonestSection />

        {/* Curriculum Section */}
        <section id="course-details" className="relative py-20 lg:py-32">
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
                  <span className="text-primary">job-ready Data Engineer.</span>{" "}
                </span>
              </h2>
            </motion.div>

            {/* Parent Container with Border */}
            <div className="flex flex-col gap-6">
              {modules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative mx-auto w-full max-w-[1200px] rounded-[32px] border border-[#ffffff12] bg-[#0d1117] p-4 overflow-visible"
                >
                  {/* Blue Highlighter Glow - Bottom */}
                  <div
                    className="absolute bottom-0 left-[20%] -translate-x-1/2 w-[40%] h-[0.5px] rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #2756f7, transparent)",
                    }}
                  />

                  {/* Blue Highlighter Glow - Top Right */}
                  <div
                    className="absolute top-0 right-[20%] translate-x-1/2 w-[40%] h-[0.5px] rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #2756f7, transparent)",
                    }}
                  />

                  {/* Module  */}
                  <ModuleCard module={module} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
        <Footer />
      </div>
    </main>
  );
}
