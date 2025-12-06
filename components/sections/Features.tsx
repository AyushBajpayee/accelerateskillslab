"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
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
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Unlock potential with <span className="text-primary">Data & AI</span>.
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Master the tools and technologies driving the future of innovation.
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={feature.className}
                        >
                            <Card className="h-full bg-muted/30 border-muted hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                        <feature.icon size={24} />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section >
    );
}
