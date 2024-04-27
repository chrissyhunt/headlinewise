interface BadgeProps {
  className: string;
  children: React.ReactNode;
}

export default function Badge({ className, children }: BadgeProps) {
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold ${className}`}>{children}</div>
  );
}