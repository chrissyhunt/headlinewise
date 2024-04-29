import { createServiceClient } from "@/utils/supabase/server";
import { fetchNews, limitSamplePerSource } from "@/utils/news-api/fetch-news";
import { makeSourceBatches } from "@/utils/news-api/sources";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const supabase = createServiceClient();

  // get list of topics
  const { data: topics, error } = await supabase
    .from("topics")
    .select("slug, query");

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
          const { data: articles, error: articlesError } = await supabase
            .from("articles")
            .upsert(results)
            .select("url");

          if (articlesError) throw new Error(articlesError.message);

          if (articles?.length) {
            const { error } = await supabase
              .from("article_topics")
              .insert(
                articles.map((a) => ({ article: a.url, topic: topic.slug }))
              );

            if (error) throw new Error(`${error.message}, ${error.details}`);
          }
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

  return new Response("Success!", {
    status: 200,
  });
}
