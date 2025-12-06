"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Play } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob" />
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000" />
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-4000" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            AI-Powered Data Skills Platform
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                            Master Data & AI with <span className="text-primary">Expert-Led</span> Courses
                        </h1>

                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                            Accelerate your career with hands-on projects in Data Engineering, Data Science, and Artificial Intelligence.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="h-12 px-8 text-base">
                                Start Learning
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base gap-2">
                                <Play size={16} className="fill-current" />
                                Watch Demo
                            </Button>
                        </div>

                        <div className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                                        {/* Placeholder avatars */}
                                        <div className="w-full h-full bg-slate-200 dark:bg-slate-800" />
                                    </div>
                                ))}
                            </div>
                            <p>Trusted by 10,000+ students worldwide</p>
                        </div>
                    </motion.div>

                    {/* Image/Visual Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative lg:h-[600px] w-full flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-md lg:max-w-full aspect-[4/5] lg:aspect-auto lg:h-full rounded-3xl overflow-hidden bg-muted/50 border border-white/10 shadow-2xl">
                            {/* Main Hero Image Placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10" />

                            {/* Floating Cards */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="absolute top-12 left-4 md:left-12 bg-background/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 max-w-[200px]"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Course Completed</p>
                                        <p className="font-bold text-sm">Data Engineering</p>
                                    </div>
                                </div>
                                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-green-500 h-full w-full rounded-full" />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                                className="absolute bottom-20 right-4 md:right-12 bg-background/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                        A+
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Top Student</p>
                                        <p className="text-xs text-muted-foreground">Keep it up!</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
