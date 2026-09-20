import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowLeftIcon as ArrowLeft, BooksIcon as LibraryBig} from '@phosphor-icons/react/ssr';

export const metadata: Metadata={title:'Page not found',robots:{index:false,follow:false}};

export default function NotFound() {
  return <main className="grid min-h-[70svh] place-items-center bg-[#132f31] px-5 py-20 text-[#fffaf0]">
    <div className="max-w-2xl text-center"><LibraryBig className="mx-auto size-10 text-[#f1ca7e]"/><p className="eyebrow mt-8 text-[#f1ca7e]">404 · Missing page</p><h1 className="display mt-5 text-5xl leading-tight sm:text-7xl">This page did not make the archive.</h1><p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/70">The address may have changed, or this yearbook has not been published.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Link href="/schools" className="focus-ring bg-[#f6f1e7] px-6 py-4 font-bold text-[#171713]">Browse schools</Link><Link href="/" className="focus-ring inline-flex items-center gap-2 border border-white/30 px-6 py-4 font-bold"><ArrowLeft className="size-4"/> Return home</Link></div></div>
  </main>;
}
