import { getAnalysisFromAnthropic } from "@/lib/anthropic-ai/anthropic";
import { getAnalysisFromOpenAI } from "@/lib/openai/openai";
import { getArticle } from "@/lib/supabase/get-article";
import { insertAnalysis } from "@/lib/supabase/insert-analysis";
import { hasEndpointSecret } from "@/utils/has-endpoint-secret";

export async function POST(request: Request) {
  const isAuth = hasEndpointSecret(request);
  if (!isAuth) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const body = await request.json();
  const articleUrl = body?.record?.url;

  if (!articleUrl) {
    return new Response("articleUrl is required", {
      status: 400,
    });
  }

  try {
    const article = await getArticle(articleUrl);

    let analysis;
    try {
      analysis = await getAnalysisFromAnthropic(article?.title!);
    } catch (e) {
      analysis = await getAnalysisFromOpenAI(article?.title!);
    }

    await insertAnalysis({
      language: Array.isArray(analysis.language)
        ? analysis.language?.join(",")
        : analysis.language.toString(),
      political_bias: analysis.political_bias,
      analysis: analysis.analysis,
      model: analysis.model,
      article: articleUrl,
    });
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
