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
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const course = {
  id: "data-analytics",
  category: "Course",
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
      "Learn the critical skills that consume 60-80% of real analyst work—preparing messy data for analysis.",
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

export default function DataAnalyticsPage() {
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
                  3-Months Data Analytics Bootcamp
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                  <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                    Data Analytics
                  </span>
                  <br />
                  <span className="text-primary">Zero-to-Hero program</span>
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
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
                  <span className="text-primary">job-ready Data Analyst.</span>{" "}
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
