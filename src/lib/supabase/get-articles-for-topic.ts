import { createServiceClient } from '@/lib/supabase/server'

const MAX_RECENT_ARTICLES = 24

export const getArticlesForTopic = async (topicSlug: string) => {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('topics')
    .select(
      `
      slug,
      query,
      articles ( url, title, description, published_at, analysis (id, approved) )
    `
    )
    .eq('slug', topicSlug)
    .maybeSingle()

  if (error) throw new Error('Error retrieving topic', { cause: error })

  const topic = { slug: data?.slug, query: data?.query }
  const articles = data?.articles
    .filter((a) => a.analysis.length > 0)
    .sort(
      (a, b) =>
        new Date(b.published_at!).valueOf() -
        new Date(a.published_at!).valueOf()
    )
    .slice(0, MAX_RECENT_ARTICLES)

  return { topic, articles }
}
