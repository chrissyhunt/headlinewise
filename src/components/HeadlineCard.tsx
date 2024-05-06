import { isUserAdmin } from "@/lib/supabase/is-user-admin";
import Badge from "./Badge";

interface HeadlineCardProps {
  title: string;
  date: string;
  approved: boolean;
}

export default async function HeadlineCard({
  title,
  date,
  approved,
}: HeadlineCardProps) {
  const isAdmin = await isUserAdmin();
  const needsReview = isAdmin && approved === null;
  return (
    <div className="h-full text-2xl text-left p-8 pb-16 border-b-4 border-b-transparent hover:bg-fuchsia-50 hover:border-b-4 hover:border-b-fuchsia-400 hover:shadow-sm">
      <span className="font-serif">{title}</span>
      <div className="font-sans text-sm mt-3 flex align-center">
        {new Date(date).toDateString()}
        {needsReview && (
          <span className="ml-2">
            🤖 <span className="sr-only">Needs Review</span>
          </span>
        )}
      </div>
    </div>
  );
}
