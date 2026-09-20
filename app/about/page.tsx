import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon as ArrowRight } from "@phosphor-icons/react/ssr";
import {content} from "@/lib/sanity";
import {pageMetadata} from "@/lib/site";

export const metadata: Metadata = pageMetadata({title:"About",description:"Why Living Yearbooks exists and how photography, design and technology preserve school memories.",path:"/about"});

export default async function AboutPage() {
  const docs=await content();
  const settings=docs.find(d=>d._id==='siteSettings');
  const book=docs.find(d=>d._type==='yearbook' && d._id===settings?.featuredYearbook?._ref);
  return (
    <main>
      <section className="section-space bg-[#f6f1e7]"><div className="page-shell grid gap-10 lg:grid-cols-[.65fr_1.35fr]"><p className="eyebrow text-[#701d33]">Why we exist</p><div><h1 className="display text-6xl leading-[.93] tracking-[-.05em] sm:text-8xl">School ends.<br />Belonging should not.</h1><p className="mt-8 max-w-3xl text-xl leading-9 text-black/62">Copperview Living Yearbooks is a fictional Zambian prototype built around a simple belief: photographs and stories should preserve the texture of school life, not merely prove that it happened.</p></div></div></section>
      <section className="grid bg-[#701d33] text-white lg:grid-cols-2"><img src="/images/hero-class-2026.webp" alt="Friends sharing a moment during their final school year" loading="lazy" decoding="async" className="min-h-[520px] h-full w-full object-cover" /><div className="section-space px-6 sm:px-12 lg:px-[10%]"><p className="eyebrow text-[#f1ca7e]">The idea</p><h2 className="display mt-5 text-5xl sm:text-6xl">Photography first. Technology quietly underneath.</h2><p className="mt-8 text-lg leading-8 text-white/68">The first impression is an immersive yearbook, not a marketplace or school database. Underneath, one adaptable platform can hold many schools, many years and—eventually—many kinds of shared archives.</p><p className="mt-6 text-lg leading-8 text-white/68">That structure matters. But the feeling matters first.</p></div></section>
      <section className="section-space bg-[#e7dcc7]"><div className="page-shell grid gap-8 md:grid-cols-3">{[["01", "Memory", "Keep the stories people actually tell years later."], ["02", "Dignity", "Photograph every student with care and represent every school distinctly."], ["03", "Legacy", "Build an archive that becomes richer with every graduating class."]].map(([number, title, copy]) => <article key={number} className="border-t border-black/20 pt-6"><p className="text-xs font-bold text-[#701d33]">{number}</p><h3 className="display mt-12 text-4xl">{title}</h3><p className="mt-4 max-w-sm leading-7 text-black/58">{copy}</p></article>)}</div><div className="page-shell mt-16"><Link href={book ? `/yearbooks/${book.slug.current}` : '/schools'} className="focus-ring inline-flex items-center gap-2 border-b-2 border-[#701d33] pb-2 font-bold text-[#701d33]">Experience the prototype <ArrowRight className="size-4" /></Link></div></section>
    </main>
  );
}
