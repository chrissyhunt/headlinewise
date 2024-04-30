import { createServiceClient } from "./server";

export const getTopics = async () => {
  const supabase = createServiceClient();
  const { data, error } = await supabase.from("topics").select("slug, query");
  if (error) throw new Error("Error retrieving topics", { cause: error });
  return data;
};
