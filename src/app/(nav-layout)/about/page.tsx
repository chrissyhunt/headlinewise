'use client'
import AboutContent from '@/content/about.mdx'

export default function About() {
  return (
    <div className="mb-24 mt-36 flex justify-center px-8 md:mt-48">
      <article className="prose-md prose prose-gray md:prose-xl prose-headings:font-serif prose-headings:font-normal prose-li:marker:text-inherit">
        <AboutContent />
      </article>
    </div>
  )
}
