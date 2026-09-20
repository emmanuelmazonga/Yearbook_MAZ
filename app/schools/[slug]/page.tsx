import Link from 'next/link';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {ArrowRightIcon as ArrowRight, ArrowSquareOutIcon as ExternalLink, MapPinIcon as MapPin} from '@phosphor-icons/react/ssr';
import {content, imageUrl, type Photo} from '@/lib/sanity';
import {schoolTheme, withAlpha} from '@/lib/school-theme';
import {pageMetadata} from '@/lib/site';
import {isKansenshiPreview, schoolCover} from '@/lib/school-cover';

type SchoolPhoto = Photo & {_key?: string; url: string};
type SchoolLink = {_key?: string; label: string; url: string};

export async function generateMetadata({params}: {params: Promise<{slug:string}>}) {
  const {slug}=await params;
  const school=(await content()).find(d=>d._type==='school' && d.slug?.current===slug);
  if(!school) return {title:'School not found',robots:{index:false,follow:false}};
  const preview=isKansenshiPreview(school);
  return pageMetadata({title:school.name,description:preview ? `Demonstration preview of a possible ${school.name} archive. Not an official school website or published yearbook.` : school.description || `Explore ${school.name}, its graduating classes and digital yearbook archive.`,path:`/schools/${slug}`,image:schoolCover(school,1200).src || null});
}

