"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import { useCompletion } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { fetchLanguages } from "@/utils/fetchLanguages";
import removeMarkdown from "remove-markdown";

export default function GenerateLinkedInMessage() {
  const [candidateName, setCandidateName] = useState("John Doe");
  const [skills, setSkills] = useState<string[]>([
    "JavaScript",
    "React",
    "Node.js",
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const [companyName, setCompanyName] = useState("Tech Corp");
  const [outputLanguage, setOutputLanguage] = useState("");
  const [languages, setLanguages] = useState<
    { value: string; label: string }[]
  >([]);
  const [open, setOpen] = useState(false);

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/generate-linkedin-message",
  });

  useEffect(() => {
    const loadLanguages = async () => {
      const languages = await fetchLanguages();
      setLanguages(languages);
    };

    loadLanguages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = `Generate a LinkedIn outreach message to ${candidateName} for a ${jobTitle} position at ${companyName}. 
    The candidate's skills include: ${skills.join(", ")}.
    Output language: ${outputLanguage}.`;

    await complete(prompt);
  };

  const handleCopy = () => {
    const plainText = removeMarkdown(completion);
    navigator.clipboard.writeText(plainText);
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
                  {isLoading ? "Generating..." : "Generate LinkedIn Message"}
                </Button>
              </div>
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
