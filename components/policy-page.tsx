import type {ReactNode} from 'react';

export function PolicyPage({eyebrow,title,introduction,children}: {eyebrow:string;title:string;introduction:string;children:ReactNode}) {
  return <main className="bg-[#fffdf8]">
    <header className="border-b border-black/10 bg-[#132f31] py-20 text-[#fffaf0] sm:py-28">
      <div className="page-shell max-w-4xl"><p className="eyebrow text-[#f1ca7e]">{eyebrow}</p><h1 className="display mt-5 text-5xl leading-[.95] sm:text-7xl">{title}</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-white/75">{introduction}</p><p className="mt-7 text-sm text-white/55">Effective 19 September 2026 · Last updated 19 September 2026</p></div>
    </header>
    <article className="policy-copy page-shell max-w-4xl py-16 sm:py-24">{children}</article>
  </main>;
}
