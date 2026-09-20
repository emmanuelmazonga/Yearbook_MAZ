"use client";

import {useRef,useState} from "react";
import Link from "next/link";
import {ListIcon as Menu,XIcon as X} from "@phosphor-icons/react/ssr";
import {useArchiveNavigationLinks, type ArchiveNavigationLink} from "@/components/archive-navigation-links";

export function MobileNavigation({links,summaryClassName,panelClassName,itemClassName,ctaClassName}:{
  links:readonly ArchiveNavigationLink[];
  summaryClassName:string;
  panelClassName:string;
  itemClassName:string;
  ctaClassName:string;
}) {
  const details=useRef<HTMLDetailsElement>(null);
  const [open,setOpen]=useState(false);
  const visibleLinks=useArchiveNavigationLinks(links);
  const close=()=>{
    if(details.current) details.current.open=false;
    setOpen(false);
  };

  return <details ref={details} onToggle={event=>setOpen(event.currentTarget.open)} className="group relative lg:hidden">
    <summary className={summaryClassName} aria-label={open ? "Close navigation" : "Open navigation"}>
      {open ? <X className="size-5"/> : <Menu className="size-5"/>}
    </summary>
    <div className={panelClassName}>
      <nav className="grid" aria-label="Mobile navigation">
        {visibleLinks.map(({label,href})=><Link key={label} href={href} onClick={close} className={itemClassName}>{label}</Link>)}
        <Link href="/contact" onClick={close} className={ctaClassName}>Start your yearbook</Link>
      </nav>
    </div>
  </details>;
}
