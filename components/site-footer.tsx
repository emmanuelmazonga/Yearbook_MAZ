import {content} from "@/lib/sanity";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export async function SiteFooter() {
 const docs=await content(); const settings=docs.find(d=>d._id==="siteSettings"); const book=docs.find(d=>d._type==="yearbook" && d._id===settings?.featuredYearbook?._ref);
  return (
    <footer className="global-site-footer bg-[#132f31] text-[#fffaf0]">
      <div className="page-shell grid gap-12 py-16 md:grid-cols-[1.4fr_.6fr_.6fr]">
        <div>
          <p className="eyebrow text-[#d8b56d]">{settings?.tagline}</p>
          <h2 className="display mt-4 max-w-xl text-4xl leading-tight sm:text-5xl">Give your next graduating class a place to belong forever.</h2>
          <Link href="/contact" className="focus-ring mt-8 inline-flex items-center gap-2 border-b border-[#d8b56d] pb-2 font-bold text-[#d8b56d]">Plan a school yearbook <ArrowUpRight className="size-4" /></Link>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-white/75">Explore</p>
          <div className="grid gap-3 text-sm">
            <Link href="/schools">Schools</Link><Link href={book ? "/yearbooks/"+book.slug.current : "/schools"}>Yearbooks</Link><Link href="/photography">Photography</Link><Link href="/for-schools">For Schools</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-white/75">Copperbelt</p>
          <p className="text-sm leading-7 text-white/85">Kitwe, Zambia<br />Photography · Design · Archive</p>
          <p className="mt-8 text-xs text-white/70">Prototype content is fictional.</p>
        </div>
      </div>
      <div className="border-t border-white/20 py-5 text-center text-xs text-white/75">{settings?.footerText}</div>
    </footer>
  );
}
