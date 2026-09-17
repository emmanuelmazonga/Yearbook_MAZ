import Link from 'next/link';
import {notFound} from 'next/navigation';
import {content, imageUrl} from '@/lib/sanity';
export async function generateMetadata({params}: {params: Promise<{slug:string}>}) {
 const {slug}=await params; const school=(await content()).find(d=>d._type==='school' && d.slug?.current===slug);
 return {title:school?.name || 'School not found',description:school?.description || ''};
}
export default async function SchoolPage({params}: {params: Promise<{slug:string}>}) {
  const {slug}=await params, docs=await content();
  const school=docs.find(d=>d._type==='school' && d.slug?.current===slug);
  if(!school) notFound();
  const books=docs.filter(d=>d._type==='yearbook' && d.school?._ref===school._id).sort((a,b)=>b.graduationYear-a.graduationYear);
  return <main>
    <section className="relative min-h-[72svh] overflow-hidden bg-[#153f42] text-white">
      {school.coverImage && <img src={imageUrl(school.coverImage,1800)} alt={school.coverImage.alt || ''} className="absolute inset-0 h-full w-full object-cover opacity-70"/>}
      <div className="absolute inset-0 bg-gradient-to-r from-[#102a2c] via-[#102a2c]/72 to-transparent"/>
      <div className="page-shell relative z-10 flex min-h-[72svh] items-end pb-14 pt-28"><div className="max-w-4xl">
        <p className="eyebrow text-[#f1ca7e]">{school.city}, {school.country}</p>
        <h1 className="display mt-7 text-6xl leading-[.9] tracking-[-.05em] sm:text-8xl">{school.name}</h1>
        <p className="mt-7 text-xl italic text-[#f1ca7e]">{school.motto}</p>
      </div></div>
    </section>
    <section className="section-space"><div className="page-shell grid gap-14 lg:grid-cols-[.7fr_1.3fr]"><p className="eyebrow text-[#701d33]">Our school</p><p className="whitespace-pre-line text-lg leading-8 text-black/62">{school.description}</p></div></section>
    <section className="section-space bg-[#e7dcc7]"><div className="page-shell"><p className="eyebrow text-[#701d33]">Yearbook archive</p><h2 className="display mt-4 text-5xl sm:text-7xl">Choose a graduating class.</h2>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{books.map(b=><Link key={b._id} href={'/yearbooks/'+b.slug.current} className="focus-ring group overflow-hidden bg-[#701d33] text-white">{b.heroImage && <img src={imageUrl(b.heroImage,800)} alt={b.heroImage.alt || ''} className="aspect-[4/3] w-full object-cover"/>}<div className="p-8"><p className="display text-7xl">{b.graduationYear}</p><h3 className="display mt-4 text-3xl">{b.title}</h3><p className="mt-5 font-bold">Open yearbook →</p></div></Link>)}</div>
      {!books.length && <p className="mt-8">No yearbooks have been published yet.</p>}
    </div></section>
  </main>;
}
