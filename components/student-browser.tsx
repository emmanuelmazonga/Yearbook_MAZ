"use client";

import { useMemo, useState } from "react";
import { Camera, ChevronRight, Trophy } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const students = [
  { name: "Chanda Mwansa", nickname: "Chan", quote: "Some of the best memories happened when we were supposed to be studying.", activity: "Photography Club", memory: "Inter-school sports day, especially the final relay.", ambition: "Software Engineer", group: "12A", position: "0%" },
  { name: "Mutinta Chileshe", nickname: "Tinta", quote: "Start before you feel ready.", activity: "Debate Society", memory: "Our first debate win in Ndola.", ambition: "Human Rights Lawyer", group: "12A", position: "34%" },
  { name: "Bwalya Musonda", nickname: "B", quote: "The team made every difficult day lighter.", activity: "Football Team", memory: "Scoring in the Copperbelt schools final.", ambition: "Civil Engineer", group: "12B", position: "67%" },
  { name: "Thandiwe Phiri", nickname: "Tee", quote: "Make room for joy in the timetable.", activity: "JETS Club", memory: "Building our solar dryer for the science fair.", ambition: "Renewable Energy Engineer", group: "12B", position: "100%" },
];

export function StudentBrowser() {
  const [group, setGroup] = useState("All");
  const [sort, setSort] = useState<"first" | "surname">("first");
  const visible = useMemo(() => students
    .filter((student) => group === "All" || student.group === group)
    .sort((a, b) => {
      const aValue = sort === "first" ? a.name : a.name.split(" ").at(-1) ?? a.name;
      const bValue = sort === "first" ? b.name : b.name.split(" ").at(-1) ?? b.name;
      return aValue.localeCompare(bValue);
    }), [group, sort]);

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-y border-black/14 py-4">
        <div className="flex gap-2" aria-label="Filter students by class">
          {["All", "12A", "12B"].map((option) => <button key={option} onClick={() => setGroup(option)} className={"focus-ring px-4 py-2 text-sm font-bold " + (group === option ? "bg-[#701d33] text-white" : "border border-black/15")}>{option === "All" ? "All students" : option}</button>)}
        </div>
        <button onClick={() => setSort(sort === "first" ? "surname" : "first")} className="focus-ring text-sm font-bold text-[#701d33]">Sort by {sort === "first" ? "surname" : "first name"}</button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((student) => (
          <Dialog key={student.name}>
            <DialogTrigger asChild>
              <button className="focus-ring group overflow-hidden bg-[#fffdf8] text-left shadow-[0_12px_38px_rgba(35,26,17,.09)]">
                <div className="aspect-[4/5] overflow-hidden bg-[#173f42]">
                  <div className="h-full w-full bg-[url('/images/students-camera-football.webp')] bg-cover bg-no-repeat transition duration-700 group-hover:scale-105" style={{ backgroundSize: "420% 100%", backgroundPosition: student.position + " center" }} />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-[#ba6f32]">{student.group} · {student.activity}</p>
                  <h3 className="display mt-2 text-2xl">{student.name}</h3>
                  <p className="mt-3 line-clamp-2 text-sm italic leading-6 text-black/55">“{student.quote}”</p>
                  <span className="mt-5 flex items-center gap-2 text-sm font-bold text-[#701d33]">Read profile <ChevronRight className="size-4 transition group-hover:translate-x-1" /></span>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto border-0 bg-[#f6f1e7] p-0">
              <div className="grid md:grid-cols-[.82fr_1.18fr]">
                <div className="min-h-[380px] bg-[url('/images/students-camera-football.webp')] bg-cover bg-no-repeat" style={{ backgroundSize: "420% 100%", backgroundPosition: student.position + " center" }} />
                <div className="p-7 sm:p-10">
                  <DialogHeader>
                    <p className="eyebrow text-[#ba6f32]">{student.group} · Class of 2026</p>
                    <DialogTitle className="display mt-2 text-4xl sm:text-5xl">{student.name}</DialogTitle>
                    <DialogDescription className="text-base text-black/48">“{student.nickname}” to the people who know them best.</DialogDescription>
                  </DialogHeader>
                  <blockquote className="display mt-8 border-l-4 border-[#701d33] pl-5 text-2xl leading-snug">“{student.quote}”</blockquote>
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
