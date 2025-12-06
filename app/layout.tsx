import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Accelerate Skills Lab - Future of Learning",
  description: "Unlock learning with expert-led courses and AI-driven platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
