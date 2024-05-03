import { getBatchAnalysisFromAnthropic } from "@/lib/anthropic-ai/anthropic";
import { getBatchAnalysisFromOpenAI } from "@/lib/openai/openai";
import { getNewArticles } from "@/lib/supabase/get-new-articles";
import { insertAnalysis } from "@/lib/supabase/insert-analysis";
import { hasEndpointSecret } from "@/utils/has-endpoint-secret";
import { makePromptBatches } from "@/utils/make-prompt-batches";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const isAuth = hasEndpointSecret(request);
  if (!isAuth) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    const articlesToAnalyze = await getNewArticles();
    const promptBatches = makePromptBatches(articlesToAnalyze);

    const analyses = await Promise.all(
      promptBatches.map(async (batch) => {
        let responses = [];
        const batchText = batch.map((b) => b.prompt);
        try {
          responses = await getBatchAnalysisFromAnthropic(batchText);
        } catch (e) {
          responses = await getBatchAnalysisFromOpenAI(batchText);
        }

        return responses.map((response: any, index: number) => ({
          language: Array.isArray(response.language)
            ? response.language?.join(",")
            : response.language.toString(),
          political_bias: response.political_bias,
          analysis: response.analysis,
          model: response.model,
          article: batch[index].url,
        }));
      })
    );

    const analysesFlat = analyses.flat();

    await insertAnalysis(analysesFlat);
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
