import Link from 'next/link';
import {ArrowUpRightIcon as ArrowUpRight} from '@phosphor-icons/react/ssr';
import {imageUrl, type RecordData} from '@/lib/sanity';
import {MobileNavigation} from '@/components/mobile-navigation';
import {ScrollAwareHeader} from '@/components/scroll-aware-header';

const baseLinks = [
  ['Schools', '/schools'],
  ['Yearbook', '/schools'],
  ['Photography', '/photography'],
  ['For Schools', '/for-schools'],
  ['About', '/about'],
] as const;

export function SchoolHeader({school, latestBook}: {school: RecordData; latestBook?: RecordData}) {
  const initials=school.name.split(/\s+/).map((part:string)=>part[0]).join('').slice(0,3).toUpperCase();
  const links=baseLinks.map(([label,href])=>({label,href:label==='Yearbook' && latestBook ? `/yearbooks/${latestBook.slug.current}` : href}));
  return <ScrollAwareHeader className="sticky top-0 z-40 border-b border-black/10 bg-[var(--school-secondary)]/95 text-[var(--school-secondary-ink)] backdrop-blur-xl">
    <div className="page-shell flex h-[76px] items-center justify-between gap-6">
      <Link href={`/schools/${school.slug.current}`} className="focus-ring flex min-w-0 items-center gap-3 rounded-md" aria-label={`${school.name} home`}>
        <span className="grid size-10 shrink-0 place-items-center overflow-hidden bg-[var(--school-primary)] text-xs font-black tracking-tight text-[var(--school-primary-ink)]">
          {school.logo ? <img src={imageUrl(school.logo,160)} alt="" className="h-full w-full object-contain p-1.5"/> : initials}
        </span>
        <span className="min-w-0 leading-tight">
          <strong className="display block truncate text-lg font-semibold">{school.name}</strong>
          <span className="block text-[10px] font-bold uppercase tracking-[.24em] text-[var(--school-primary-on-secondary)]">School archive</span>
        </span>
      </Link>
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
        {links.map(({label,href})=><Link key={label} href={href} className="focus-ring rounded-sm text-sm font-semibold opacity-80 transition hover:text-[var(--school-primary-on-secondary)] hover:opacity-100">{label}</Link>)}
      </nav>
      <Link href="/contact" className="focus-ring hidden items-center gap-2 bg-[var(--school-primary)] px-5 py-3 text-sm font-bold text-[var(--school-primary-ink)] transition hover:opacity-85 sm:flex">
        Start your yearbook <ArrowUpRight className="size-4"/>
      </Link>
      <MobileNavigation
        links={links}
        summaryClassName="focus-ring grid size-11 cursor-pointer list-none place-items-center border border-current/20"
        panelClassName="absolute right-0 top-14 w-64 border border-black/10 bg-[var(--school-secondary)] p-3 shadow-2xl"
        itemClassName="focus-ring px-4 py-3 text-base font-semibold hover:bg-black/5"
        ctaClassName="focus-ring mt-2 bg-[var(--school-primary)] px-4 py-3 font-bold text-[var(--school-primary-ink)]"
      />
    </div>
  </ScrollAwareHeader>;
}
