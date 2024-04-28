import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function BackButton({ className }: { className?: string }) {
  return (
    <Link
      href={"/"}
      className={`${buttonVariants({
        variant: "link",
      })} ${className}`}
    >
      &larr; All Topics
    </Link>
  );
}
