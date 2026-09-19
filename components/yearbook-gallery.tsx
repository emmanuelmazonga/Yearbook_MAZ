"use client";

import { useMemo, useState } from "react";
import { Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type GalleryPhoto = {id:string; title:string; category:string; image?:string; alt:string; caption?:string; position:string; span:string};

export function YearbookGallery({photos}: {photos: GalleryPhoto[]}) {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<(typeof photos)[number] | null>(null);
  const categories = ["All", "Portraits", "Sports", "Clubs", "Events", "Friends", "Behind the scenes"];
  const visible = useMemo(() => photos.filter((photo) => category === "All" || photo.category === category), [photos, category]);

  return (
    <div>
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2" aria-label="Filter gallery">
        {categories.map((option) => <button key={option} onClick={() => setCategory(option)} className={"focus-ring min-w-fit px-4 py-2 text-sm font-bold " + (category === option ? "bg-[#f1ca7e] text-[#171713]" : "border border-white/25 text-white/72 hover:text-white")}>{option}</button>)}
      </div>
      {!visible.length && <p>No published photographs in this category yet.</p>}
      <div className="grid auto-rows-[220px] gap-3 sm:grid-cols-3">
        {visible.map((photo) => (
          <button key={photo.id} onClick={() => setActive(photo)} className={"focus-ring group relative overflow-hidden bg-black text-left " + photo.span}>
            <img src={photo.image} alt={photo.alt} loading="lazy" decoding="async" className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100" style={{ objectPosition: photo.position }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white"><div><p className="text-xs font-bold uppercase tracking-[.17em] text-[#f1ca7e]">{photo.category}</p><p className="display mt-1 text-2xl">{photo.title}</p></div><Maximize2 className="size-5 opacity-70" /></div>
          </button>
        ))}
      </div>
      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-6xl border-0 bg-[#101c1d] p-3 text-white">
          <DialogTitle className="sr-only">{active?.title ?? "Yearbook photograph"}</DialogTitle>
          <DialogDescription className="sr-only">{active?.category ?? "Photo gallery"}</DialogDescription>
          {active && <><img src={active.image} alt={active.alt} decoding="async" className="max-h-[78vh] w-full object-contain" /><div className="px-3 pb-3"><p className="eyebrow text-[#f1ca7e]">{active.category}</p><p className="display mt-2 text-3xl">{active.title}</p>{active.caption && <p className="mt-2">{active.caption}</p>}</div></>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
