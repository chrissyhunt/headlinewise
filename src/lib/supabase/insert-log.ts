import { createServiceClient } from "@/lib/supabase/server";

interface Log {
  type: "success" | "error";
  from: string;
  message: string;
}

export const insertLog = async (details: Log) => {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("logs")
    .insert({ details: JSON.stringify(details) });
  if (error) throw new Error("Error saving log", { cause: error });
  return data;
};
