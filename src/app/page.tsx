import HeaderSection from "@/components/HeaderSection";
import { buttonVariants } from "@/components/ui/button";
import { createServiceClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = createServiceClient();

  const { data: topics } = await supabase.from("topics").select();

  return (
    <main>
      <HeaderSection className="text-center">
        <h1 className="font-serif text-4xl">
          Select a topic to review headlines:
        </h1>
      </HeaderSection>
      <ul className="flex justify-center space-x-4">
        {topics?.map((t) => (
          <li key={t.id}>
            <Link
              href={`/topics/${t.id}`}
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              {t.query}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
