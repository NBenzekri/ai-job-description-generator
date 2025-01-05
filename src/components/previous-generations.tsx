import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// This is a mock data structure. In a real application, you'd fetch this data from your backend.
const mockGenerations = [
  {
    id: 1,
    type: "Job Description",
    title: "Software Engineer",
    date: "2023-05-15",
  },
  {
    id: 2,
    type: "LinkedIn Message",
    title: "Product Manager Outreach",
    date: "2023-05-14",
  },
  {
    id: 3,
    type: "Job Description",
    title: "Marketing Specialist",
    date: "2023-05-13",
  },
];

export function PreviousGenerations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Previous Generations</CardTitle>
        <CardDescription>
          Your recent job descriptions and LinkedIn messages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockGenerations.map((gen) => (
            <li
              key={gen.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{gen.title}</p>
                <p className="text-sm text-gray-500">
                  {gen.type} • {gen.date}
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href={`/view-generation/${gen.id}`}>View</Link>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
