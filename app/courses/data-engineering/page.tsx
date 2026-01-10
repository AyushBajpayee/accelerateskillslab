"use client";

import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";
import { LampEffect } from "@/components/ui/lamp-effect";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { HonestSection } from "@/components/sections/HonestSection";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Code } from "lucide-react";
import Link from "next/link";

const course = {
    id: "data-engineering",
    category: "Course",
    categoryColor: "bg-orange-500",
    categoryTextColor: "text-orange-500",
    categoryIcon: Code,
    title: "Data Engineering Zero to Hero",
    description: "This intensive 3-month program transforms absolute beginners into job-ready data engineers through hands-on projects and industry-relevant skills. Master Python, SQL, Airflow, dbt, AWS, and build production-grade data pipelines.",
    buttonText: "Enroll Now",
    buttonColor: "bg-orange-500 hover:bg-orange-600",
};

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
                    <LampEffect 
                        className="opacity-80"
                        fill="#2756f7"
                        position="bottom"
                    />

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
                                    <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">Data Engineering</span>
                                    <br />
                                    <span className="text-primary">Zero-to-Hero program</span>
                                </h1>

                                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                                This intensive 3-month program transforms absolute beginners into job-ready data engineers through hands-on projects and industry-relevant skills. Master Python, SQL, Airflow, dbt, AWS, and build production-grade data pipelines.
                                </p>

                                {/* CTA Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.4 }}
                                    className="flex flex-col sm:flex-row gap-4 justify-center"
                                >
                                    <a href="#course-details">
                                        <MovingBorderButton
                                            borderRadius="1.75rem"
                                            duration={2000}
                                            className="h-14 px-10 text-lg bg-gradient-to-b from-[#2756f7] to-[#4a74ff] text-white"
                                            borderClassName="bg-[radial-gradient(var(--primary)_40%,transparent_60%)]"
                                        >
                                            Curriculum
                                            <ArrowRight size={20} className="ml-2" />
                                        </MovingBorderButton>
                                    </a>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <HonestSection />

                <Contact />
                <Footer />
            </div>
        </main>
    );
}
