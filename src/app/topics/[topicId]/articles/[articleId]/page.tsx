import { createServiceClient } from "@/utils/supabase/server";

export default async function ArticlePage({ params }: { params: { articleId: string }}) {
  const supabase = createServiceClient();

  const { data: article, error } = await supabase
  .from('articles')
  .select(`
    id,
    title,
    description,
    published_at,
    source ( id, name ),
    analysis (*)
  `)
  .eq('id', params.articleId)
  .maybeSingle()

  return (
    <>
      <h1>{article?.title}</h1>
      <p>{article?.description}</p>
    </>
  )
}