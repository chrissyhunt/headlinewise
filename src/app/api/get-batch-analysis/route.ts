import { getAnalysisFromAnthropic } from "@/lib/anthropic-ai/anthropic";
import { getAnalysisFromOpenAI } from "@/lib/openai/openai";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const supabase = createServiceClient();

  try {
    const { data: articles, error: articleError } = await supabase
      .from("articles")
      .select("url,title,description,analysis(id)");

    if (articleError)
      throw new Error(`Error retrieving articles: ${articleError.message}`);

    const articlesToAnalyze = articles?.filter((a) => a.analysis.length < 1);

    const analyses = await Promise.all(
      articlesToAnalyze.map(async (article) => {
        let analysis;
        try {
          analysis = await getAnalysisFromAnthropic(article?.title!);
        } catch (e) {
          analysis = await getAnalysisFromOpenAI(article?.title!);
        }
        return {
          language: Array.isArray(analysis.language)
            ? analysis.language?.join(",")
            : analysis.language.toString(),
          political_bias: analysis.political_bias,
          analysis: analysis.analysis,
          model: analysis.model,
          article: article.url,
        };
      })
    );

    const { error: saveError } = await supabase
      .from("analysis")
      .insert(analyses);

    if (saveError)
      throw new Error(`Error saving analyses: ${saveError.message}`);
  } catch (e) {
    console.log(e);
    return new Response("Error", {
      status: 500,
    });
  }

  return new Response("Success", {
    status: 200,
  });
}
