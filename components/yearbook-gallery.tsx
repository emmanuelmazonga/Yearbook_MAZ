"use client";

import { useMemo, useState } from "react";
import { Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const photos = [
  { title: "The final bell", category: "Friends", image: "/images/hero-class-2026.webp", position: "center", span: "sm:col-span-2 sm:row-span-2" },
  { title: "Cultural Day rhythm", category: "Events", image: "/images/cultural-day.webp", position: "center", span: "sm:row-span-2" },
  { title: "Portrait afternoon", category: "Portraits", image: "/images/students-camera-football.webp", position: "36% center", span: "" },
  { title: "Club friends", category: "Clubs", image: "/images/students-camera-football.webp", position: "80% center", span: "" },
  { title: "Our loudest afternoon", category: "Sports", image: "/images/hero-class-2026.webp", position: "78% center", span: "sm:col-span-2" },
  { title: "Behind the lens", category: "Behind the scenes", image: "/images/students-camera-football.webp", position: "10% center", span: "" },
];

export function YearbookGallery() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<(typeof photos)[number] | null>(null);
  const categories = ["All", "Portraits", "Sports", "Clubs", "Events", "Friends", "Behind the scenes"];
  const visible = useMemo(() => photos.filter((photo) => category === "All" || photo.category === category), [category]);

  return (
    <div>
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2" aria-label="Filter gallery">
        {categories.map((option) => <button key={option} onClick={() => setCategory(option)} className={"focus-ring min-w-fit px-4 py-2 text-sm font-bold " + (category === option ? "bg-[#f1ca7e] text-[#171713]" : "border border-white/25 text-white/72 hover:text-white")}>{option}</button>)}
      </div>
      <div className="grid auto-rows-[220px] gap-3 sm:grid-cols-3">
        {visible.map((photo) => (
          <button key={photo.title} onClick={() => setActive(photo)} className={"focus-ring group relative overflow-hidden bg-black text-left " + photo.span}>
            <img src={photo.image} alt="" className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100" style={{ objectPosition: photo.position }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white"><div><p className="text-xs font-bold uppercase tracking-[.17em] text-[#f1ca7e]">{photo.category}</p><p className="display mt-1 text-2xl">{photo.title}</p></div><Maximize2 className="size-5 opacity-70" /></div>
          </button>
        ))}
      </div>
      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-6xl border-0 bg-[#101c1d] p-3 text-white">
          <DialogTitle className="sr-only">{active?.title ?? "Yearbook photograph"}</DialogTitle>
          <DialogDescription className="sr-only">{active?.category ?? "Photo gallery"}</DialogDescription>
          {active && <><img src={active.image} alt={active.title} className="max-h-[78vh] w-full object-contain" /><div className="px-3 pb-3"><p className="eyebrow text-[#f1ca7e]">{active.category}</p><p className="display mt-2 text-3xl">{active.title}</p></div></>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
