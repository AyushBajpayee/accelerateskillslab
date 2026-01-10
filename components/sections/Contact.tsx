"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { motion } from "motion/react";
import { Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <section id="contact" className="relative py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Centered Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                        Ready to start your zero-to-hero journey?
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Get in touch to learn more about our 3-month intensive bootcamp programs. We'll help you choose the right path for your career.
                    </p>
                </motion.div>

                {/* Parent Container with Border */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative mx-auto w-full max-w-2xl rounded-[32px] border border-[#ffffff12] bg-[#0d1117] overflow-visible"
                >
                    {/* Blue Highlighter Glow - Bottom */}
                    <div 
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] rounded-full"
                        style={{
                            background: "linear-gradient(90deg, transparent, #2756f7, transparent)",
                            boxShadow: "0 0 40px 10px rgba(39, 86, 247, 0.3)",
                        }}
                    />

                    <div className="p-6">
                        {/* Form Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-[#111827] rounded-2xl p-8 border border-white/5 w-full max-w-2xl mx-auto"
                        >
                            <h3 className="text-2xl font-bold text-white mb-6">Reach out to us</h3>
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                                    <p className="text-gray-400">We'll get back to you shortly to help you start your journey.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                                            <Input id="name" name="name" placeholder="John Doe" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                                            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="course" className="text-sm font-medium text-gray-300">Course Interested</label>
                                        <Select id="course" name="course" required>
                                            <option value="">Select a course</option>
                                            <option value="data-analytics">Data Analytics: Zero to Hero</option>
                                            <option value="data-engineering">Data Engineering Zero to Hero</option>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                                        <Textarea 
                                            id="message" 
                                            name="message" 
                                            placeholder="Tell us about your goals and we'll help you choose the right bootcamp program." 
                                            className="min-h-[100px]" 
                                            required 
                                        />
                                    </div>
                                    <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </Button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
