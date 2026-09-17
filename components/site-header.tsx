import {content} from "@/lib/sanity";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

const baseLinks = [
  ["Schools", "/schools"],
  ["Yearbook", "/yearbooks/copperview-2026"],
  ["Photography", "/photography"],
  ["For Schools", "/for-schools"],
  ["About", "/about"],
] as const;

export async function SiteHeader() {
 const docs=await content(); const settings=docs.find(d=>d._id==="siteSettings"); const book=docs.find(d=>d._type==="yearbook" && d._id===settings?.featuredYearbook?._ref);
 const links=baseLinks.map(([label,href])=>[label,label==="Yearbook" ? (book ? "/yearbooks/"+book.slug.current : "/schools") : href]);
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f6f1e7]/92 backdrop-blur-xl">
      <div className="page-shell flex h-[76px] items-center justify-between gap-6">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md" aria-label="Yearbook home">
          <span className="grid size-10 place-items-center bg-[#701d33] text-sm font-black tracking-tight text-[#fffaf0]">CV</span>
          <span className="leading-tight">
            <strong className="display block text-lg font-semibold">{settings?.siteTitle || "Living Yearbooks"}</strong>
            <span className="block text-[10px] font-bold uppercase tracking-[.24em] text-[#701d33]">Living Yearbooks</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="focus-ring rounded-sm text-sm font-semibold text-black/70 transition hover:text-[#701d33]">{label}</Link>
          ))}
        </nav>
        <Link href="/contact" className="focus-ring hidden items-center gap-2 bg-[#171713] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#701d33] sm:flex">
          Start your yearbook <ArrowUpRight className="size-4" />
        </Link>
        <details className="group relative lg:hidden">
          <summary className="focus-ring grid size-11 cursor-pointer list-none place-items-center border border-black/20" aria-label="Open navigation">
            <Menu className="size-5" />
          </summary>
          <div className="absolute right-0 top-14 w-64 border border-black/10 bg-[#fffdf8] p-3 shadow-2xl">
            <nav className="grid" aria-label="Mobile navigation">
              {links.map(([label, href]) => <Link key={href} href={href} className="px-4 py-3 text-base font-semibold hover:bg-[#eee7da]">{label}</Link>)}
              <Link href="/contact" className="mt-2 bg-[#701d33] px-4 py-3 font-bold text-white">Start your yearbook</Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
