import Link from "next/link";

interface HeadlineCardProps {
  title: string;
  id: string;
  date: string;
}

export default function HeadlineCard({ title, id, date }: HeadlineCardProps) {
  return (
    <li className="text-2xl p-8 pb-16 border-b-4 border-b-transparent hover:bg-fuchsia-50 hover:border-b-4 hover:border-b-fuchsia-400 hover:shadow-sm">
      <Link href={`articles/${id}`} className="font-serif">{title}</Link><br />
      <span className="font-sans text-sm">{new Date(date).toDateString()}</span>
    </li>
  );
}