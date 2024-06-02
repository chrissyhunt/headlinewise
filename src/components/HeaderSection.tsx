export default function HeaderSection({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={`px-8 py-10 sm:py-24 pt-36 sm:pt-40 ${className}`}>
      {children}
    </section>
  )
}
