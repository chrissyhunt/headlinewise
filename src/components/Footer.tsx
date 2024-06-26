import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { menuLinks } from '@/components/Navbar'
import { createClient } from '@/lib/supabase/server'

export default async function Footer() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <footer className="align-center flex flex-col justify-center border-t-[1px] border-b-fuchsia-50 bg-fuchsia-200 p-8 text-sm md:flex-row md:justify-between">
      <p className="text-center md:text-left">
        &copy; {new Date().getFullYear()}{' '}
        <Link
          href="https://chrissyhunt.com"
          target="_blank"
          className={buttonVariants({ variant: 'link' })}
          data-test="author-link"
        >
          Chrissy Hunt
        </Link>
        {/* &nbsp;&nbsp;/&nbsp;&nbsp;
        <Link
          href="https://buymeacoffee.com/chrissyhunt"
          target="_blank"
          className={buttonVariants({ variant: "link" })}
        >
          Buy me a coffee &nbsp;☕️
        </Link> */}
      </p>
      <nav>
        <ul className="flex flex-wrap justify-center space-x-4 md:justify-end">
          {user ? (
            <li>
              <form action="/auth/signout" method="post">
                <Button variant="link" type="submit">
                  Logout
                </Button>
              </form>
            </li>
          ) : (
            <li>
              <Link
                href="/login"
                className={buttonVariants({ variant: 'link' })}
                data-test="login-link"
              >
                Admin Login
              </Link>
            </li>
          )}
          {menuLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={buttonVariants({ variant: 'link' })}
                target={link.newTab ? '_blank' : undefined}
                data-test="footer-nav-link"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}
