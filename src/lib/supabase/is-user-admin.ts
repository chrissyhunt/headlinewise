"use server";
import { createClient } from "@/lib/supabase/server";

export const isUserAdmin = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data: userProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .maybeSingle();

  return userProfile?.role === "admin";
};
