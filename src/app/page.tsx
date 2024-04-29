import HeaderSection from "@/components/HeaderSection";
import { buttonVariants } from "@/components/ui/button";
import { createServiceClient } from "@/utils/supabase/server";
import Link from "next/link";

export const revalidate = 43000;

export default async function Home() {
  const supabase = createServiceClient();

  const { data: topics } = await supabase.from("topics").select();

  return (
    <>
      <HeaderSection className="text-center">
        <h1 className="font-serif text-4xl mb-8">
          Select a topic to review headlines:
        </h1>
        <ul className="flex flex-wrap justify-center align-center space-x-4">
          {topics?.map((t) => (
            <li key={t.slug} className="mb-4">
              <Link
                key={t.slug}
                href={`/topics/${t.slug}`}
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                })}
              >
                {t.query}
              </Link>
            </li>
          ))}
        </ul>
      </HeaderSection>
    </>
  );
}
