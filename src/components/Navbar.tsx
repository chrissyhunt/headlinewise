import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="flex justify-between align-center p-8 w-full fixed backdrop-blur-xl border-b-[1px] border-b-fuchsia-50">
      <h1 className="text-xl self-center">🦉 HeadlineWise</h1>
      <nav>
        <ul className="flex justify-end align-center space-x-4">
          <li>
            <Link href="/" className={buttonVariants({ variant: "link" })}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={buttonVariants({ variant: "link" })}>
              About
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/chrissyhunt/headlinewise"
              target="_blank"
              className={buttonVariants({ variant: "link" })}
            >
              GitHub
            </Link>
          </li>
          <li>
            <Link
              href="https://www.linkedin.com/in/chrissyhuntnyc/"
              target="_blank"
              className={buttonVariants({ variant: "link" })}
            >
              Hire Me ✨
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
