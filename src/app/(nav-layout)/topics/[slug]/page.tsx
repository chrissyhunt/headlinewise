import BackButton from "@/components/BackButton";
import HeaderSection from "@/components/HeaderSection";
import { getArticlesForTopic } from "@/lib/supabase/get-articles-for-topic";
import { ArticlesList } from "@/components/ArticlesList";
import { isUserAdmin } from "@/lib/supabase/is-user-admin";

export default async function TopicPage({
  params,
}: {
  params: { slug: string };
}) {
  const { topic, articles } = await getArticlesForTopic(params.slug);
  const isAdmin = await isUserAdmin();

  const articlesToShow = isAdmin
    ? articles
    : articles?.filter((a) => a.analysis[0].approved);

  return (
    <>
      <HeaderSection>
        <BackButton />
        <h1 className="mt-20 font-serif text-4xl sm:text-6xl tracking-tighter">
          <span className="bg-fuchsia-400">&ldquo;{topic?.query}&rdquo;</span>
        </h1>
      </HeaderSection>
      <section className="py-12">
        <h2 className="text-xl mb-16 mx-8">Recent Headlines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 grid-rows-fr">
          <ArticlesList articles={articlesToShow || []} />
        </div>
      </section>
    </>
  );
}
