# AI Job Description Generator

This project includes AI-powered generation of LinkedIn messages and job descriptions using OpenAI's GPT models.

## Live Demo

You can access the live demo of the AI Job Description Generator at [AI Job Description Generator](https://ai-job-description-generator.vercel.app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## AI Generator

### Job Description Generator

The job description generator creates detailed job descriptions and is accessible via the `/generate-job-description` API route.

### LinkedIn Message Generator

The LinkedIn message generator creates professional outreach messages and is accessible via the `/generate-linkedin-message` API route.

### Environment Variables

To control the AI generation, the following environment variables are used:

- `OPENAI_API_KEY`: Your OpenAI API key.
- `BLOCK_GENERATIONS`: Set to `true` to block AI generation requests.

### Blocking Generations

You can block all AI generation requests by setting the `BLOCK_GENERATIONS` environment variable to `true`. This will return a 403 response for any generation requests.
