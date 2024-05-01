import AccountForm from "./account-form";
import { createClient } from "@/lib/supabase/server";

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("USER: ", user);

  return <AccountForm user={user} />;
}
