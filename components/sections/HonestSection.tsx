"use client";

import { motion } from "motion/react";
import { X, CheckCircle2 } from "lucide-react";

export function HonestSection() {
  const realityCheck = [
    "Drowning in Python, SQL, Spark tutorials with no clear direction",
    "Building toy projects that don't impress hiring managers",
    "Watching job postings demand skills you're still chasing",
  ];

  const shortcutThatWorks = [
    "Master the full data stack companies actually use",
    "Build production-grade pipelines and ML systems",
    "Get portfolio projects that land interviews",
  ];

  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            <span className="font-bold">
              Breaking into{" "}
              <span className="text-primary">data engineering careers</span>{" "}
              shouldn't feel this hard.
            </span>
            <br />
            <span
              className="italic font-normal"
              style={{
                fontFamily:
                  '"IBM Plex Serif", "IBM Plex Serif Placeholder", serif',
                letterSpacing: "-0.02em",
              }}
            >
              Our bootcamp makes the impossible possible.
            </span>
          </h2>
        </motion.div>

        {/* Parent Container with Border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative  p-4 sm:p-6 mx-auto w-full max-w-[1200px] rounded-[32px] border border-[#ffffff12] bg-[#0d1117] overflow-visible"
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

          {/* Two Cards Side by Side */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Card - You don't have to */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#111827] rounded-2xl p-5 sm:p-8"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                The reality check
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Where most aspiring data professionals get stuck
              </p>
              <ul className="space-y-4">
                {realityCheck.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <X size={18} className="shrink-0 mt-0.5 text-gray-500" />
                    <span className="text-gray-400 text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right Card - Instead you could */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative bg-[#111827] rounded-2xl p-5 sm:p-8 border border-blue-500/30"
            >
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-500/5 to-cyan-500/5 pointer-events-none" />

              <div className="relative">
                <h3 className="text-xl font-bold text-white mb-2">
                  The shortcut that works
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  How Accelerate Skills Lab gets you job-ready faster
                </p>
                <ul className="space-y-4">
                  {shortcutThatWorks.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={18}
                        className="shrink-0 mt-0.5 text-blue-500"
                      />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
