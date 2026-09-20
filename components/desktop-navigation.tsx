"use client";

import Link from "next/link";
import {useArchiveNavigationLinks, type ArchiveNavigationLink} from "@/components/archive-navigation-links";

export function DesktopNavigation({links,itemClassName}: {links:readonly ArchiveNavigationLink[];itemClassName:string}) {
  const visibleLinks=useArchiveNavigationLinks(links);

  return <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
    {visibleLinks.map(({label,href})=><Link key={label} href={href} className={itemClassName}>{label}</Link>)}
  </nav>;
}
