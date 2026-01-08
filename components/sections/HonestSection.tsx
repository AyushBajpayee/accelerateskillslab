"use client";

import { motion } from "motion/react";
import { X, CheckCircle2 } from "lucide-react";

export function HonestSection() {
    return (
        <section className="relative bg-slate-50 dark:bg-card py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Problem Statement */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            Let's be honest. Keeping up with{" "}
                            <span className="text-primary">Data & AI feels impossible</span>...
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            The field evolves daily. New tools, frameworks, and techniques emerge constantly.
                            Self-learning takes forever, and traditional degrees can't keep pace with industry demands.
                        </p>
                    </motion.div>

                    {/* Right Column - Solution Lists */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* You don't have to */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">You don't have to:</h3>
                            <ul className="space-y-3">
                                {[
                                    "Waste time on tutorials that don't lead anywhere",
                                    "Watch your hard-earned skills become outdated",
                                    "Learn alone without expert guidance",
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <X
                                            size={20}
                                            className="flex-shrink-0 mt-0.5 text-destructive"
                                        />
                                        <span className="text-muted-foreground">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Instead you could */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Instead you could:</h3>
                            <ul className="space-y-3">
                                {[
                                    "Master tools companies actually use",
                                    "Build real-world data engineering projects",
                                    "Learn from industry experts with proven track records",
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle2
                                            size={20}
                                            className="flex-shrink-0 mt-0.5 text-[#24c77e]"
                                        />
                                        <span className="text-foreground font-medium">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
