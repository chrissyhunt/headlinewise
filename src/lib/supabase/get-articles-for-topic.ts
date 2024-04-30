import { createServiceClient } from "@/lib/supabase/server";

export const getArticlesForTopic = async (topicSlug: string) => {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("topics")
    .select(
      `
      slug,
      query,
      articles ( url, title, description, published_at, analysis (id) )
    `
    )
    .eq("slug", topicSlug)
    .maybeSingle();

  const topic = { slug: data?.slug, query: data?.query };
  const articles = data?.articles.filter((a) => a.analysis.length > 0);

  return { topic, articles };
};
