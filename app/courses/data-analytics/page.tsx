import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DataAnalyticsPage() {
    return (
        <main className="relative min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-4xl mx-auto">
                    <Link href="/">
                        <Button variant="ghost" className="mb-8">
                            ← Back to Home
                        </Button>
                    </Link>
                    
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                        Data Analytics: Zero to Hero
                    </h1>
                    
                    <div className="prose prose-invert max-w-none">
                        <p className="text-xl text-muted-foreground mb-8">
                            This redesigned curriculum condenses the complete data analytics journey into an intensive 3-month program suitable for full-time learners or highly committed part-time students. The structure prioritizes hands-on, project-based learning with a maximum of 6 sub-modules per main topic.
                        </p>
                        
                        <p className="text-muted-foreground">
                            Course content coming soon. This page will display the full curriculum, modules, and enrollment information.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
