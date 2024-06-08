import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

interface MenuLink {
  label: string
  href: string
  newTab?: boolean
}

export const menuLinks: MenuLink[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Data',
    href: '/data',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/chrissyhunt/headlinewise',
    newTab: true,
  },
  {
    label: 'Hire Me ✨',
    href: 'https://www.linkedin.com/in/chrissyhuntnyc/',
    newTab: true,
  },
]

export default function Navbar() {
  return (
    <header className="align-center fixed z-50 flex w-full justify-between border-b-[1px] border-b-fuchsia-50 bg-fuchsia-200/90 p-8 backdrop-blur-xl supports-[backdrop-filter]:bg-transparent">
      <h1 className="self-center text-lg">
        🦉 <Link href="/">HeadlineWise</Link>
      </h1>
      <nav className="hidden sm:flex">
        <ul className="align-center flex justify-end space-x-4">
          {menuLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={buttonVariants({ variant: 'link' })}
                target={link.newTab ? '_blank' : undefined}
                data-test="nav-link"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex sm:hidden">
        <Sheet>
          <SheetTrigger data-test="hamburger-trigger">
            <span className="relative top-[-2px] text-2xl">☰</span>
            <span className="sr-only">Menu</span>
          </SheetTrigger>
          <SheetContent>
            <SheetDescription>
              <ul className="flex flex-col space-y-4">
                {menuLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <Link
                        href={link.href}
                        className={`${buttonVariants({
                          variant: 'link',
                        })} text-xl`}
                        target={link.newTab ? '_blank' : undefined}
                        data-test="mobile-nav-link"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
