import { createServiceClient } from "./server";

export const getAnalysisData = async () => {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("analysis")
    .select("*, articles(source)");
  if (error)
    throw new Error("Error retrieving analysis data", { cause: error });
  return data;
};
