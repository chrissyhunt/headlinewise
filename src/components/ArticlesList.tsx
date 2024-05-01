import ArticleDetails from "@/components/ArticleDetails";
import HeadlineCard from "@/components/HeadlineCard";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Article {
  url?: string | null;
  published_at?: string | null;
  title?: string | null;
}

export const ArticlesList = ({ articles }: { articles: Article[] }) => {
  return (
    <>
      {articles.map((a) => (
        <Sheet key={a.url}>
          <SheetTrigger>
            <HeadlineCard title={a.title!} date={a.published_at!} />
          </SheetTrigger>
          <SheetContent className="w-screen max-w-screen sm:w-3/4 sm:max-w-3/4 lg:w-2/3 lg:max-w-2/3 bg-fuchsia-50 overflow-y-scroll">
            <SheetDescription>
              <ArticleDetails url={a.url!} />
            </SheetDescription>
          </SheetContent>
        </Sheet>
      ))}
    </>
  );
};
