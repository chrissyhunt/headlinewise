interface HeadlineCardProps {
  title: string;
  date: string;
}

export default function HeadlineCard({ title, date }: HeadlineCardProps) {
  return (
    <div className="text-2xl text-left p-8 pb-16 border-b-4 border-b-transparent hover:bg-fuchsia-50 hover:border-b-4 hover:border-b-fuchsia-400 hover:shadow-sm">
      <span className="font-serif">{title}</span><br />
      <span className="font-sans text-sm">{new Date(date).toDateString()}</span>
    </div>
  );
}