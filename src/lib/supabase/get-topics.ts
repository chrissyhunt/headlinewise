import { createServiceClient } from "./server";

export const getTopics = async () => {
  const supabase = createServiceClient();
  const { data: topics, error } = await supabase
    .from("topics")
    .select("slug, query");
  return { topics, error };
};
