import HeaderSection from '@/components/HeaderSection'
import { buttonVariants } from '@/components/ui/button'
import { getActiveTopics } from '@/lib/supabase/get-active-topics'
import Link from 'next/link'

export default async function Home() {
  const topics = await getActiveTopics()

  return (
    <>
      <HeaderSection className="flex flex-col items-center justify-center text-center">
        <h1 className="mb-8 font-serif text-4xl">
          Select a topic to review headlines:
        </h1>
        <ul className="flex max-w-prose flex-wrap items-center justify-center space-x-4">
          {topics?.map((t) => (
            <li key={t.slug} className="mb-4">
              <Link
                key={t.slug}
                href={`/topics/${t.slug}`}
                className={buttonVariants({
                  variant: 'default',
                  size: 'lg',
                })}
              >
                {t.query}
              </Link>
            </li>
          ))}
        </ul>
      </HeaderSection>
    </>
  )
}
