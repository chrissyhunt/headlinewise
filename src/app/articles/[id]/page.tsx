import { createServiceClient } from "@/utils/supabase/server";

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const supabase = createServiceClient();

  const { data: article, error } = await supabase
    .from('articles')
    .select()
    .eq('id', params.id)
    .maybeSingle()

  // TODO: Render UI component that accepts article data
  return (
    <h1>{article?.title}</h1>
  )
}