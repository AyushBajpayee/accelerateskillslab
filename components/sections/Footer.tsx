import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-8 lg:px-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-4">
                        <Link href="/" className="font-bold text-2xl text-primary">
                            AccelerateSkillsLab
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-md">
                            Empowering teams with AI-driven learning solutions for the future of work.
                        </p>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        <p>&copy; {new Date().getFullYear()} AccelerateSkillsLab. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