export default async function SchoolPage({params}: {params: Promise<{slug:string}>}) {
  const {slug}=await params, docs=await content();
  const school=docs.find(d=>d._type==='school' && d.slug?.current===slug);
  if(!school) notFound();
  const preview=isKansenshiPreview(school);
  const cover=schoolCover(school,1800);
  const books=docs.filter(d=>d._type==='yearbook' && d.school?._ref===school._id).sort((a,b)=>b.graduationYear-a.graduationYear);
  const theme=schoolTheme(school);
  const initials=school.name.split(/\s+/).map((part:string)=>part[0]).join('').slice(0,3).toUpperCase();
  const photos: SchoolPhoto[]=preview ? [] : (school.schoolPhotos || []).map((photo:Photo & {_key?: string})=>({...photo,url:imageUrl(photo,1000)})).filter((photo:Photo & {_key?: string; url?: string}): photo is SchoolPhoto=>Boolean(photo.url));
  const links: SchoolLink[]=preview ? [] : [...(school.website ? [{_key:'website',label:'School website',url:school.website}] : []), ...(school.socialLinks || [])];

  return <main className="bg-[var(--school-secondary)] text-[var(--school-secondary-ink)]">
    <section className="relative min-h-[78svh] overflow-hidden bg-[var(--school-primary)] text-[var(--school-primary-ink)]">
      {cover.src && (cover.local
        ? <Image src={cover.src} alt={cover.alt} fill priority sizes="100vw" className="object-cover object-center opacity-70" />
        : <img src={cover.src} alt={cover.alt} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-70"/>)}
      <div className="absolute inset-0" style={{background:`linear-gradient(90deg, ${withAlpha(theme.primary,.98)} 0%, ${withAlpha(theme.primary,.78)} 46%, ${withAlpha(theme.primary,.1)} 100%)`}}/>
      <div className="page-shell relative z-10 flex min-h-[78svh] items-end pb-14 pt-28"><div className="max-w-4xl">
        <div className="mb-8 flex items-center gap-5">
          <div className="grid size-20 shrink-0 place-items-center overflow-hidden border border-current/35 bg-[var(--school-secondary)] text-[var(--school-secondary-ink)]">
            {school.logo ? <img src={imageUrl(school.logo,240)} alt={school.logo.alt || `${school.name} logo`} className="h-full w-full object-contain p-2"/> : <span className="text-xl font-black">{initials}</span>}
          </div>
          <div>{!preview && school.establishedYear && <p className="eyebrow text-[var(--school-accent-on-primary)]">Established {school.establishedYear}</p>}<p className="mt-2 flex items-center gap-2 text-sm opacity-75"><MapPin className="size-4"/> {school.city}, {school.country}</p></div>
        </div>
        {preview && <p className="eyebrow mb-5 text-[var(--school-accent-on-primary)]">Demonstration preview · Not an official school website</p>}
        <h1 className="display text-6xl leading-[.9] tracking-[-.05em] sm:text-8xl">{school.name}</h1>
        {!preview && school.motto && <p className="mt-7 text-xl italic text-[var(--school-accent-on-primary)]">{school.motto}</p>}
        {books[0] && <Link href={'/yearbooks/'+books[0].slug.current} className="focus-ring mt-9 inline-flex items-center gap-3 bg-[var(--school-accent)] px-6 py-4 font-bold text-[var(--school-accent-ink)]">Open Class of {books[0].graduationYear} <ArrowRight className="size-4"/></Link>}
      </div></div>
    </section>

    <section className="section-space"><div className="page-shell grid gap-14 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow text-[var(--school-primary-on-secondary)]">Our school</p></div><div>
      <h2 className="display text-4xl leading-tight sm:text-6xl">{preview ? 'A possible home for future Kansenshi yearbooks.' : 'A place shaped by its people, history and shared ambition.'}</h2>
      {preview ? <p className="mt-7 max-w-3xl text-lg leading-8 opacity-65">This page shows how a school archive could look on Living Yearbooks. The campus photograph was supplied for this demo. No Kansenshi yearbook, student stories or school-approved history has been published here.</p> : school.description && <p className="mt-7 max-w-3xl whitespace-pre-line text-lg leading-8 opacity-65">{school.description}</p>}
      {links.length>0 && <div className="mt-9 flex flex-wrap gap-3">{links.map((link)=><a key={link._key || link.url} href={link.url} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 border border-current/20 px-4 py-3 font-bold">{link.label}<ExternalLink className="size-4"/></a>)}</div>}
    </div></div></section>

    {!preview && school.principal && <section className="bg-[var(--school-primary)] text-[var(--school-primary-ink)]"><div className="page-shell grid lg:grid-cols-[.85fr_1.15fr]">
      {school.principal.portrait && <img src={imageUrl(school.principal.portrait,900)} alt={school.principal.portrait.alt || school.principal.name} loading="lazy" decoding="async" className="h-full min-h-[480px] w-full object-cover"/>}
      <div className="flex items-center px-0 py-16 lg:px-14"><div><p className="eyebrow text-[var(--school-accent-on-primary)]">{school.principal.role || 'Principal'}</p><h2 className="display mt-5 text-4xl sm:text-6xl">A message from {school.principal.name}</h2>{school.principal.message && <div className="mt-7 space-y-5 text-lg leading-8 opacity-75">{school.principal.message.split('\n\n').map((paragraph:string,index:number)=><p key={index}>{paragraph}</p>)}</div>}</div></div>
    </div></section>}

    {photos.length>0 && <section className="section-space"><div className="page-shell"><p className="eyebrow text-[var(--school-primary-on-secondary)]">Life at {school.name}</p><h2 className="display mt-4 text-5xl sm:text-7xl">The school beyond the badge.</h2>
      <div className="mt-12 grid auto-rows-[240px] gap-3 sm:grid-cols-3">{photos.map((photo,index:number)=><figure key={photo._key || photo.url} className={'relative overflow-hidden bg-[var(--school-primary)] '+(index===0?'sm:col-span-2 sm:row-span-2':'')}><img src={photo.url} alt={photo.alt || photo.caption || `Life at ${school.name}`} loading="lazy" decoding="async" className="h-full w-full object-cover"/>{photo.caption && <figcaption className="absolute inset-x-0 bottom-0 bg-black/65 p-4 text-sm text-white">{photo.caption}</figcaption>}</figure>)}</div>
    </div></section>}

    <section className="section-space" style={{background:withAlpha(theme.primary,.09)}}><div className="page-shell"><p className="eyebrow text-[var(--school-primary-on-secondary)]">{preview ? 'Yearbook preview' : 'Yearbook archive'}</p><h2 className="display mt-4 text-5xl sm:text-7xl">{preview && !books.length ? 'The first Kansenshi yearbook could start here.' : 'Choose a graduating class.'}</h2>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{books.map(b=><Link key={b._id} href={'/yearbooks/'+b.slug.current} className="focus-ring group overflow-hidden bg-[var(--school-primary)] text-[var(--school-primary-ink)]">{b.heroImage && <img src={imageUrl(b.heroImage,800)} alt={b.heroImage.alt || `${school.name} Class of ${b.graduationYear}`} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"/>}<div className="p-8"><p className="display text-7xl">{b.graduationYear}</p><h3 className="display mt-4 text-3xl">{b.title}</h3><p className="mt-5 inline-flex items-center gap-2 font-bold text-[var(--school-accent-on-primary)]">Open yearbook <ArrowRight className="size-4 transition group-hover:translate-x-1"/></p></div></Link>)}</div>
      {!books.length && <p className="mt-8">{preview ? 'No Kansenshi yearbook has been published on this demo.' : 'No yearbooks have been published yet.'}</p>}
    </div></section>
  </main>;
}
