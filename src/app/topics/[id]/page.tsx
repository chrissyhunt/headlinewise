import { createServiceClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function TopicPage({ params }: { params: { id: string } }) {
  const supabase = createServiceClient();

  const { data: topic, error } = await supabase
    .from('topics')
    .select(`
      id,
      query,
      articles ( id, title, description )
    `)
    .eq('id', params.id)
    .maybeSingle()


  return (
    <>
      <h1>{topic?.query}</h1>
      <ul>
        {topic?.articles?.map(a => (
          <li key={a.id}>
            <Link href={`/articles/${a.id}`}>{a.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}