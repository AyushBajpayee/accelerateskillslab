"use client";

import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";
import { LampEffect } from "@/components/ui/lamp-effect";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle, Play, Star } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
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
                            3-Month Intensive Bootcamps
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                            <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">Transform from beginner to professional with our</span>
                            <br />
                            <span className="text-primary">Zero-to-Hero bootcamp</span>
                        </h1>

                        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                            Our intensive bootcamp takes you from complete beginner to job-ready professional. Master dashboards and visualization tools, or build production-grade pipelines and cloud infrastructure.
                        </p>

                        {/* Social Proof Badge with 5-Star Rating */}
                        {/* <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden"
                                        >
                                            <div className="w-full h-full bg-slate-200 dark:bg-slate-800" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className="fill-[#e0a210] text-[#e0a210]"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Join 10,000+ students worldwide
                                    </p>
                                </div>
                            </div>
                        </motion.div> */}

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <a href="#courses">
                                <MovingBorderButton
                                    borderRadius="1.75rem"
                                    duration={2000}
                                    className="h-14 px-10 text-lg bg-gradient-to-b from-[#2756f7] to-[#4a74ff] text-white"
                                    borderClassName="bg-[radial-gradient(var(--primary)_40%,transparent_60%)]"
                                >
                                    Find Your Program
                                    <ArrowRight size={20} className="ml-2" />
                                </MovingBorderButton>
                            </a>

                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
