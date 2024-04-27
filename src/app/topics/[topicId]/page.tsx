import HeadlineCard from "@/components/HeadlineCard";
import { createServiceClient } from "@/utils/supabase/server";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default async function TopicPage({ params }: { params: { topicId: string } }) {
  const supabase = createServiceClient();

  const { data: topic, error } = await supabase
    .from('topics')
    .select(`
      id,
      query,
      articles ( id, title, description, published_at )
    `)
    .eq('id', params.topicId)
    .maybeSingle()


  return (
    <>
      <section className="px-8 py-24">
        <h1 className="font-serif text-6xl tracking-tighter">
          <span className="bg-fuchsia-400">&ldquo;{topic?.query}&rdquo;</span>
        </h1>
      </section>
      <section className="py-12">
        <h2 className="text-xl mb-16 mx-8">Recent Headlines</h2>
        <ul className="grid grid-cols-3 gap-0">
          {topic?.articles?.map(a => (
            <Sheet key={a.id}>
              <SheetTrigger>
                <HeadlineCard
                  key={a.id}
                  title={a.title!}
                  href={`/topics/${params.topicId}/articles/${a.id}`}
                  date={a.published_at!}
                />
              </SheetTrigger>
              <SheetContent className="max-w-1/3 sm:max-w-1/3">
                <SheetTitle>Article</SheetTitle>
                <SheetDescription>More Content</SheetDescription>
              </SheetContent>
            </Sheet>

          ))}
        </ul>
      </section>
    </>
  )
}