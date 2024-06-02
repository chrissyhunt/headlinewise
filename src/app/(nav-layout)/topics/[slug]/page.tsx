import BackButton from '@/components/BackButton'
import HeaderSection from '@/components/HeaderSection'
import { getArticlesForTopic } from '@/lib/supabase/get-articles-for-topic'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'
import HeadlineCard from '@/components/HeadlineCard'
import ArticleDetails from '@/components/ArticleDetails'

export default async function TopicPage({
  params,
}: {
  params: { slug: string }
}) {
  const { topic, articles } = await getArticlesForTopic(params.slug)

  return (
    <>
      <HeaderSection>
        <BackButton />
        <h1 className="mt-20 font-serif text-4xl tracking-tighter sm:text-6xl">
          <span className="bg-fuchsia-400">&ldquo;{topic?.query}&rdquo;</span>
        </h1>
      </HeaderSection>
      <section className="py-12">
        <h2 className="mx-8 mb-16 text-xl">Recent Headlines</h2>
        <div className="grid-rows-fr grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-3">
          {articles?.map((a) => (
            <Sheet key={a.url}>
              <SheetTrigger>
                <HeadlineCard
                  title={a.title!}
                  date={a.published_at!}
                  needsReview={a.analysis[0].approved === null}
                />
              </SheetTrigger>
              <SheetContent className="max-w-screen sm:max-w-3/4 lg:max-w-2/3 w-screen overflow-y-scroll bg-fuchsia-50 sm:w-3/4 lg:w-2/3">
                <SheetDescription>
                  <ArticleDetails url={a.url!} />
                </SheetDescription>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </section>
    </>
  )
}
