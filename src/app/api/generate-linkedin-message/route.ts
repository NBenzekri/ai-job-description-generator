import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(req: Request) {
  if (process.env.BLOCK_GENERATIONS === "true" || !process.env.OPENAI_MODEL) {
    return new Response("Generations are currently blocked.", { status: 403 });
  }

  const { prompt } = await req.json();

  const result = await streamText({
    model: openai(process.env.OPENAI_MODEL),
    maxTokens: parseInt(process.env.MAX_TOKENS) || 512,
    system: `You are a professional HR assistant specialized in creating LinkedIn outreach messages. 
    Reply only with the LinkedIn message in the specified language. 
    If no language is specified, reply in English.
    Leave a line break between paragraphs for better readability.
    Do not include any other phrases as intro or conclusion.`,
    prompt,
  });

  return result.toDataStreamResponse();
}
