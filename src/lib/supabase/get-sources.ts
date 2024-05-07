import { createServiceClient } from "@/lib/supabase/server";

export const getSources = async () => {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("sources")
    .select("id, name")
    .eq("active", true);
  if (error) throw new Error("Error retrieving sources", { cause: error });
  return data;
};
