import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Camera, Check, FileCheck2, LibraryBig, Printer, School } from "lucide-react";

export const metadata: Metadata = { title: "For Schools", description: "Professional photography, yearbook design, digital hosting and printing—handled for your school." };

const included = [
  { Icon: Camera, title: "Professional photography", copy: "Portraits, graduation, events, sport, staff and school life captured with a consistent visual direction." },
  { Icon: FileCheck2, title: "Yearbook design", copy: "Stories, student profiles, achievements and photography shaped into one polished editorial experience." },
  { Icon: LibraryBig, title: "Digital hosting", copy: "A permanent school archive that grows naturally as each new graduating class is added." },
  { Icon: Printer, title: "Physical editions", copy: "Hardcover or softcover print options for students, families, staff and the school library." },
];

export default function ForSchoolsPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-[#701d33] text-white">
        <img src="/images/cultural-day.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-22 mix-blend-luminosity" />
        <div className="page-shell relative z-10 grid min-h-[74svh] items-end gap-12 py-16 lg:grid-cols-[1.35fr_.65fr]">
          <div><p className="eyebrow text-[#f1ca7e]">For headteachers, PTAs & school leaders</p><h1 className="display mt-5 text-6xl leading-[.9] tracking-[-.05em] sm:text-8xl">Give every class something worth remembering.</h1></div>
          <div><p className="text-lg leading-8 text-white/74">A complete photography and yearbook service your school can continue each year—without building or managing another website.</p><Link href="/contact" className="focus-ring mt-8 inline-flex items-center gap-2 bg-[#f6f1e7] px-6 py-4 font-bold text-[#171713]">Create your school yearbook <ArrowRight className="size-4" /></Link></div>
        </div>
      </section>

      <section className="section-space bg-[#f6f1e7]">
        <div className="page-shell">
          <div className="grid gap-8 md:grid-cols-[.7fr_1.3fr]"><p className="eyebrow text-[#701d33]">What your school receives</p><h2 className="display text-5xl sm:text-7xl">One partner from the first portrait to the final printed page.</h2></div>
          <div className="mt-14 grid gap-px bg-black/15 sm:grid-cols-2">
            {included.map(({ Icon, title, copy }, index) => <article key={title} className="bg-[#fffdf8] p-8 sm:p-10"><div className="flex items-center justify-between"><Icon className="size-6 text-[#701d33]" /><span className="text-xs font-bold text-black/35">0{index + 1}</span></div><h3 className="display mt-14 text-3xl">{title}</h3><p className="mt-4 max-w-md leading-7 text-black/57">{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#132f31] text-white">
        <div className="page-shell grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div><School className="size-9 text-[#f1ca7e]" /><p className="eyebrow mt-8 text-[#f1ca7e]">Simple for the school</p><h2 className="display mt-4 text-5xl sm:text-7xl">You provide access, information and approval. We handle the rest.</h2></div>
          <ol className="space-y-0 border-t border-white/20">
            {[["Plan", "Agree the class, photography days, yearbook sections and approval process."], ["Photograph", "Capture students, staff, events, activities and the life of the school."], ["Shape the story", "Collect approved names, messages, memories and achievements."], ["Publish", "Launch the digital edition and prepare selected physical copies."], ["Continue", "Add the next graduating class to the same school archive."]].map(([title, copy], index) => <li key={title} className="grid grid-cols-[45px_1fr] gap-4 border-b border-white/20 py-7"><span className="display text-2xl text-[#f1ca7e]">0{index + 1}</span><div><h3 className="display text-2xl">{title}</h3><p className="mt-2 leading-7 text-white/60">{copy}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className="section-space bg-[#fffdf8]">
        <div className="page-shell grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div><p className="eyebrow text-[#ba6f32]">Built to continue</p><h2 className="display mt-5 text-5xl sm:text-7xl">A new website every year would be wasteful. A growing archive gets more valuable.</h2></div>
          <div className="bg-[#e7dcc7] p-7 sm:p-10">{["A dedicated school page", "A distinct yearbook for each class", "Consistent design and approved branding", "Mobile access for students and families", "A historical record that grows annually"].map((item) => <p key={item} className="flex gap-3 border-b border-black/13 py-4 font-semibold last:border-0"><Check className="size-5 shrink-0 text-[#701d33]" /> {item}</p>)}</div>
        </div>
      </section>
    </main>
  );
}
