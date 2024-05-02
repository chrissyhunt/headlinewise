"use client";
import AboutContent from "@/content/about.mdx";

export default function About() {
  return (
    <div className="mt-36 md:mt-48 mb-24 px-8 flex justify-center">
      <article className="prose prose-md md:prose-xl prose-gray prose-headings:font-serif prose-headings:font-normal prose-li:marker:text-inherit">
        <AboutContent />
      </article>
    </div>
  );
}
