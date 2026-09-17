"use client";

import type {CSSProperties} from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Search } from "lucide-react";

type School = {id:string; name:string; city:string; country:string; years:string[]; latest:string; image?:string; imageAlt:string; logo?:string; href:string; primary:string; primaryInk:string; accent:string};

export function SchoolDirectory({schools}: {schools: School[]}) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All");
  const visible = useMemo(() => schools.filter((school) => {
    const matchesQuery = school.name.toLowerCase().includes(query.toLowerCase()) || school.city.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (city === "All" || school.city === city);
  }), [schools, query, city]);

  return (
    <>
      <div className="grid gap-3 border-y border-black/15 py-5 sm:grid-cols-[1fr_auto]">
        <label className="flex items-center gap-3 bg-white/60 px-4">
          <Search className="size-5 text-black/45" />
          <span className="sr-only">Search schools</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by school or city" className="h-14 w-full bg-transparent text-base outline-none placeholder:text-black/38" />
        </label>
        <div className="flex gap-2 overflow-x-auto" aria-label="Filter schools by city">
          {["All", ...new Set(schools.map(s => s.city))].map((option) => (
            <button key={option} onClick={() => setCity(option)} className={"focus-ring min-w-fit px-5 text-sm font-bold transition " + (city === option ? "bg-[#701d33] text-white" : "border border-black/15 bg-white/50 hover:bg-white")}>{option}</button>
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((school, index) => (
          <article key={school.id} style={{'--school-primary':school.primary,'--school-primary-ink':school.primaryInk,'--school-accent':school.accent} as CSSProperties} className="group overflow-hidden border border-black/12 border-t-[5px] border-t-[var(--school-primary)] bg-[#fffdf8]">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--school-primary)]">
              {school.image && <img src={school.image} alt={school.imageAlt} className="h-full w-full object-cover opacity-72 transition duration-700 group-hover:scale-105" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 grid size-12 place-items-center overflow-hidden border border-white/45 bg-black/20 text-sm font-black text-white backdrop-blur-sm">{school.logo ? <img src={school.logo} alt="" className="h-full w-full object-contain bg-white p-1"/> : `0${index + 1}`}</span>
              <p className="absolute bottom-5 left-5 flex items-center gap-2 text-sm text-white/80"><MapPin className="size-4" /> {school.city}, {school.country}</p>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-5">
                <h2 className="display text-3xl leading-tight">{school.name}</h2>
                <Link href={school.href} aria-label={"Open " + school.name} className="focus-ring grid size-10 shrink-0 place-items-center rounded-full border border-black/18 transition group-hover:bg-[var(--school-primary)] group-hover:text-[var(--school-primary-ink)]"><ArrowUpRight className="size-4" /></Link>
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[.16em] text-black/42">Available yearbooks</p>
              <div className="mt-3 flex gap-2">{school.years.map((year) => <span key={year} className="border border-black/14 border-b-[var(--school-accent)] px-3 py-1.5 text-sm font-bold">{year}</span>)}</div>
              <p className="mt-5 border-t border-black/10 pt-4 text-sm text-black/55">Latest: <strong className="text-black">{school.latest}</strong></p>
            </div>
          </article>
        ))}
      </div>
      {!visible.length && <div className="mt-10 border border-dashed border-black/25 px-6 py-16 text-center"><p className="display text-3xl">No schools found</p><p className="mt-2 text-black/55">Try a different school name or location.</p></div>}
    </>
  );
}
