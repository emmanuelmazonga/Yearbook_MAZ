"use client";

import { useMemo, useState } from "react";
import { CameraIcon as Camera, CaretRightIcon as ChevronRight, TrophyIcon as Trophy, XIcon as X } from "@phosphor-icons/react/ssr";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Student = {id:string; name:string; nickname:string; quote:string; activity:string; memory:string; ambition:string; group:string; image?:string; alt:string; biography?:string; achievements?:string[]};

export function StudentBrowser({students, year}: {students: Student[]; year:number}) {
  const [group, setGroup] = useState("All");
  const [sort, setSort] = useState<"first" | "surname">("first");
  const visible = useMemo(() => students
    .filter((student) => group === "All" || student.group === group)
    .sort((a, b) => {
      const aValue = sort === "first" ? a.name : a.name.split(" ").at(-1) ?? a.name;
      const bValue = sort === "first" ? b.name : b.name.split(" ").at(-1) ?? b.name;
      return aValue.localeCompare(bValue);
    }), [students, group, sort]);

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-y border-black/14 py-4">
        <div className="flex gap-2" aria-label="Filter students by class">
          {["All", ...new Set(students.map(s => s.group))].map((option) => <button key={option} onClick={() => setGroup(option)} className={"focus-ring px-4 py-2 text-sm font-bold " + (group === option ? "bg-[#701d33] text-white" : "border border-black/15")}>{option === "All" ? "All students" : option}</button>)}
        </div>
        <button onClick={() => setSort(sort === "first" ? "surname" : "first")} className="focus-ring text-sm font-bold text-[#701d33]">Sort by {sort === "first" ? "surname" : "first name"}</button>
      </div>
      {!visible.length && <p>No published student profiles yet.</p>}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((student) => (
          <Dialog key={student.id}>
            <DialogTrigger asChild>
              <button className="focus-ring group overflow-hidden bg-[#fffdf8] text-left shadow-[0_12px_38px_rgba(35,26,17,.09)]">
                <div className="aspect-[4/5] overflow-hidden bg-[#173f42]">
                  {student.image && <img src={student.image} alt={student.alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"/>}
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-[#ba6f32]">{student.group} · {student.activity}</p>
                  <h3 className="display mt-2 text-2xl">{student.name}</h3>
                  <p className="mt-3 line-clamp-2 text-sm italic leading-6 text-black/55">“{student.quote}”</p>
                  <span className="mt-5 flex items-center gap-2 text-sm font-bold text-[#701d33]">Read profile <ChevronRight className="size-4 transition group-hover:translate-x-1" /></span>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="max-h-[calc(100dvh-1rem)] max-w-4xl gap-0 overflow-y-auto border-0 bg-[#f6f1e7] p-0 sm:max-h-[calc(100dvh-2rem)] sm:max-w-4xl">
              <DialogClose className="focus-ring absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-[#fffdf8] text-[#171713] shadow-md" aria-label="Close profile"><X className="size-5" /></DialogClose>
              <div className="grid lg:grid-cols-[.55fr_1.45fr]">
                <div className="h-[min(24dvh,180px)] overflow-hidden bg-[#173f42] sm:h-[min(28dvh,220px)] lg:h-full lg:min-h-[380px]">{student.image && <img src={student.image} alt={student.alt} decoding="async" className="h-full w-full object-contain lg:object-cover lg:object-top"/>}</div>
                <div className="p-5 sm:p-8 lg:p-10">
                  <DialogHeader>
                    <p className="eyebrow text-[#ba6f32]">{student.group} · Class of {year}</p>
                    <DialogTitle className="display mt-2 text-4xl sm:text-5xl">{student.name}</DialogTitle>
                    <DialogDescription className="text-base text-black/48">“{student.nickname}” to the people who know them best.</DialogDescription>
                  </DialogHeader>
                  <blockquote className="display mt-8 border-l-4 border-[#701d33] pl-5 text-2xl leading-snug">“{student.quote}”</blockquote>
                  {student.biography && <p className="mt-6 whitespace-pre-line">{student.biography}</p>}
                  {student.achievements?.length ? <ul className="mt-6 list-disc pl-5">{student.achievements.map(a => <li key={a}>{a}</li>)}</ul> : null}
                  <dl className="mt-9 space-y-6">
                    <div className="flex gap-4"><Camera className="mt-1 size-5 shrink-0 text-[#701d33]" /><div><dt className="text-xs font-bold uppercase tracking-[.16em] text-black/42">School life</dt><dd className="mt-1 font-semibold">{student.activity}</dd></div></div>
                    <div className="flex gap-4"><Trophy className="mt-1 size-5 shrink-0 text-[#701d33]" /><div><dt className="text-xs font-bold uppercase tracking-[.16em] text-black/42">Favourite memory</dt><dd className="mt-1 leading-6">{student.memory}</dd></div></div>
                    <div><dt className="text-xs font-bold uppercase tracking-[.16em] text-black/42">Future ambition</dt><dd className="display mt-2 text-3xl text-[#701d33]">{student.ambition}</dd></div>
                  </dl>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
