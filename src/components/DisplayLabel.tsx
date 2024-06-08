interface DisplayLabelProps {
  children: React.ReactNode
}

export default function DisplayLabel({ children }: DisplayLabelProps) {
  return (
    <p
      className="mb-2 text-sm uppercase tracking-wide"
      data-test="display-label"
    >
      {children}
    </p>
  )
}
