# 🦉 HeadlineWise

HeadlineWise is a media literacy training tool built with [Next.js](https://nextjs.org/) and [Supabase](https://supabase.com/). It retrieves headlines from the [News API](https://newsapi.org/), and uses [Anthropic's Claude AI](https://www.anthropic.com/) and [OpenAI](https://openai.com/) for headline analysis.

## Local Development

To start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Note: You will need a `.env.local` in the root of the project to connect to Supabase, the News API, and AI tools, or to send requests to app API endpoints.

## Deployment

Code merged to the `main` branch is automatically deployed to Vercal.
