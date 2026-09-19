import {content, imageUrl} from "@/lib/sanity";
import Link from "next/link";
import { ArrowDown, ArrowRight, Camera, Layers3, LibraryBig, MapPin, Quote } from "lucide-react";

export default async function Home() {
 const docs=await content(); const settings=docs.find(d=>d._id==='siteSettings');
 const book=docs.find(d=>d._type==='yearbook' && d._id===settings?.featuredYearbook?._ref);
 const school=docs.find(d=>d._id===book?.school?._ref);
 const href=book ? '/yearbooks/'+book.slug.current : '/schools';
 const books=school ? docs.filter(d=>d._type==='yearbook' && d.school?._ref===school._id) : [];
 const student=book && docs.find(d=>d._type==='studentProfile' && d.yearbook?._ref===book._id && d.quote);
 const photo=book && docs.find(d=>d._type==='galleryPhoto' && d.yearbook?._ref===book._id);
  return (
    <main>
      <section className="photo-wash grain relative min-h-[calc(100svh-76px)] overflow-hidden bg-[#153f42] text-white">
        {(settings?.heroImage || book?.heroImage) && <img src={imageUrl(settings?.heroImage || book?.heroImage,1800)} alt={settings?.heroImage?.alt || book?.heroImage?.alt || `${school?.name || 'School'} graduating class`} fetchPriority="high" decoding="async" className="absolute inset-0 -z-10 h-full w-full object-cover object-[62%_center]"/>}
        <div className="page-shell relative z-10 flex min-h-[calc(100svh-76px)] items-end pb-12 pt-28 sm:pb-16 lg:items-center lg:py-20">
          <div className="max-w-[760px]">
            <p className="eyebrow reveal text-[#f1ca7e]">{school ? `${school.name} · Class of ${book?.graduationYear}` : settings?.siteTitle}</p>
            <h1 className="display reveal reveal-delay mt-5 text-[clamp(3.7rem,9vw,8.7rem)] font-medium leading-[.82] tracking-[-.065em]">
              Your school years.<br /><em className="font-normal text-[#f1ca7e]">Remembered forever.</em>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/82 sm:text-xl sm:leading-8">
              {settings?.introduction}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="focus-ring inline-flex items-center gap-3 bg-[#f6f1e7] px-6 py-4 font-bold text-[#171713] transition hover:bg-[#f1ca7e]">
                Start your school yearbook <ArrowRight className="size-4" />
              </Link>
              <Link href={href} className="focus-ring inline-flex items-center gap-3 border border-white/55 bg-black/25 px-6 py-4 font-bold text-white backdrop-blur-sm transition hover:bg-black/40">
                {book ? `Open the ${book.graduationYear} yearbook` : "Explore schools"}
              </Link>
            </div>
          </div>
          <a href="#story" aria-label="Continue to story" className="focus-ring absolute bottom-8 right-0 hidden rounded-full border border-white/40 p-4 text-white lg:block">
            <ArrowDown className="size-5" />
          </a>
        </div>
        <div className="absolute right-[-1rem] top-[40%] hidden -translate-y-1/2 rotate-90 text-[11px] font-bold uppercase tracking-[.42em] text-white/60 xl:block">This is where our memories live · {book?.graduationYear}</div>
      </section>

      <section id="story" className="section-space overflow-hidden bg-[#f6f1e7]">
        <div className="page-shell grid items-center gap-14 lg:grid-cols-[.88fr_1.12fr]">
          <div>
            <p className="eyebrow text-[#701d33]">Featured yearbook</p>
            <h2 className="display mt-5 text-5xl leading-[.98] tracking-[-.04em] sm:text-7xl">Not a list of names. A story you can step back into.</h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-black/66">Meet the students, hear their voices, revisit cultural day, sports finals, club afternoons and the moments between the big moments.</p>
            <div className="mt-8 flex items-center gap-5">
              <Link href={href} className="focus-ring inline-flex items-center gap-2 border-b-2 border-[#701d33] pb-2 font-bold text-[#701d33]">{book ? `Browse Class of ${book.graduationYear}` : "Browse schools"} <ArrowRight className="size-4" /></Link>
              <span className="text-sm text-black/45">{book?.studentCount ? `${book.studentCount} students` : ""}</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[680px] pb-12 pt-4">
            <div className="absolute bottom-0 left-[5%] top-[15%] w-[82%] rotate-[-5deg] bg-[#d9cdbb]" />
            <article className="cover-shadow grain relative ml-auto aspect-[4/5] w-[72%] overflow-hidden bg-[#701d33] text-white">
              {book?.heroImage && <img src={imageUrl(book.heroImage)} alt={book.heroImage.alt || `${school?.name || 'School'} graduating class`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-luminosity" />}
              <div className="absolute inset-0 bg-gradient-to-t from-[#38101d] via-transparent to-[#132f31]/20" />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/35 p-5 text-[10px] font-bold uppercase tracking-[.2em]">
                <span>{school?.name}</span><span>{school?.city} · {school?.country}</span>
              </div>
              <div className="absolute bottom-0 p-7 sm:p-10">
                <span className="display text-[7rem] leading-none sm:text-[10rem]">{book ? String(book.graduationYear).slice(-2) : ""}</span>
                <h3 className="display mt-1 text-3xl">{book?.title || "Your next chapter"}</h3>
                <p className="mt-2 text-xs font-bold uppercase tracking-[.24em] text-[#f1ca7e]">Our final year · our forever story</p>
              </div>
            </article>
            <div className="absolute bottom-4 left-0 bg-[#132f31] px-5 py-4 text-white shadow-lg">
              <p className="display text-2xl">{book ? `Class of ${book.graduationYear}` : "Yearbook archive"}</p>
              <p className="mt-1 text-xs text-white/60">Open digital edition</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#171713] text-white">
        <div className="page-shell">
          <div className="grid gap-8 border-b border-white/15 pb-12 md:grid-cols-[.7fr_1.3fr]">
            <p className="eyebrow text-[#d8b56d]">From camera to archive</p>
            <h2 className="display text-4xl leading-tight sm:text-6xl">One thoughtful process.<br />A legacy that keeps growing.</h2>
          </div>
          <div className="grid md:grid-cols-3">
            {[
              [Camera, "01", "We photograph", "Portraits, graduation, sports, teachers, clubs and the everyday life that makes a school feel like home."],
              [Layers3, "02", "We design", "Images, memories and achievements become a cohesive, premium editorial story—not a spreadsheet of profiles."],
              [LibraryBig, "03", "We preserve", "Each graduating class joins the school’s permanent digital archive, ready to revisit on any screen."],
            ].map(([Icon, number, title, copy], index) => (
              <article key={title as string} className={"py-10 md:px-9 " + (index ? "border-t border-white/15 md:border-l md:border-t-0" : "")}>
                <div className="flex items-center justify-between text-[#d8b56d]"><Icon className="size-6" /><span className="text-sm font-bold">{number as string}</span></div>
                <h3 className="display mt-16 text-3xl">{title as string}</h3>
                <p className="mt-4 max-w-sm text-base leading-7 text-white/62">{copy as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#e7dcc7]">
        <div className="page-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-[#701d33]">A school’s living archive</p>
              <h2 className="display mt-4 text-5xl tracking-[-.04em] sm:text-7xl">Every class adds a chapter.</h2>
            </div>
            <Link href={school ? '/schools/'+school.slug.current : '/schools'} className="focus-ring inline-flex items-center gap-2 font-bold text-[#701d33]">Explore the school archive <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {books.map((edition, index) => (
              <article key={edition._id} className={"group relative aspect-[3/4.2] overflow-hidden p-5 transition hover:-translate-y-2 " + (index === 0 ? "bg-[#701d33] text-white" : index === 1 ? "bg-[#173f42] text-white" : index === 2 ? "bg-[#bd7132] text-white" : "border border-black/20 bg-[#f6f1e7]")}>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[.18em] opacity-65"><span>{school?.name}</span><span>0{index + 1}</span></div>
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="display text-5xl leading-none sm:text-7xl">{String(edition.graduationYear).slice(-2)}</p>
                  <p className="mt-3 border-t border-current/30 pt-3 text-xs font-bold uppercase tracking-[.18em]"><Link href={"/yearbooks/"+edition.slug.current}>Read {edition.title}</Link></p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-[#fffdf8] lg:grid-cols-2">
        <div className="min-h-[460px] bg-[#132f31]">{photo?.image && <img src={imageUrl(photo.image)} alt={photo.image.alt || photo.title || 'Students taking part in school life'} loading="lazy" decoding="async" className="h-full min-h-[460px] w-full object-cover"/>}</div>
        <div className="flex items-center px-6 py-16 sm:px-12 lg:px-[10%]">
          <div className="max-w-xl">
            <Quote className="size-10 text-[#ba6f32]" />
            <blockquote className="display mt-7 text-3xl leading-tight sm:text-5xl">{student ? `“${student.quote}”` : settings?.tagline}</blockquote>
            <p className="mt-7 font-bold text-[#701d33]">{student ? `— ${student.fullName}, Class of ${book?.graduationYear}` : ""}</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-black/52"><MapPin className="size-4" /> {school?.name}{school ? `, ${school.city}` : ""}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
