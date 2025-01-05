// "use client";

import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { Nav } from "@/components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Job Description Generator",
  description:
    "Generate professional job descriptions and outreach messages with AI",
  keywords:
    "AI, job description, LinkedIn message, OpenAI, GPT, HR, recruitment",
  openGraph: {
    title: "AI Job Description Generator",
    description:
      "Generate professional job descriptions and outreach messages with AI",
    url: "https://ai-job-description-generator.vercel.app",
    images: [
      {
        url: "/jobhunt.svg",
        width: 800,
        height: 600,
        alt: "AI Job Description Generator",
      },
    ],
    siteName: "AI Job Description Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Job Description Generator",
    description:
      "Generate professional job descriptions and outreach messages with AI",
    images: [
      {
        url: "/jobhunt.svg",
        alt: "AI Job Description Generator",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col container mx-auto p-4 min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            // enableSystem={false}
            // disableTransitionOnChange
          >
            <AuthProvider>
              <Nav />
              {children}
              <Footer />
              <Toaster />
              <SpeedInsights />
              <Analytics />
            </AuthProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
