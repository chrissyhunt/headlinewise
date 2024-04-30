import { createServiceClient } from "@/lib/supabase/server";

interface Article {
  title: string;
  description: string;
  author: string;
  url: string;
  url_to_image: string;
  content: string;
  published_at: string;
  source: string;
}

export const upsertArticles = async (
  articles: Article[],
  topicSlug: string
) => {
  const supabase = createServiceClient();
  const { data, error: articlesError } = await supabase
    .from("articles")
    .upsert(articles)
    .select("url");

  if (articlesError)
    throw new Error("Error saving articles", { cause: articlesError });

  if (data?.length) {
    const { error } = await supabase
      .from("article_topics")
      .insert(
        data.map((article) => ({ article: article.url, topic: topicSlug }))
      );

    if (error) throw new Error("Error saving article topics", { cause: error });
  }

  return data;
};
