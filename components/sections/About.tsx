"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";

const team = [
    {
        name: "Sarah Johnson",
        role: "Head of Data Science",
        image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah",
    },
    {
        name: "Michael Chen",
        role: "Lead AI Engineer",
        image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Michael",
    },
    {
        name: "Emily Davis",
        role: "Data Infrastructure Lead",
        image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Emily",
    },
    {
        name: "David Wilson",
        role: "Community Manager",
        image: "https://api.dicebear.com/9.x/avataaars/svg?seed=David",
    },
];

export function About() {
    return (
        <section id="about" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Team</h2>
                        <p className="text-muted-foreground text-lg">
                            Meet the experts behind the platform dedicated to your success.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        {/* Optional decorative element or link */}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="text-center hover:shadow-lg hover:border-primary hover:shadow-primary/10 transition-all duration-300 border-muted bg-background">
                                <CardContent className="pt-6">
                                    <div className="mb-4 flex justify-center">
                                        <Avatar className="w-24 h-24 border-4 border-primary/10">
                                            <AvatarImage src={member.image} alt={member.name} />
                                            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                                    <p className="text-sm text-muted-foreground text-primary font-medium">{member.role}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
