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
import { TooltipProvider } from "@/components/ui/tooltip";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free AI Job Description Generator",
  description:
    "Generate professional job descriptions and outreach messages with AI for Free",
  keywords:
    "AI, job description, LinkedIn message, OpenAI, GPT, HR, recruitment, Free AI Job Description Generator, Free",
  openGraph: {
    title: "Free AI Job Description Generator",
    description:
      "Generate professional job descriptions and outreach messages with AI for Free",
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
    title: "Free AI Job Description Generator",
    description:
      "Generate professional job descriptions and outreach messages with AI for Free",
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
            <TooltipProvider>
              <AuthProvider>
                <Nav />
                {children}
                <Footer />
                <Toaster />
                <SpeedInsights />
                <Analytics />
              </AuthProvider>
            </TooltipProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
