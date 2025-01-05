import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Force the route to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(req: Request) {
  if (process.env.BLOCK_GENERATIONS === "true") {
    return new Response("Generations are currently blocked.", { status: 403 });
  }

  const { prompt } = await req.json();

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    system: `You are a professional HR assistant specialized in creating job descriptions. 
    Reply only with the job description in the specified language. 
    If no language is specified, reply in English.
    Leave a line break between paragraphs for better readability.
    Do not include any other phrases as intro or conclusion.`,
    prompt,
  });

  return result.toDataStreamResponse();
}
