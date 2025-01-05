# AI Job Description Generator

This project includes AI-powered generation of LinkedIn messages and job descriptions using OpenAI's GPT models.

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

### LinkedIn Message Generator

The LinkedIn message generator creates professional outreach messages. It uses the `gpt-3.5-turbo` model and is accessible via the `/generate-linkedin-message` API route.

### Job Description Generator

The job description generator creates detailed job descriptions. It uses the `gpt-4-turbo` model and is accessible via the `/generate-job-description` API route.

### Environment Variables

To control the AI generation, the following environment variables are used:

- `OPENAI_API_KEY`: Your OpenAI API key.
- `BLOCK_GENERATIONS`: Set to `true` to block AI generation requests.

### Blocking Generations

You can block all AI generation requests by setting the `BLOCK_GENERATIONS` environment variable to `true`. This will return a 403 response for any generation requests.
