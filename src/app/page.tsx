import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, FileText, MessageSquare, Zap } from "lucide-react";

export const metadata = {
  title: "AI Job Description Generator",
  description:
    "Generate professional job descriptions and outreach messages with AI",
};
export default function Home() {
  return (
    <main className="flex-grow">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-blue-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  AI-Powered Job Description Generator
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Create professional job descriptions and outreach messages in
                  seconds with the power of AI.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                <Link href="/generate-job-description">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/jobhunt.svg"
                alt="Job Hunt"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-white"
      >
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 mb-2 text-blue-600" />
                <CardTitle>AI-Powered Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Leverage advanced AI to create tailored job descriptions and
                  outreach messages in seconds.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 mb-2 text-blue-600" />
                <CardTitle>Customizable Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Choose from a variety of templates or create your own to match
                  your company&apos;s style and needs.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <MessageSquare className="h-8 w-8 mb-2 text-blue-600" />
                <CardTitle>LinkedIn Outreach</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Generate personalized LinkedIn messages to attract top talent
                  and improve your recruitment process.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Streamline Your Hiring Process
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our AI-powered tool helps HR professionals create compelling job
                descriptions and outreach messages quickly and efficiently. Save
                time, improve consistency, and attract the best candidates.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/generate-job-description">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Generate Job Description
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/generate-linkedin-message">
                <Button className="w-full" variant="outline">
                  Create LinkedIn Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
