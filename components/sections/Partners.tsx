import { Component } from "lucide-react";

const partners = [
    { name: "Contentful", logo: "Contentful" },
    { name: "Webflow", logo: "Webflow" },
    { name: "Airtable", logo: "Airtable" },
    { name: "Atlassian", logo: "Atlassian" },
    { name: "Freshworks", logo: "Freshworks" },
];

export function Partners() {
    return (
        <section className="py-10 border-y bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm font-medium text-muted-foreground mb-8">
                    Trusted by leading companies worldwide
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {partners.map((partner) => (
                        <div key={partner.name} className="flex items-center gap-2 text-xl font-bold text-foreground/80">
                            {/* Placeholder for logo */}
                            <Component className="w-6 h-6" />
                            <span>{partner.logo}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
