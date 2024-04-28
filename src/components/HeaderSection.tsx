export default function HeaderSection({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`px-8 py-24 pt-36 ${className}`}>{children}</section>
  );
}
