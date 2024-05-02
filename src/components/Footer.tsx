import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { menuLinks } from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";

export default async function Footer() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <footer className="border-t-[1px] bg-fuchsia-200  border-b-fuchsia-50 p-8 flex flex-col sm:flex-row justify-between align-center text-sm">
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <Link
          href="https://chrissyhunt.com"
          target="_blank"
          className={buttonVariants({ variant: "link" })}
        >
          Chrissy Hunt
        </Link>
      </p>
      <nav>
        <ul className="flex space-x-4">
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
                className={buttonVariants({ variant: "link" })}
              >
                Admin Login
              </Link>
            </li>
          )}
          {menuLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={buttonVariants({ variant: "link" })}
                target={link.newTab ? "_blank" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
