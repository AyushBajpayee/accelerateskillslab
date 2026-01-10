"use client";

import { motion } from "motion/react";
import { BookOpen, Code, ArrowRight } from "lucide-react";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const courses = [
  {
    id: "data-analytics",
    category: "Course",
    categoryColor: "bg-primary",
    categoryTextColor: "text-primary",
    categoryIcon: BookOpen,
    title: "Data Analytics: Zero to Hero",
    description:
      "This redesigned curriculum condenses the complete data analytics journey into an intensive 3-month program suitable for full-time learners or highly committed part-time students. Master Excel, Python, SQL, Tableau, Power BI, and build portfolio projects that land interviews.",
    buttonText: "Learn More",
    buttonColor: "bg-green-500 hover:bg-green-600",
    link: "/courses/data-analytics",
  },
  {
    id: "data-engineering",
    category: "Course",
    categoryColor: "bg-primary",
    categoryTextColor: "text-primary",
    categoryIcon: Code,
    title: "Data Engineering Zero to Hero",
    description:
      "This intensive 3-month program transforms absolute beginners into job-ready data engineers through hands-on projects and industry-relevant skills. Master Python, SQL, Airflow, dbt, AWS, and build production-grade data pipelines.",
    buttonText: "Learn More",
    buttonColor: "bg-orange-500 hover:bg-orange-600",

    link: "/courses/data-engineering",
  },
];

export function Courses() {
  return (
    <section id="courses" className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
            Courses
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Master the tools. Build the infrastructure.
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl font-normal">
              Our bootcamp takes you from Zero to Hero.
            </span>
          </h3>
        </motion.div>

        {/* Parent Container with Border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[1200px] rounded-[32px] border border-[#ffffff12] bg-[#0d1117] p-6 overflow-visible"
        >
          {/* Blue Highlighter Glow - Bottom */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #2756f7, transparent)",
              boxShadow: "0 0 40px 10px rgba(39, 86, 247, 0.3)",
            }}
          />

          {/* Course Cards - Vertical Stack */}
          <div className="flex flex-col gap-6">
            {courses.map((course, index) => {
              const IconComponent = course.categoryIcon;
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-[#111827] rounded-2xl p-8 border border-white/5"
                >
                  {/* Category Label */}
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`w-3 h-3 rounded-full ${course.categoryColor}`}
                    />
                    <span
                      className={`text-sm font-medium ${course.categoryTextColor}`}
                    >
                      {course.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm sm:text-base mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* CTA Button */}
                  <Link href={course.link} className="inline-block">
                    <HoverBorderGradient
                      containerClassName="rounded-full hover:border-primary transition-colors duration-200"
                      as="div"
                      className="px-6 py-3 text-base font-medium text-white flex items-center justify-center"
                      innerStyle={{
                        background:
                          "radial-gradient(circle at center, #2756f7 0%, #1a3db8 50%, #0f2568 100%)",
                      }}
                    >
                      {course.buttonText}
                    </HoverBorderGradient>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
