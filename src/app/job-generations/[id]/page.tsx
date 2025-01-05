import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "View Generation | AI Job Description Generator",
  description: "View details of a specific generation",
};

export default function ViewGenerationPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real application, you'd fetch the generation data based on the ID
  const mockGeneration = {
    id: params.id,
    type: "Job Description",
    title: "Software Engineer",
    date: "2023-05-15",
    content:
      "This is a placeholder for the generated content. In a real application, this would be the full text of the job description or LinkedIn message.",
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">View Generation</h1>
      <Card>
        <CardHeader>
          <CardTitle>{mockGeneration.title}</CardTitle>
          <CardDescription>
            {mockGeneration.type} • {mockGeneration.date}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{mockGeneration.content}</p>
        </CardContent>
      </Card>
      <Button asChild>
        <Link href="/dashboard">Back to Dashboard</Link>
      </Button>
    </div>
  );
}
