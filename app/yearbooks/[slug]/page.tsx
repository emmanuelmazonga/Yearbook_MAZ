import {content, imageUrl} from "@/lib/sanity";
import {notFound} from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownIcon as ArrowDown, ArrowRightIcon as ArrowRight, BookOpenIcon as BookOpen, CrownIcon as Crown, MedalIcon as Medal, ChatCircleTextIcon as MessageCircleHeart, UsersIcon as Users } from "@phosphor-icons/react/ssr";
import { StudentBrowser } from "@/components/student-browser";
import { YearbookGallery } from "@/components/yearbook-gallery";
import {pageMetadata} from "@/lib/site";
import {studentPortraitUrl} from "@/lib/demo-portrait";




export async function generateMetadata({params}: {params: Promise<{slug:string}>}): Promise<Metadata> {
 const {slug}=await params; const docs=await content(); const book=docs.find(d=>d._type==='yearbook' && d.slug?.current===slug);
 if(!book) return {title:'Yearbook not found',robots:{index:false,follow:false}};
 const school=docs.find(d=>d._id===book.school?._ref);
 const sample=book.slug?.current==='copperview-2026';
 return pageMetadata({title:`${book.title}${sample ? ' · Sample' : ''} · Class of ${book.graduationYear}`,description:sample ? `Explore a fictional sample yearbook for the Class of ${book.graduationYear}.` : book.introduction || `Explore ${school?.name || 'the school'} Class of ${book.graduationYear} digital yearbook.`,path:`/yearbooks/${slug}`,image:imageUrl(book.heroImage,1200) || null});
}

