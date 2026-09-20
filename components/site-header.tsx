import {content} from "@/lib/sanity";
import Link from "next/link";
import {ArrowUpRightIcon as ArrowUpRight} from "@phosphor-icons/react/ssr";
import {MobileNavigation} from "@/components/mobile-navigation";
import {DesktopNavigation} from "@/components/desktop-navigation";
import {ScrollAwareHeader} from "@/components/scroll-aware-header";

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
    <ScrollAwareHeader className="global-site-header sticky top-0 z-40 border-b border-black/10 bg-[#f6f1e7]/92 backdrop-blur-xl">
      <div className="page-shell flex h-[76px] items-center justify-between gap-6">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md" aria-label="Yearbook home">
          <span className="grid size-10 place-items-center bg-[#701d33] text-sm font-black tracking-tight text-[#fffaf0]">CV</span>
          <span className="leading-tight">
            <strong className="display block text-lg font-semibold">{settings?.siteTitle || "Living Yearbooks"}</strong>
            <span className="block text-[10px] font-bold uppercase tracking-[.24em] text-[#701d33]">Living Yearbooks</span>
          </span>
        </Link>
        <DesktopNavigation links={links} itemClassName="focus-ring rounded-sm text-sm font-semibold text-black/70 transition hover:text-[#701d33]" />
        <Link href="/contact" className="focus-ring hidden items-center gap-2 bg-[#171713] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#701d33] sm:flex">
          Start your yearbook <ArrowUpRight className="size-4" />
        </Link>
        <MobileNavigation
          links={links}
          summaryClassName="focus-ring grid size-11 cursor-pointer list-none place-items-center border border-black/20"
          panelClassName="absolute right-0 top-14 w-64 border border-black/10 bg-[#fffdf8] p-3 shadow-2xl"
          itemClassName="focus-ring px-4 py-3 text-base font-semibold hover:bg-[#eee7da]"
          ctaClassName="focus-ring mt-2 bg-[#701d33] px-4 py-3 font-bold text-white"
        />
      </div>
    </ScrollAwareHeader>
  );
}
