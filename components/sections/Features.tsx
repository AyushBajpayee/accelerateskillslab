"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { motion } from "motion/react";
import { BarChart3, Brain, Globe, Shield, Users, Zap } from "lucide-react";

const features = [
    {
        title: "Hands-on Cloud Labs",
        description: "Practice Data Engineering and AI pipelines in real cloud environments (AWS, Azure, GCP).",
        icon: Brain,
        className: "md:col-span-2",
    },
    {
        title: "Global Data Community",
        description: "Connect with data scientists and engineers worldwide.",
        icon: Globe,
        className: "md:col-span-1",
    },
    {
        title: "Expert Mentorship",
        description: "Get 1-on-1 guidance from Senior Data Engineers and AI Researchers.",
        icon: Users,
        className: "md:col-span-1",
    },
    {
        title: "Project Portfolio",
        description: "Build a portfolio of real-world data projects to showcase to employers.",
        icon: BarChart3,
        className: "md:col-span-2",
    },
    {
        title: "Enterprise Security",
        description: "Secure environments for corporate training and upskilling.",
        icon: Shield,
        className: "md:col-span-1",
    },
    {
        title: "Fast-Track to Senior",
        description: "Advanced curriculum designed to take you from junior to senior roles.",
        icon: Zap,
        className: "md:col-span-2",
    },
];

export function Features() {
    return (
        <section id="features" className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Unlock potential with <span className="text-primary">Data & AI</span>.
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Master the tools and technologies driving the future of innovation.
                    </p>
                </motion.div>

                <BentoGrid className="max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <BentoGridItem
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            icon={
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <feature.icon size={20} />
                                </div>
                            }
                            className={feature.className}
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
