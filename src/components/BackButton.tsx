import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

interface BackButtonProps {
  className?: string
}

export default function BackButton({ className }: BackButtonProps) {
  return (
    <Link
      href={'/'}
      className={`${buttonVariants({
        variant: 'link',
      })} ${className}`}
    >
      &larr; All Topics
    </Link>
  )
}
