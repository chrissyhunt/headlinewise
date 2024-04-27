export default function DisplayLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm uppercase tracking-wide mb-2">{children}</p>
  );
}