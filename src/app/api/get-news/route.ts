import { createServiceClient } from "@/utils/supabase/server";
import { fetchNews } from "@/utils/news-api/fetch-news";
import { makeSourceBatches } from "@/utils/news-api/sources";

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${process.env.ENDPOINT_TOKEN}`) {
    return new Response('Unauthorized', {
      status: 401
    });
  }

  const supabase = createServiceClient();

  // get list of topics
  const { data: topics, error } = await supabase.from('topics').select();

  if (error || !topics) {
    return new Response('Error retrieving topics', {
      status: 500
    });
  }

  // get articles from NewsAPI
  try {
    for (let topic of topics) {
      const sources = await makeSourceBatches();
      let results = [];
      for (let batch of sources) {
        const data = await fetchNews(topic.query!, batch);
        // filter out 'removed' results with null source ids returned by API
        // format as expected by Supabase
        results.push(
          ...data.articles
          .filter((a: any) => a.source?.id)
          .map((a: any) => ({
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
          const { data: articles, error: articlesError } = await supabase.from('articles')
            .insert(results)
            .select('id');
          
          if (articlesError) throw new Error();

          if (articles?.length) {
            const { error } = await supabase.from('article_topics')
              .insert(articles.map((a) => ({ article: a.id, topic: topic.id })));
            
            if (error) throw new Error();
          }
        } catch (e) {
          return new Response('Error saving news articles', {
            status: 500
          });
        }
      }
    }
  } catch (e) {
    return new Response('Error querying NewsAPI', {
      status: 500
    });
  }

  
  
  return new Response('Success!', {
    status: 200
  });
}