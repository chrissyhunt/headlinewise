import { createServiceClient } from "@/utils/supabase/server";
import Badge from "@/components/Badge";
import DisplayLabel from "@/components/DisplayLabel";
import Source from "@/components/Source";

export default async function ArticleDetails({ url }: { url: string }) {
  const supabase = createServiceClient();

  const { data: article, error } = await supabase
    .from("articles")
    .select(
      `
      title,
      description,
      published_at,
      url,
      source ( id, name ),
      analysis ( id, language, political_bias, analysis, model )  
    `
    )
    .eq("url", url)
    .maybeSingle();

  if (!article) return null;

  const analysis = article.analysis[0];
  const language = analysis?.language?.split(",");

  return (
    <div className="mx-2 sm:mx-10 my-4 sm:my-14 text-black">
      <DisplayLabel>The Headline</DisplayLabel>
      <h1 className="text-3xl md:text-6xl font-serif mb-4 max-w-prose">
        {article.title}
      </h1>
      <p className="text-xl md:text-3xl font-serif max-w-prose">
        {article.description}
      </p>

      <div className="grid grid-cols-2 mt-12">
        <div>
          <DisplayLabel>Language</DisplayLabel>
          {language?.map((l) => (
            <Badge key={l} className="bg-fuchsia-300">
              {l}
            </Badge>
          ))}
        </div>
        <div>
          <DisplayLabel>Politics</DisplayLabel>
          <Badge className="bg-cyan-300">{analysis?.political_bias}</Badge>
        </div>
      </div>

      <div className="mt-12">
        <DisplayLabel>Analysis</DisplayLabel>
        <p className="text-lg md:text-xl font-serif max-w-prose">
          {analysis?.analysis}
        </p>
      </div>

      <Source url={article.url!} name={article.source?.name} />
    </div>
  );
}
