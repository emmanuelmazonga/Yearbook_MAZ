import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, BookOpen, Crown, Medal, MessageCircleHeart, Users } from "lucide-react";
import { StudentBrowser } from "@/components/student-browser";
import { YearbookGallery } from "@/components/yearbook-gallery";

export const metadata: Metadata = { title: "Class of 2026", description: "Open Copperview Secondary School's immersive Class of 2026 digital yearbook." };

const schoolLife = [
  { Icon: Users, title: "14 clubs", copy: "From JETS and Debate to Photography, Drama and Scripture Union." },
  { Icon: Medal, title: "7 sports", copy: "Football, netball, athletics, basketball, volleyball, chess and table tennis." },
  { Icon: Crown, title: "24 leaders", copy: "Prefects, club captains and house leaders who served the school community." },
  { Icon: BookOpen, title: "31 awards", copy: "Academic, sporting, cultural and service achievements celebrated this year." },
];

export default function YearbookPage() {
  return (
    <main>
      <section className="relative min-h-[calc(100svh-76px)] overflow-hidden bg-[#4b1223] text-white">
        <img src="/images/hero-class-2026.webp" alt="Copperview Class of 2026 students celebrating together" className="absolute inset-0 h-full w-full object-cover opacity-68" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#32101d] via-[#32101d]/68 to-transparent" />
        <div className="grain absolute inset-0" />
        <div className="page-shell relative z-10 flex min-h-[calc(100svh-76px)] flex-col justify-between pb-10 pt-8">
          <div className="flex items-center justify-between border-b border-white/30 pb-5 text-[11px] font-bold uppercase tracking-[.2em]"><span>Copperview Secondary School</span><span>Kitwe · Zambia</span></div>
          <div className="py-16">
            <p className="eyebrow text-[#f1ca7e]">The digital yearbook · Volume 01</p>
            <div className="mt-5 grid items-end gap-6 lg:grid-cols-[auto_1fr]">
              <span className="display text-[clamp(9rem,25vw,20rem)] leading-[.65] tracking-[-.09em]">26</span>
              <div className="max-w-lg pb-2"><h1 className="display text-5xl leading-none sm:text-7xl">The Copper Chapter</h1><p className="mt-5 text-base leading-7 text-white/74">186 students. One final year. Thousands of moments worth keeping.</p></div>
            </div>
          </div>
          <a href="#headteacher" className="focus-ring flex items-center justify-between border-t border-white/30 pt-5 text-sm font-bold"><span>Begin the story</span><ArrowDown className="size-5" /></a>
        </div>
      </section>

      <section id="headteacher" className="section-space bg-[#fffdf8]">
        <div className="page-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div className="relative min-h-[480px] overflow-hidden bg-[#173f42]"><img src="/images/students-camera-football.webp" alt="Copperview school community" className="h-full w-full object-cover opacity-72 grayscale" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-7 pt-24 text-white"><p className="eyebrow text-[#f1ca7e]">Mrs. Ruth Mumba</p><p className="display mt-2 text-3xl">Headteacher</p></div></div>
          <div className="flex items-center">
            <div><p className="eyebrow text-[#701d33]">A message to the class</p><blockquote className="display mt-6 text-4xl leading-[1.18] sm:text-6xl">“Carry your curiosity with you. It will open more doors than certainty ever could.”</blockquote><div className="mt-8 space-y-5 text-lg leading-8 text-black/62"><p>Dear Class of 2026, you leave Copperview as thinkers, teammates and citizens ready to serve. We have watched you turn setbacks into lessons and classrooms into communities.</p><p>May this yearbook remind you not only of where you sat, but of who sat beside you—and how much you helped one another become.</p></div><p className="display mt-8 text-3xl text-[#701d33]">Ruth Mumba</p></div>
          </div>
        </div>
      </section>

      <section id="students" className="section-space bg-[#e7dcc7]">
        <div className="page-shell">
          <div className="grid gap-7 md:grid-cols-[.7fr_1.3fr] md:items-end"><p className="eyebrow text-[#701d33]">The graduating class</p><div><h2 className="display text-5xl tracking-[-.04em] sm:text-7xl">Meet the people behind the memories.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-black/58">Browse student portraits, favourite moments and the futures they are already imagining.</p></div></div>
          <div className="mt-12"><StudentBrowser /></div>
        </div>
      </section>

      <section className="section-space bg-[#132f31] text-white">
        <div className="page-shell">
          <div className="grid gap-8 md:grid-cols-[.7fr_1.3fr] md:items-end"><p className="eyebrow text-[#f1ca7e]">School life / in photographs</p><h2 className="display text-5xl tracking-[-.04em] sm:text-7xl">The moments between lessons.</h2></div>
          <div className="mt-12"><YearbookGallery /></div>
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
          <div className="section-space lg:pr-14"><p className="eyebrow text-[#f1ca7e]">Memory wall</p><h2 className="display mt-5 text-5xl sm:text-7xl">Things only our class would understand.</h2><div className="mt-12 grid gap-4 sm:grid-cols-2">{[
            ["Funniest moment", "The microphone staying on during assembly rehearsal."],
            ["Advice to Grade 8", "Ask questions early. Join at least one club."],
            ["In ten years", "Still in the group chat, but hopefully replying faster."],
            ["Most unforgettable", "The rain starting exactly as Cultural Day ended."],
          ].map(([label, copy], index) => <article key={label} className={"p-6 " + (index % 2 ? "bg-[#f6f1e7] text-[#171713]" : "border border-white/25")}><p className="eyebrow opacity-60">{label}</p><p className="display mt-6 text-2xl leading-snug">“{copy}”</p></article>)}</div></div>
          <div className="relative min-h-[560px]"><img src="/images/cultural-day.webp" alt="Copperview students celebrating cultural day" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#3b0d1b]/72 via-transparent to-transparent" /><div className="absolute bottom-9 left-8 right-8"><MessageCircleHeart className="size-8 text-[#f1ca7e]" /><p className="display mt-4 max-w-md text-3xl">Every memory adds a voice to the class story.</p></div></div>
        </div>
      </section>

      <section className="section-space bg-[#fffdf8]">
        <div className="page-shell">
          <div className="text-center"><p className="eyebrow text-[#701d33]">Take it off the screen</p><h2 className="display mx-auto mt-4 max-w-4xl text-5xl sm:text-7xl">A physical edition for the shelf—and the years ahead.</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-black/58">Selected portraits, stories and highlights from the digital yearbook, professionally designed and printed.</p></div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
            {[["Hardcover edition", "Premium cloth-touch cover · 120 pages", "Price confirmed with school"], ["Softcover edition", "Lightweight matte cover · 96 pages", "Price confirmed with school"]].map(([title, detail, price], index) => <article key={title} className={"p-8 sm:p-10 " + (index === 0 ? "bg-[#173f42] text-white" : "border border-black/15")}><p className="eyebrow opacity-58">Printed yearbook · 2026</p><div className={"cover-shadow mx-auto my-10 aspect-[3/4] w-40 p-5 " + (index === 0 ? "bg-[#701d33]" : "bg-[#d8b56d] text-[#171713]")}><p className="display text-6xl">26</p><p className="mt-14 text-xs font-bold uppercase tracking-[.16em]">Copperview</p></div><h3 className="display text-3xl">{title}</h3><p className="mt-3 text-sm opacity-64">{detail}</p><p className="mt-7 font-bold">{price}</p><Link href="/contact" className={"focus-ring mt-7 inline-flex items-center gap-2 border-b pb-2 font-bold " + (index === 0 ? "border-[#f1ca7e] text-[#f1ca7e]" : "border-[#701d33] text-[#701d33]")}>Register interest <ArrowRight className="size-4" /></Link></article>)}
          </div>
        </div>
      </section>
    </main>
  );
}
