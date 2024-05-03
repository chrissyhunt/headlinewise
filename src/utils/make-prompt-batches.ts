import { Database } from "@/database.types";
import chunk from "lodash.chunk";

const MAX_PROMPTS_PER_REQUEST = 20;

interface Article {
  url: string;
  title: string | null;
  description: string | null;
}

export const makePromptBatches = (articles: Article[]) => {
  const prompts = articles.map((article) => ({
    url: article.url!,
    prompt: `${article.title!}. ${article.description!}`,
  }));
  return chunk(prompts, MAX_PROMPTS_PER_REQUEST);
};
