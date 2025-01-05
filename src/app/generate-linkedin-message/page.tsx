"use client";

import { useState, KeyboardEvent } from "react";
import { useCompletion } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function GenerateLinkedInMessage() {
  const [candidateName, setCandidateName] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/generate-linkedin-message",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = `Generate a LinkedIn outreach message to ${candidateName} for a ${jobTitle} position at ${companyName}. 
    The candidate's skills include: ${skills.join(", ")}.`;

    await complete(prompt);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(completion);
    toast({
      title: "Copied to clipboard",
      description: "The LinkedIn message has been copied to your clipboard.",
    });
  };

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">LinkedIn Message Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Input Candidate Details</CardTitle>
            <CardDescription>
              Fill in the details to generate a LinkedIn message
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Candidate Name"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Candidate Skills</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-xs"
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button type="button" onClick={addSkill}>
                    Add
                  </Button>
                </div>
              </div>
              <Input
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <Input
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate LinkedIn Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generated LinkedIn Message</CardTitle>
            <CardDescription>
              AI-generated LinkedIn message based on your inputs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md min-h-[300px]">
              {completion}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleCopy}>Copy to Clipboard</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
