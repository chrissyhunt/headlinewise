import Badge from '@/components/Badge'
import DisplayLabel from '@/components/DisplayLabel'
import SourceButton from '@/components/SourceButton'
import { getArticleDetails } from '@/lib/supabase/get-article-details'
import { ArticleApprovalStatus } from './ArticleApprovalStatus'
import { isUserAdmin } from '@/lib/supabase/is-user-admin'
import { ModelHoverCard } from '@/components/ModelHoverCard'

interface ArticleDetailsProps {
  url: string
}

export default async function ArticleDetails({ url }: ArticleDetailsProps) {
  const isAdmin = await isUserAdmin()
  const article = await getArticleDetails(url)

  if (!article) return null

  const analysis = article.analysis[0]
  const language = analysis?.language?.split(',')

  return (
    <div
      className="mx-2 my-4 text-black sm:mx-10 sm:my-14"
      data-test="article-details"
    >
      <DisplayLabel>The Headline</DisplayLabel>
      <h1 className="mb-4 max-w-prose font-serif text-3xl md:text-6xl">
        {article.title}
      </h1>
      <p className="max-w-prose font-serif text-xl md:text-3xl">
        {article.description}
      </p>

      <div className="mt-12 grid grid-cols-2">
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
        <p className="max-w-prose font-serif text-lg md:text-xl">
          {analysis?.analysis}
        </p>
      </div>

      <div className="mb-8 mt-4 space-x-2 text-xs italic">
        <span>
          Analysis by&nbsp;
          <ModelHoverCard model={analysis?.model || ''} />
        </span>
        <span>&middot;</span>
        <ArticleApprovalStatus
          approved={analysis?.approved}
          analysisId={analysis?.id}
          isAdmin={isAdmin}
        />
      </div>

      {/* TODO: remove when supabase fixes complex query type generation */}
      {/* https://github.com/supabase/postgrest-js/issues/303 */}
      {/* @ts-expect-error due to supabase type gen issue */}
      <SourceButton url={article.url!} name={article.source.name} />
    </div>
  )
}
