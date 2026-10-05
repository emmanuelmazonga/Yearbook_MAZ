import {content} from "@/lib/sanity";
import Link from "next/link";
import {ArrowUpRightIcon as ArrowUpRight} from "@phosphor-icons/react/ssr";
import {MobileNavigation} from "@/components/mobile-navigation";
import {DesktopNavigation} from "@/components/desktop-navigation";
import {ScrollAwareHeader} from "@/components/scroll-aware-header";
import {SITE_NAME} from "@/lib/site";

const baseLinks = [
  ["Schools", "/schools"],
  ["Yearbook", "/schools"],
  ["Photography", "/photography"],
  ["For Schools", "/for-schools"],
  ["About", "/about"],
] as const;

export async function SiteHeader() {
 const docs=await content(); const settings=docs.find(d=>d._id==="siteSettings"); const book=docs.find(d=>d._type==="yearbook" && d._id===settings?.featuredYearbook?._ref);
 const links=baseLinks.map(([label,href])=>({label,href:label==="Yearbook" ? (book ? "/yearbooks/"+book.slug.current : "/schools") : href}));
  return (
    <ScrollAwareHeader className="global-site-header sticky top-0 z-40 border-b border-white/15 bg-[#0d0d0c]/72 text-white shadow-[0_10px_40px_rgba(0,0,0,.16)] backdrop-blur-xl backdrop-saturate-150">
      <div className="page-shell flex h-[76px] items-center justify-between gap-6">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md" aria-label="Yearbook home">
          <span className="grid size-10 place-items-center border border-white/20 bg-white/10 text-sm font-black tracking-tight text-white">LY</span>
          <span className="leading-tight">
            <strong className="display block text-lg font-semibold">{SITE_NAME}</strong>
            <span className="block text-[10px] font-bold uppercase tracking-[.24em] text-white/60">Digital school archives</span>
          </span>
        </Link>
        <DesktopNavigation links={links} itemClassName="focus-ring rounded-sm text-sm font-semibold text-white/76 transition hover:text-[#f1ca7e]" />
        <Link href="/contact" className="focus-ring hidden items-center gap-2 bg-white/92 px-5 py-3 text-sm font-bold text-[#171713] transition hover:bg-[#f1ca7e] sm:flex">
          Start your yearbook <ArrowUpRight className="size-4" />
        </Link>
        <MobileNavigation
          links={links}
          summaryClassName="focus-ring grid size-11 cursor-pointer list-none place-items-center border border-white/25 text-white transition hover:bg-white/10"
          panelClassName="absolute right-0 top-14 w-64 border border-white/15 bg-[#0d0d0c]/92 p-3 text-white shadow-2xl backdrop-blur-2xl"
          itemClassName="focus-ring px-4 py-3 text-base font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
          ctaClassName="focus-ring mt-2 bg-[#701d33] px-4 py-3 font-bold text-white transition hover:bg-[#8b2943]"
        />
      </div>
    </ScrollAwareHeader>
  );
}
