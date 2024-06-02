interface DisplayLabelProps {
  children: React.ReactNode
}

export default function DisplayLabel({ children }: DisplayLabelProps) {
  return <p className="text-sm uppercase tracking-wide mb-2">{children}</p>
}
