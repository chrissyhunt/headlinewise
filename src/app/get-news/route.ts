import { createServiceClient } from "@/utils/supabase/server";
import { fetchNews } from "@/utils/news-api/fetch-news";
import { makeSourceBatches } from "@/utils/news-api/sources";

export async function GET(request: Request) {
  const supabase = createServiceClient();

  // get list of topics
  const { data, error } = await supabase.from('topics').select();
  const topics = data?.map(t => t.query);

  if (error || !topics) {
    return new Response('Error retrieving topics', {
      status: 500
    })
  }

  const results = [];

  for (let topic of topics) {
    const sources = makeSourceBatches();
    for (let batch of sources) {
      const data = await fetchNews(topic!, batch);
      // filter out 'removed' results with null source ids returned by API
      results.push(...data.articles.filter((a: any) => a.source?.id));
    }
  }

  console.log('RESULTS: ', results.length);
  return Response.json(results);
}