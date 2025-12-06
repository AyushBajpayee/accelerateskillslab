"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const blogs = [
    {
        title: "The Future of LLMs in Enterprise",
        description: "How Large Language Models are transforming business intelligence and decision making.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60",
        link: "#",
    },
    {
        title: "Data Engineering Roadmap 2025",
        description: "Essential skills and tools you need to master to become a Senior Data Engineer.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
        link: "#",
    },
];

export function Blog() {
    return (
        <section id="blog" className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold">Our Latest Blog</h2>
                    <Button variant="ghost" className="hidden md:flex gap-2">
                        View All <ArrowUpRight size={16} />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {blogs.map((blog, index) => (
                        <Card key={index} className="overflow-hidden border-transparent hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 bg-transparent group border p-0 gap-0">
                            <CardHeader className="p-0 overflow-hidden rounded-t-xl">
                                <div className="relative aspect-video w-full overflow-hidden">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{blog.title}</h3>
                                <p className="text-muted-foreground line-clamp-2">{blog.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