export default async function YearbookPage({params}: {params: Promise<{slug:string}>}) {
 const {slug} = await params; const docs = await content();
 const book = docs.find(d=>d._type==='yearbook' && d.slug?.current===slug); if(!book) notFound();
 const school=docs.find(d=>d._id===book.school?._ref); if(!school) notFound();
 const sample=book.slug?.current==='copperview-2026';
 const related=(type:string)=>docs.filter(d=>d._type===type && d.yearbook?._ref===book._id);
 const students=related('studentProfile').map(s=>({id:s._id,name:s.fullName,nickname:s.nickname||'',quote:s.quote||'',activity:s.activity||'',memory:s.favouriteMemory||'',ambition:s.ambition||'',group:s.classGroup,image:studentPortraitUrl(s,600),alt:s.portrait?.alt||s.fullName,biography:s.biography,achievements:s.achievements}));
 const photos=related('galleryPhoto').map((p,i)=>({id:p._id,title:p.title,category:p.category,image:imageUrl(p.image),alt:p.image?.alt||p.title,caption:p.image?.caption,position:'center',span:i===0?'sm:col-span-2 sm:row-span-2':''}));
 const memories=related('memory'); const head=book.headteacherMessage;
 const schoolLife: {Icon: typeof Users; title: string; copy: string}[]=(book.schoolLife||[]).map((h:{title:string;description:string},i:number)=>({Icon:[Users,Medal,Crown,BookOpen][i%4],title:h.title,copy:h.description}));
  return (
    <main>
      <section className="relative min-h-[calc(100svh-76px)] overflow-hidden bg-[#4b1223] text-white">
        <img src={imageUrl(book.heroImage,1800)} alt={book.heroImage?.alt || `${school.name} Class of ${book.graduationYear}`} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-68" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#32101d] via-[#32101d]/68 to-transparent" />
        <div className="grain absolute inset-0" />
        <div className="page-shell relative z-10 flex min-h-[calc(100svh-76px)] flex-col justify-between pb-10 pt-8">
          <div className="flex items-center justify-between border-b border-white/30 pb-5 text-[11px] font-bold uppercase tracking-[.2em]"><span>{school.name}{sample ? ' · Fictional demo school' : ''}</span><span>{school.city} · {school.country}</span></div>
          <div className="py-16">
            <p className="eyebrow text-[#f1ca7e]">The digital yearbook · Volume {book.volume}</p>
            <div className="mt-5 grid items-end gap-6 lg:grid-cols-[auto_1fr]">
              <span className="display text-[clamp(9rem,25vw,20rem)] leading-[.65] tracking-[-.09em]">{String(book.graduationYear).slice(-2)}</span>
              <div className="max-w-lg pb-2"><h1 className="display text-5xl leading-none sm:text-7xl">{book.title}{sample && <span className="ml-3 inline-block align-middle font-sans text-base font-semibold lowercase tracking-normal text-[#f1ca7e] sm:text-lg">sample</span>}</h1><p className="mt-5 text-base leading-7 text-white/74">{sample ? 'A fictional preview of how a graduating class could preserve its portraits, stories and memories.' : book.introduction}</p></div>
            </div>
          </div>
          <a href={head ? "#headteacher" : "#students"} className="focus-ring flex items-center justify-between border-t border-white/30 pt-5 text-sm font-bold"><span>Begin the story</span><ArrowDown className="size-5" /></a>
        </div>
      </section>

      {head && <section id="headteacher" className="section-space bg-[#fffdf8]">
        <div className="page-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div className="relative min-h-[480px] overflow-hidden bg-[#173f42]"><img src={imageUrl(head.portrait)} alt={head.portrait?.alt || `${head.name}, headteacher`} loading="lazy" decoding="async" className="h-full w-full object-cover opacity-72 grayscale" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-7 pt-24 text-white"><p className="eyebrow text-[#f1ca7e]">{head.name}</p><p className="display mt-2 text-3xl">Headteacher</p></div></div>
          <div className="flex items-center">
            <div><p className="eyebrow text-[#701d33]">A message to the class</p><blockquote className="display mt-6 text-4xl leading-[1.18] sm:text-6xl">“{head.quote}”</blockquote><div className="mt-8 space-y-5 text-lg leading-8 text-black/62">{head.message?.split("\n\n").map((p:string,i:number)=><p key={i}>{p}</p>)}</div><p className="display mt-8 text-3xl text-[#701d33]">{head.name}</p></div>
          </div>
        </div>
      </section>}

      <section id="students" className="section-space bg-[#e7dcc7]">
        <div className="page-shell">
          <div className="grid gap-7 md:grid-cols-[.7fr_1.3fr] md:items-end"><p className="eyebrow text-[#701d33]">The graduating class</p><div><h2 className="display text-5xl tracking-[-.04em] sm:text-7xl">Meet the people behind the memories.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-black/58">Browse student portraits, favourite moments and the futures they are already imagining.</p></div></div>
          <div className="mt-12"><StudentBrowser students={students} year={book.graduationYear} /></div>
        </div>
      </section>

      <section className="section-space bg-[#132f31] text-white">
        <div className="page-shell">
          <div className="grid gap-8 md:grid-cols-[.7fr_1.3fr] md:items-end"><p className="eyebrow text-[#f1ca7e]">School life / in photographs</p><h2 className="display text-5xl tracking-[-.04em] sm:text-7xl">The moments between lessons.</h2></div>
          <div className="mt-12"><YearbookGallery photos={photos} /></div>
        </div>
      </section>

      <section className="section-space bg-[#f6f1e7]">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
            <div><p className="eyebrow text-[#ba6f32]">Clubs, sport & leadership</p><h2 className="display mt-4 text-5xl sm:text-7xl">We found our place.</h2><p className="mt-6 max-w-sm text-lg leading-8 text-black/58">Beyond the classroom, students made teams, tested ideas and learned how to lead.</p></div>
            <div className="grid gap-px bg-black/15 sm:grid-cols-2">
              {schoolLife.map(({ Icon, title, copy }) => <article key={title} className="bg-[#fffdf8] p-7 sm:p-9"><Icon className="size-6 text-[#701d33]" /><h3 className="display mt-12 text-3xl">{title}</h3><p className="mt-3 leading-7 text-black/55">{copy}</p></article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#701d33] text-white">
        <div className="page-shell grid lg:grid-cols-[1fr_1fr]">
          <div className="section-space lg:pr-14"><p className="eyebrow text-[#f1ca7e]">Memory wall</p><h2 className="display mt-5 text-5xl sm:text-7xl">Things only our class would understand.</h2><div className="mt-12 grid gap-4 sm:grid-cols-2">{memories.map(({title:label, body:copy, _id}, index) => <article key={_id} className={"p-6 " + (index % 2 ? "bg-[#f6f1e7] text-[#171713]" : "border border-white/25")}><p className="eyebrow opacity-60">{label}</p><p className="display mt-6 text-2xl leading-snug">“{copy}”</p></article>)}</div></div>
          <div className="relative min-h-[560px]">{photos[0]?.image && <img src={photos[0].image} alt={photos[0].alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />}<div className="absolute inset-0 bg-gradient-to-t from-[#3b0d1b]/72 via-transparent to-transparent" /><div className="absolute bottom-9 left-8 right-8"><MessageCircleHeart className="size-8 text-[#f1ca7e]" /><p className="display mt-4 max-w-md text-3xl">Every memory adds a voice to the class story.</p></div></div>
        </div>
      </section>

      <section className="section-space bg-[#fffdf8]">
        <div className="page-shell">
          <div className="text-center"><p className="eyebrow text-[#701d33]">Take it off the screen</p><h2 className="display mx-auto mt-4 max-w-4xl text-5xl sm:text-7xl">A physical edition for the shelf—and the years ahead.</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-black/58">Selected portraits, stories and highlights from the digital yearbook, professionally designed and printed.</p></div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
            {(book.printOptions || []).map(({title,description:detail,priceLabel:price}:{title:string;description:string;priceLabel?:string}, index:number) => <article key={title} className={"p-8 sm:p-10 " + (index === 0 ? "bg-[#173f42] text-white" : "border border-black/15")}><p className="eyebrow opacity-58">Printed yearbook · {book.graduationYear}</p><div className={"cover-shadow mx-auto my-10 aspect-[3/4] w-40 p-5 " + (index === 0 ? "bg-[#701d33]" : "bg-[#d8b56d] text-[#171713]")}><p className="display text-6xl">{String(book.graduationYear).slice(-2)}</p><p className="mt-14 text-xs font-bold uppercase tracking-[.16em]">{school.name}</p></div><h3 className="display text-3xl">{title}</h3><p className="mt-3 text-sm opacity-64">{detail}</p><p className="mt-7 font-bold">{price}</p><Link href="/contact" className={"focus-ring mt-7 inline-flex items-center gap-2 border-b pb-2 font-bold " + (index === 0 ? "border-[#f1ca7e] text-[#f1ca7e]" : "border-[#701d33] text-[#701d33]")}>Register interest <ArrowRight className="size-4" /></Link></article>)}
          </div>
        </div>
      </section>
    </main>
  );
}
