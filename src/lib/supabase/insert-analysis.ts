import { Database } from "@/database.types";
import { createServiceClient } from "@/lib/supabase/server";

export type Analysis = Database["public"]["Tables"]["analysis"]["Insert"];

export const insertAnalysis = async (insertData: Analysis | Analysis[]) => {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("analysis")
    // supabase allows single object or array insertion but this satisfies ts
    .insert(Array.isArray(insertData) ? insertData : [insertData]);
  if (error) throw new Error("Error saving analysis", { cause: error });
  return data;
};
