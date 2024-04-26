import { evaluateText } from "@/utils/anthropic-ai/anthropic";
import { createServiceClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${process.env.ENDPOINT_TOKEN}`) {
    return new Response('Unauthorized', {
      status: 401
    });
  }

  const supabase = createServiceClient();

  // get articles without analysis
  // for each article, get analysis, parse + save
  const { data: articles, error } = await supabase.from('articles')
    .select('id,title,analysis(count)');
  
  const targetArticles = articles?.filter((a) => a.analysis[0]?.count < 1) || [];

  let results = [];

  try {
    for (let article of targetArticles) {
      const response = await evaluateText(article.title!);
      results.push({ ...article, response });
    }
  } catch (e) {
    return new Response('Error evaluating headlines', {
      status: 500,
    });
  }

  if (results.length) {
    try {
      const insertData = results.map((r) => ({
        language: r.response.language.join(','),
        political_bias: r.response.political_bias,
        analysis: r.response.analysis,
        model: 'claude-3-sonnet-20240229',
        article: r.id,
      }));
      const { error } = await supabase.from('analysis').insert(insertData);
      if (error) throw new Error();
    } catch (e) {
      return new Response('Error saving analyses', {
        status: 500,
      });
    }
  }
  
  return new Response('Success', {
    status: 200,
  });
}