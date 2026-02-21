"use client";

import { motion } from "motion/react";
import { BookOpen, Code, ArrowRight } from "lucide-react";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const courses = [
  {
    id: "data-engineering",
    category: "Program",
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
  {
    id: "data-analytics",
    category: "Program",
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
];

export function Courses() {
  return (
    <section id="courses" className="relative py-10 lg:py-20 ">
      <div className="container mx-auto px-4 sm:px-8 lg:px-20">
        {/* Centered Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-2xl font-bold text-primary mb-4">
            Programs
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl text-center mb-4">
            <span className="font-bold">Master</span>{" "}
            <span className="font-bold">the</span>{" "}
            <span className="text-primary font-bold">Tools.</span>{" "}
            <span className="font-bold">Build</span>{" "}
            <span
              className="italic"
              style={{ fontFamily: '"IBM Plex Serif", serif' }}
            >
              the
            </span>{" "}
            <span className="text-primary font-bold">Infrastructure.</span>
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-center max-w-3xl mx-auto">
            Our bootcamp takes you from Zero to Hero.
          </p>
        </motion.div>

        {/* Parent Container with Border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative p-3 sm:p-4 md:p-5 lg:p-6 mx-auto w-full max-w-[1200px] rounded-3xl md:rounded-[32px] border border-[#ffffff12] bg-[#0d1117] overflow-visible"
        >
          {/* Blue Highlighter Glow - Bottom */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #47CAFF, #2756f7, #47CAFF, transparent)",
              boxShadow: "0 0 40px 10px rgba(71, 202, 255, 0.3)",
            }}
          />

          {/* Course Cards - Vertical Stack */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {courses.map((course, index) => {
              const IconComponent = course.categoryIcon;
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-[#111827] rounded-xl md:rounded-2xl px-4 py-4 sm:px-5 sm:py-5 md:p-6 lg:p-8 border border-white/5"
                >
                  {/* Category Label */}
                  <div className="flex items-center gap-1.5 mb-2 sm:mb-3 md:mb-4">
                    <div
                      className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${course.categoryColor}`}
                    />
                    <span
                      className={`text-xs md:text-sm font-medium ${course.categoryTextColor}`}
                    >
                      {course.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-4 md:mb-5 lg:mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* CTA Button */}
                  <Link href={course.link} className="inline-block">
                    <HoverBorderGradient
                      containerClassName="rounded-full hover:border-primary transition-colors duration-200"
                      as="div"
                      className="px-5 py-2 text-sm md:px-6 md:py-2.5 lg:py-3 md:text-base font-medium text-white flex items-center justify-center"
                      innerStyle={{
                        background:
                          "radial-gradient(circle at center, #47CAFF 0%, #2756f7 45%, #0f2568 100%)",
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
