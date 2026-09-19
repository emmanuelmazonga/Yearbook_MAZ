"use client";

import {useRef,useState} from "react";
import Link from "next/link";
import {Menu,X} from "lucide-react";

type MobileLink={label:string;href:string};

export function MobileNavigation({links,summaryClassName,panelClassName,itemClassName,ctaClassName}:{
  links:readonly MobileLink[];
  summaryClassName:string;
  panelClassName:string;
  itemClassName:string;
  ctaClassName:string;
}) {
  const details=useRef<HTMLDetailsElement>(null);
  const [open,setOpen]=useState(false);
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
        {links.map(({label,href})=><Link key={label} href={href} onClick={close} className={itemClassName}>{label}</Link>)}
        <Link href="/contact" onClick={close} className={ctaClassName}>Start your yearbook</Link>
      </nav>
    </div>
  </details>;
}
