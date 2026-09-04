import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Camera, Images, Sparkles } from "lucide-react";
import { YearbookGallery } from "@/components/yearbook-gallery";

export const metadata: Metadata = { title: "School Photography", description: "Graduation, portrait, sports and event photography for schools across Zambia." };

const services = ["Graduation photography", "Individual portraits", "Group & class photos", "Sports photography", "Event photography", "Club photography", "Staff portraits"];

export default function PhotographyPage() {
  return (
    <main>
      <section className="grid min-h-[78svh] bg-[#132f31] text-white lg:grid-cols-[1.05fr_.95fr]">
        <div className="flex items-center px-[max(1.25rem,calc((100vw-1240px)/2))] py-20 lg:pr-12">
          <div><p className="eyebrow text-[#f1ca7e]">School photography / Copperbelt</p><h1 className="display mt-5 text-6xl leading-[.9] tracking-[-.05em] sm:text-8xl">Photographs that feel like being there again.</h1><p className="mt-7 max-w-xl text-lg leading-8 text-white/68">Professional school photography with warmth, energy and a sense of place—from formal portraits to the moments nobody planned.</p><Link href="/contact" className="focus-ring mt-9 inline-flex items-center gap-2 bg-[#f6f1e7] px-6 py-4 font-bold text-[#171713]">Book school photography <ArrowRight className="size-4" /></Link></div>
        </div>
        <img src="/images/students-camera-football.webp" alt="Copperview students posing for a relaxed school portrait" className="min-h-[520px] h-full w-full object-cover" />
      </section>

      <section className="section-space">
        <div className="page-shell grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div><p className="eyebrow text-[#701d33]">Photography services</p><h2 className="display mt-4 text-5xl sm:text-6xl">One school.<br />Every side of it.</h2></div>
          <div className="grid gap-px bg-black/15 sm:grid-cols-2">
            {services.map((service, index) => <article key={service} className="flex min-h-40 items-end justify-between bg-[#fffdf8] p-6"><div><span className="text-xs font-bold text-[#ba6f32]">0{index + 1}</span><h3 className="display mt-8 text-2xl">{service}</h3></div>{index % 3 === 0 ? <Camera className="size-5 text-[#701d33]" /> : index % 3 === 1 ? <Images className="size-5 text-[#701d33]" /> : <Sparkles className="size-5 text-[#701d33]" />}</article>)}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#132f31] text-white">
        <div className="page-shell"><p className="eyebrow text-[#f1ca7e]">Selected school life</p><h2 className="display mt-4 max-w-3xl text-5xl sm:text-7xl">Portraits, movement and everything between.</h2><div className="mt-12"><YearbookGallery /></div></div>
      </section>

      <section className="section-space bg-[#e7dcc7]">
        <div className="page-shell grid gap-9 lg:grid-cols-2 lg:items-center"><h2 className="display text-5xl sm:text-7xl">Today’s photographs can become tomorrow’s yearbook.</h2><div><p className="max-w-xl text-lg leading-8 text-black/62">Book photography independently, then choose whether those images should form part of a full digital and printed yearbook later.</p><Link href="/for-schools" className="focus-ring mt-7 inline-flex items-center gap-2 border-b-2 border-[#701d33] pb-2 font-bold text-[#701d33]">See the complete school service <ArrowRight className="size-4" /></Link></div></div>
      </section>
    </main>
  );
}
