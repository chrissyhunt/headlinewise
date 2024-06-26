import { fetchNews, limitSamplePerSource } from '@/lib/news-api/fetch-news'
import { makeSourceBatches } from '@/lib/news-api/sources'
import { getTopics } from '@/lib/supabase/get-topics'
import { upsertArticles } from '@/lib/supabase/upsert-articles'
import { hasEndpointSecret } from '@/utils/has-endpoint-secret'
import { revalidatePath } from 'next/cache'
// import { GET as getBatchAnalysis } from "@/app/api/get-batch-analysis/route";
import { insertLog } from '@/lib/supabase/insert-log'

export const revalidate = 0

export async function GET(request: Request) {
  const isAuth = hasEndpointSecret(request)
  if (!isAuth) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  try {
    // get list of topics
    const topics = await getTopics()

    // get articles from NewsAPI
    for (const topic of topics) {
      const sources = await makeSourceBatches()
      const results = []
      for (const batch of sources) {
        console.log(`requesting '${topic.query}' news from ${batch.join(', ')}`)
        const data = await fetchNews(topic.query!, batch)

        // sample recent results: x per source per topic
        const MAX_PER_SOURCE = 1
        const filteredArticles = limitSamplePerSource(
          data.articles,
          MAX_PER_SOURCE
        )

        // format as expected by Supabase
        results.push(
          ...filteredArticles.map((a) => ({
            title: a.title,
            description: a.description,
            author: a.author,
            url: a.url,
            url_to_image: a.urlToImage,
            content: a.content,
            published_at: a.publishedAt,
            source: a.source.id,
          }))
        )
      }

      // save to Supabase
      if (results.length) {
        try {
          await upsertArticles(results, topic.slug)
          await insertLog({
            type: 'success',
            from: 'get-news',
            message: `Saved ${results.length} articles`,
          })
        } catch (e) {
          console.log(e)
          await insertLog({
            type: 'error',
            from: 'get-news',
            message: JSON.stringify(e),
          })
          return new Response('Error saving news articles', {
            status: 500,
          })
        }
      }
    }
  } catch (e) {
    return new Response('Error querying NewsAPI', {
      status: 500,
    })
  }

  revalidatePath('/')
  revalidatePath('/(nav-layout)/topics/[slug]', 'page')

  // TODO: re-enable batch analysis call after upgrading Vercel and increasing timeout

  // try {
  //   const res = await getBatchAnalysis(request);
  //   if (res.status !== 200) throw new Error("Error getting batch analysis");
  // } catch (e) {
  //   return new Response("Error getting batch analysis", {
  //     status: 500,
  //   });
  // }

  return new Response('Success!', {
    status: 200,
  })
}
