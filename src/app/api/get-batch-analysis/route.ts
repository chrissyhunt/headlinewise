import { getAnalysisFromAnthropic } from "@/lib/anthropic-ai/anthropic";
import { getAnalysisFromOpenAI } from "@/lib/openai/openai";
import { getNewArticles } from "@/lib/supabase/get-new-articles";
import { insertAnalysis } from "@/lib/supabase/insert-analysis";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    const articlesToAnalyze = await getNewArticles();

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

    await insertAnalysis(analyses);
  } catch (e) {
    console.log(e);
    return new Response("Error", {
      status: 500,
    });
  }

  revalidatePath("/topics/[slug]", "page");

  return new Response("Success", {
    status: 200,
  });
}
