import { evaluateText } from "@/utils/anthropic-ai/anthropic";
import { createServiceClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader !== `Bearer ${process.env.ENDPOINT_TOKEN}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const { searchParams } = new URL(request.url);
  const articleUrl = searchParams.get("articleUrl");

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

    const analysis = await evaluateText(article?.title!);

    const { error: saveError } = await supabase.from("analysis").insert({
      language: Array.isArray(analysis.language)
        ? analysis.language?.join(",")
        : analysis.language.toString(),
      political_bias: analysis.political_bias,
      analysis: analysis.analysis,
      model: "claude-3-sonnet-20240229",
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
