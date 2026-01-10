import type { Metadata } from "next";
import { Outfit, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({ subsets: ["latin"] });
const ibmPlexSerif = IBM_Plex_Serif({ 
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-ibm-plex-serif"
});

export const metadata: Metadata = {
  title: "Accelerate Skills Lab - The Data & AI Fast-Track",
  description: "Whether you want to build data products, become a data engineer, or lead AI at your company - we have the training, coaching, and community to get you there.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${outfit.className} ${ibmPlexSerif.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
