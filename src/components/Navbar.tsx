import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

interface MenuLink {
  label: string;
  href: string;
  newTab?: boolean;
}

export const menuLinks: MenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "GitHub",
    href: "https://github.com/chrissyhunt/headlinewise",
    newTab: true,
  },
  {
    label: "Hire Me ✨",
    href: "https://www.linkedin.com/in/chrissyhuntnyc/",
    newTab: true,
  },
];

export default function Navbar() {
  return (
    <header className="flex justify-between align-center p-8 w-full fixed backdrop-blur-xl -supports-backdrop-blur:bg-fuchsia-200/90 border-b-[1px] border-b-fuchsia-50">
      <h1 className="text-xl self-center">🦉 HeadlineWise</h1>
      <nav className="hidden sm:flex">
        <ul className="flex justify-end align-center space-x-4">
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
      <div className="flex sm:hidden">
        <Sheet>
          <SheetTrigger>
            <span className="text-2xl relative top-[-2px]">☰</span>
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
                          variant: "link",
                        })} text-xl`}
                        target={link.newTab ? "_blank" : undefined}
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
  );
}
