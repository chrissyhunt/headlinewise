import { createServiceClient } from "@/lib/supabase/server";

export const getActiveTopics = async () => {
  const supabase = createServiceClient();
  const { data: topics } = await supabase
    .from("topics")
    .select("slug, query, articles(url)");
  return topics?.filter((t) => t.articles.length > 0);
};
