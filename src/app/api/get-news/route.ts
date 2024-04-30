import { fetchNews, limitSamplePerSource } from "@/lib/news-api/fetch-news";
import { makeSourceBatches } from "@/lib/news-api/sources";
import { getTopics } from "@/lib/supabase/get-topics";
import { upsertArticles } from "@/lib/supabase/upsert-articles";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  // get list of topics
  const { topics, error } = await getTopics();

  if (error || !topics) {
    return new Response("Error retrieving topics", {
      status: 500,
    });
  }

  // get articles from NewsAPI
  try {
    for (let topic of topics) {
      const sources = await makeSourceBatches();
      let results = [];
      for (let batch of sources) {
        const data = await fetchNews(topic.query!, batch);

        // sample recent results: x per source per topic
        const MAX_PER_SOURCE = 1;
        const filteredArticles = limitSamplePerSource(
          data.articles,
          MAX_PER_SOURCE
        );

        // format as expected by Supabase
        results.push(
          ...filteredArticles.map((a: any) => ({
            title: a.title,
            description: a.description,
            author: a.author,
            url: a.url,
            url_to_image: a.urlToImage,
            content: a.content,
            published_at: a.publishedAt,
            source: a.source.id,
          }))
        );
      }

      // save to Supabase
      if (results.length) {
        try {
          await upsertArticles(results, topic.slug);
        } catch (e) {
          console.log(e);
          return new Response("Error saving news articles", {
            status: 500,
          });
        }
      }
    }
  } catch (e) {
    return new Response("Error querying NewsAPI", {
      status: 500,
    });
  }

  revalidatePath("/");
  revalidatePath("/topics/[slug]");

  return new Response("Success!", {
    status: 200,
  });
}
