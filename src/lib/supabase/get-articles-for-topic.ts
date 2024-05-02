import { createServiceClient } from "@/lib/supabase/server";

const MAX_RECENT_ARTICLES = 18;

export const getArticlesForTopic = async (topicSlug: string) => {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("topics")
    .select(
      `
      slug,
      query,
      articles ( url, title, description, published_at, analysis (id, approved) )
    `
    )
    .eq("slug", topicSlug)
    .maybeSingle();

  if (error) throw new Error("Error retrieving topic", { cause: error });

  const topic = { slug: data?.slug, query: data?.query };
  const articles = data?.articles
    .filter((a) => a.analysis.length > 0)
    // @ts-ignore
    .sort((a, b) => new Date(b.published_at!) - new Date(a.published_at!))
    .slice(0, MAX_RECENT_ARTICLES);

  return { topic, articles };
};
