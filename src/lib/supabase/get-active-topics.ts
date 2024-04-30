import { createServiceClient } from "@/lib/supabase/server";

export const getActiveTopics = async () => {
  const supabase = createServiceClient();
  const { data: topics, error } = await supabase
    .from("topics")
    .select("slug, query, articles(url)");
  if (error) throw new Error("Error retrieving topics", { cause: error });
  return topics?.filter((t) => t.articles.length > 0);
};
