import { createServiceClient } from '@/lib/supabase/server'

export const getArticle = async (articleUrl: string) => {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('articles')
    .select('url,title,description')
    .eq('url', articleUrl!)
    .maybeSingle()
  if (error) throw new Error('Error getting article', { cause: error })
  return data
}
