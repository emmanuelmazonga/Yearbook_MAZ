import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import type {RecordData} from '@/lib/sanity';

export function SchoolFooter({school, latestBook}: {school: RecordData; latestBook?: RecordData}) {
  return <footer className="bg-[var(--school-primary)] text-[var(--school-primary-ink)]">
    <div className="page-shell grid gap-12 py-16 md:grid-cols-[1.4fr_.6fr_.6fr]">
      <div>
        <p className="eyebrow text-[var(--school-accent-on-primary)]">{school.motto || school.name}</p>
        <h2 className="display mt-4 max-w-xl text-4xl leading-tight sm:text-5xl">Give your next graduating class a place to belong forever.</h2>
        <Link href="/contact" className="focus-ring mt-8 inline-flex items-center gap-2 border-b border-[var(--school-accent-on-primary)] pb-2 font-bold text-[var(--school-accent-on-primary)]">Plan a school yearbook <ArrowUpRight className="size-4"/></Link>
      </div>
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] opacity-90">Explore</p>
        <div className="grid gap-3 text-sm"><Link href="/schools">Schools</Link><Link href={latestBook ? `/yearbooks/${latestBook.slug.current}` : '/schools'}>Yearbooks</Link><Link href="/photography">Photography</Link><Link href="/for-schools">For Schools</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </div>
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] opacity-90">{school.name}</p>
        <p className="text-sm leading-7 opacity-90">{school.city}{school.country ? `, ${school.country}` : ''}<br/>Photography · Design · Archive</p>
        <p className="mt-8 text-xs opacity-80">Prototype content is fictional.</p>
      </div>
    </div>
    <div className="border-t border-current/20 py-5 text-center text-xs opacity-85">© {new Date().getFullYear()} {school.name} · Living Yearbooks</div>
  </footer>;
}
