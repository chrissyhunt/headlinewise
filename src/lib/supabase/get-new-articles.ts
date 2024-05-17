import { createServiceClient } from "@/lib/supabase/server";

export const getNewArticles = async () => {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("articles")
    .select("url,title,description,analysis(id)")
    .order("created_at", { ascending: false });

  if (error) throw new Error("Error getting articles", { cause: error });
  const articlesWithoutAnalysis = data?.filter((a) => a.analysis.length < 1);
  return articlesWithoutAnalysis;
};
