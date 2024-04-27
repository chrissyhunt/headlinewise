'use client';
import Link from 'next/link';
import { useState } from 'react';

interface SourceProps {
  url: string;
  name: string;
  author?: string;
}

export default function Source({ url, name, author }: SourceProps) {
  const [showSource, setShowSource] = useState(false);
  
  if (!showSource) {
    return (
      <button onClick={() => setShowSource(true)}>
        Reveal Source 👀
      </button>
    );
  }

  const showAuthor = !author?.startsWith('http');

  return (
    <Link href={url}>
      🔗 {showAuthor ? `${author} &middot; ` : ''}{name} &rarr;
    </Link>
  )
}