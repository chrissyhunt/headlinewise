"use client";
import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";

interface SourceProps {
  url: string;
  name: string;
}

export default function Source({ url, name }: SourceProps) {
  const [showSource, setShowSource] = useState(false);

  if (!showSource) {
    return (
      <Button onClick={() => setShowSource(true)} className="mt-8">
        Reveal Source 👀
      </Button>
    );
  }

  return (
    <Link
      className={`mt-8 ${buttonVariants({ variant: "default" })}`}
      href={url}
      target="_blank"
    >
      🔗 {name} &rarr;
    </Link>
  );
}
