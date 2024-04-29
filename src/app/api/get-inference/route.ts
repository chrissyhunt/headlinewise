import { getAnalysisFromAnthropic } from "@/utils/anthropic-ai/anthropic";
import { getAnalysisFromOpenAI } from "@/utils/openai/openai";
import { createServiceClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader !== `Bearer ${process.env.ENDPOINT_TOKEN}`) {
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

  const supabase = createServiceClient();

  try {
    const { data: article, error: articleError } = await supabase
      .from("articles")
      .select("url,title,description")
      .eq("url", articleUrl!)
      .maybeSingle();

    if (articleError)
      throw new Error(`Error retrieving article: ${articleError.message}`);

    let analysis;
    try {
      analysis = await getAnalysisFromAnthropic(article?.title!);
    } catch (e) {
      analysis = await getAnalysisFromOpenAI(article?.title!);
    }

    const { error: saveError } = await supabase.from("analysis").insert({
      language: Array.isArray(analysis.language)
        ? analysis.language?.join(",")
        : analysis.language.toString(),
      political_bias: analysis.political_bias,
      analysis: analysis.analysis,
      model: analysis.model,
      article: articleUrl,
    });

    if (saveError)
      throw new Error(`Error saving analysis: ${saveError.message}`);
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
