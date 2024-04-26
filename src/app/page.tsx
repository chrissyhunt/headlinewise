import { createServiceClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = createServiceClient();

  const {
    data: topics,
  } = await supabase.from('topics').select();

  return (
    <main>
      <h1>Select a topic...</h1>
      <ul>
        {topics?.map((t) => (
          <li key={t.id}>
            <Link href={`/topics/${t.id}`}>{t.query}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
