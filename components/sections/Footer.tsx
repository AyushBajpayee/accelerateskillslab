import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-muted/30 border-t pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="space-y-4">
                        <Link href="/" className="font-bold text-2xl text-primary">
                            AccelerateSkillsLab
                        </Link>
                        <p className="text-muted-foreground text-sm">
                            Empowering teams with AI-driven learning solutions for the future of work.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Facebook size={20} />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter size={20} />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Linkedin size={20} />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Instagram size={20} />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary">Features</Link></li>
                            <li><Link href="#" className="hover:text-primary">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-primary">Enterprise</Link></li>
                            <li><Link href="#" className="hover:text-primary">Case Studies</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary">Blog</Link></li>
                            <li><Link href="#" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-primary">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} AccelerateSkillsLab. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-primary">Privacy</Link>
                        <Link href="#" className="hover:text-primary">Terms</Link>
                        <Link href="#" className="hover:text-primary">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
