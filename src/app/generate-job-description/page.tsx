"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import { useCompletion } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { X, Check, ChevronsUpDown, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function GenerateJobDescription() {
  const [jobTitle, setJobTitle] = useState("Full Stack Java React Developer");
  const [location, setLocation] = useState("San Francisco, CA");
  const [department, setDepartment] = useState("Engineering");
  const [skills, setSkills] = useState<string[]>([
    "Java",
    "React",
    "Spring Boot",
    "REST APIs",
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("mid");
  const [responsibilities, setResponsibilities] = useState(
    "Develop and maintain web applications using Java and React. Collaborate with cross-functional teams to define, design, and ship new features. Ensure the performance, quality, and responsiveness of applications."
  );
  const [companyInfo, setCompanyInfo] = useState(
    "Our company is a leading tech firm with over 500 employees, specializing in innovative software solutions and cutting-edge technology."
  );
  const [outputLanguage, setOutputLanguage] = useState("");
  const [languages, setLanguages] = useState<
    { value: string; label: string }[]
  >([]);
  const [open, setOpen] = useState(false);

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/generate-job-description",
  });

  useEffect(() => {
    const fetchLanguages = async () => {
      const url = "https://restcountries.com/v3.1/all";
      try {
        const response = await fetch(url);
        const data = await response.json();
        const languagesSet = new Set<string>();
        data.forEach((country) => {
          Object.values(country.languages || {}).forEach((language) =>
            languagesSet.add(language)
          );
        });
        setLanguages(
          Array.from(languagesSet).map((language) => ({
            value: language,
            label: language,
          }))
        );
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLanguages();
  }, []);

  console.log("completion", completion, isLoading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = `Generate a detailed job description for a ${jobTitle} position in ${location} for the ${department} department. 
    Company information: ${companyInfo}.
    Required skills: ${skills.join(", ")}. 
    Experience level: ${experienceLevel}. 
    Key responsibilities: ${responsibilities}. 
    Output language: ${outputLanguage}.
    At the end of the job description, add a summary of the job description and future opportunities.
    Please provide a structured and well-formatted description with icons and formal language.`;

    await complete(prompt);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(completion);
    toast({
      title: "Copied to clipboard",
      description: "The job description has been copied to your clipboard.",
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
      <h1 className="text-3xl font-bold mb-4">AI Job Description Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Input Job Details</CardTitle>
            <CardDescription>
              Fill in the details to generate a job description
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Input
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
              <Textarea
                placeholder="Company Information"
                value={companyInfo}
                onChange={(e) => setCompanyInfo(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Required Skills</label>
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
              <Select onValueChange={(value) => setExperienceLevel(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                  <SelectItem value="senior">
                    Senior Level (5+ years)
                  </SelectItem>
                  <SelectItem value="lead">Lead/Manager (7+ years)</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Key Responsibilities"
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
                className="min-h-[100px]"
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full md:w-[300px] justify-between"
                  >
                    {outputLanguage
                      ? languages.find(
                          (language) => language.value === outputLanguage
                        )?.label
                      : "Select the output language..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full md:w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            key={language.value}
                            value={language.value}
                            onSelect={(currentValue) => {
                              setOutputLanguage(
                                currentValue === outputLanguage
                                  ? ""
                                  : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            {language.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                outputLanguage === language.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="pt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Generating..." : "Generate Job Description"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generated Job Description</CardTitle>
            <CardDescription>
              AI-generated job description based on your inputs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-muted p-4 rounded-md min-h-[300px]">
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={handleCopy}
              >
                <Copy className="w-5 h-5" />
              </Button>
              <ReactMarkdown>{completion}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
