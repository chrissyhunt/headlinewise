import { createServiceClient } from "@/utils/supabase/server";

export default async function ArticleModal({ params }: { params: { articleId: string } }) {
  const supabase = createServiceClient();

  const { data: article, error } = await supabase
    .from('articles')
    .select()
    .eq('id', params.articleId)
    .maybeSingle()

  // TODO: Render Modal wrapping article component that accepts data
  return (
    <h1>{article?.title}</h1>
  )
}