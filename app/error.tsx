"use client";
export default function ContentError({reset}: {reset: () => void}) {
  return <main className="page-shell section-space"><h1 className="display text-5xl">We couldn’t load the yearbook.</h1><p className="my-6">Please try again in a moment.</p><button className="focus-ring bg-[#701d33] px-6 py-3 text-white" onClick={reset}>Try again</button></main>;
}
