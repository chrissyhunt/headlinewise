import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

interface BackButtonProps {
  text?: string
  className?: string
}

export default function BackButton({ text, className }: BackButtonProps) {
  return (
    <Link
      href={'/'}
      className={`${buttonVariants({
        variant: 'link',
      })} ${className}`}
    >
      &larr; {text ? text : 'All Topics'}
    </Link>
  )
}
