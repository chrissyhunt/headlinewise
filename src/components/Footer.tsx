import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { menuLinks } from "@/components/Navbar";

export default function Footer() {
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
      <ul className="flex space-x-4">
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
    </footer>
  );
}
