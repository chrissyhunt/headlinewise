import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t-[1px] bg-fuchsia-200  border-b-fuchsia-50 p-8 flex justify-between align-center text-sm">
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
      <p>
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Home
        </Link>{" "}
        /{" "}
        <Link href="/about" className={buttonVariants({ variant: "link" })}>
          About
        </Link>{" "}
        /{" "}
        <Link
          href="https://github.com/chrissyhunt/headlinewise"
          target="_blank"
          className={buttonVariants({ variant: "link" })}
        >
          GitHub
        </Link>{" "}
        /{" "}
        <Link
          href="https://www.linkedin.com/in/chrissyhuntnyc/"
          target="_blank"
          className={buttonVariants({ variant: "link" })}
        >
          Hire Me ✨
        </Link>
      </p>
    </footer>
  );
}
