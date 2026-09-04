import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, MapPin, ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "Copperview Secondary School", description: "The living yearbook archive for Copperview Secondary School in Kitwe." };

export default function CopperviewSchoolPage() {
  return (
    <main>
      <section className="relative min-h-[72svh] overflow-hidden bg-[#153f42] text-white">
        <img src="/images/hero-class-2026.webp" alt="Copperview Secondary School students" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#102a2c] via-[#102a2c]/72 to-transparent" />
        <div className="page-shell relative z-10 flex min-h-[72svh] items-end pb-14 pt-28">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-5">
              <span className="grid size-20 place-items-center border border-white/45 bg-[#701d33] text-2xl font-black">CV</span>
              <div><p className="eyebrow text-[#f1ca7e]">Established 1988</p><p className="mt-2 flex items-center gap-2 text-sm text-white/72"><MapPin className="size-4" /> Kitwe, Zambia</p></div>
            </div>
            <h1 className="display text-6xl leading-[.9] tracking-[-.05em] sm:text-8xl">Copperview<br />Secondary School</h1>
            <p className="mt-7 text-xl italic text-[#f1ca7e]">Knowledge · Character · Service</p>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
          <div><p className="eyebrow text-[#701d33]">Our school</p></div>
          <div>
            <h2 className="display max-w-4xl text-4xl leading-tight sm:text-6xl">A Copperbelt school shaped by curiosity, community and the courage to begin.</h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-black/62">Copperview Secondary is a fictional demonstration school created to show how a real school’s identity can live inside a growing digital archive. Its colours, voices and graduating classes remain distinct while sharing one reliable platform.</p>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {[["38", "Years of history"], ["186", "Students in 2026"], ["14", "Clubs & societies"]].map(([value, label]) => <div key={label} className="border-t border-black/20 pt-5"><strong className="display text-4xl text-[#701d33]">{value}</strong><p className="mt-2 text-sm text-black/52">{label}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#e7dcc7]">
        <div className="page-shell">
          <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow text-[#701d33]">Yearbook archive</p><h2 className="display mt-4 text-5xl sm:text-7xl">Choose a graduating class.</h2></div><p className="max-w-sm text-sm leading-6 text-black/54">New editions join the same shelf every year, building the school’s historical record over time.</p></div>
          <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
            <Link href="/yearbooks/copperview-2026" className="focus-ring group col-span-2 grid min-h-[430px] overflow-hidden bg-[#701d33] text-white sm:grid-cols-[1fr_.85fr] lg:min-h-[500px]">
              <div className="flex flex-col justify-between p-7 sm:p-10"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#f1ca7e]"><BookOpen className="size-4" /> Digital edition</div><div><p className="display text-8xl leading-none sm:text-9xl">26</p><h3 className="display mt-4 text-3xl">The Copper Chapter</h3><p className="mt-5 inline-flex items-center gap-2 font-bold">Open yearbook <ArrowRight className="size-4 transition group-hover:translate-x-1" /></p></div></div>
              <img src="/images/students-camera-football.webp" alt="" className="h-full min-h-[260px] w-full object-cover opacity-76 mix-blend-luminosity" />
            </Link>
            {[2027, 2028].map((year) => <article key={year} className="flex min-h-[430px] flex-col justify-between border border-black/15 bg-[#f6f1e7] p-6 lg:min-h-[500px]"><div className="flex justify-between text-xs font-bold uppercase tracking-[.18em] text-black/42"><span>Future edition</span><ShieldCheck className="size-4" /></div><div><p className="display text-7xl">{String(year).slice(2)}</p><p className="mt-3 border-t border-black/15 pt-4 text-sm text-black/52">Class of {year}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#fffdf8]">
        <div className="page-shell grid gap-10 lg:grid-cols-2">
          <div><p className="eyebrow text-[#ba6f32]">Our history</p><h2 className="display mt-4 text-5xl sm:text-7xl">More than dates.<br />A shared inheritance.</h2></div>
          <div className="space-y-8 border-l border-black/15 pl-7 sm:pl-10">
            {[["1988", "Copperview opens with its first Form One class."], ["2004", "The school’s science and technology wing is established."], ["2016", "Cultural Day becomes an annual celebration of Zambia’s many traditions."], ["2026", "The first living digital yearbook preserves a class in photographs, stories and sound."]].map(([year, copy]) => <article key={year} className="grid gap-2 sm:grid-cols-[90px_1fr]"><strong className="display text-3xl text-[#701d33]">{year}</strong><p className="pt-1 leading-7 text-black/60">{copy}</p></article>)}
          </div>
        </div>
      </section>
    </main>
  );
}
