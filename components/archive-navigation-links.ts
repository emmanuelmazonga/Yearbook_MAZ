"use client";

import {useParams} from "next/navigation";

export type ArchiveNavigationLink = {label:string; href:string};

export function useArchiveNavigationLinks(links: readonly ArchiveNavigationLink[]) {
  const params=useParams();
  return typeof params.slug === "string" ? links.filter(({label})=>label!=="Schools") : links;
}
