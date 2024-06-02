import { createServiceClient } from '@/lib/supabase/server'

export const getArticleDetails = async (articleUrl: string) => {
  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('articles')
    .select(
      `
        title,
        description,
        published_at,
        url,
        source ( id, name ),
        analysis ( id, language, political_bias, analysis, model, approved )  
      `
    )
    .eq('url', articleUrl)
    .maybeSingle()

  if (error) throw new Error('Error getting article details', { cause: error })
  return data
}
