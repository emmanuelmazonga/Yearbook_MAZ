import type { Metadata } from "next";
import { SchoolDirectory } from "@/components/school-directory";

export const metadata: Metadata = { title: "Schools", description: "Browse participating schools and their growing digital yearbook archives." };

export default function SchoolsPage() {
  return (
    <main className="section-space min-h-screen">
      <div className="page-shell">
        <div className="grid gap-8 md:grid-cols-[.6fr_1.4fr] md:items-end">
          <p className="eyebrow text-[#701d33]">School archive / Zambia</p>
          <div>
            <h1 className="display text-6xl tracking-[-.05em] sm:text-8xl">Find your school.<br /><em className="font-normal text-[#701d33]">Find your year.</em></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/60">Each school has one home for its graduating classes, photography and shared history.</p>
          </div>
        </div>
        <div className="mt-14"><SchoolDirectory /></div>
      </div>
    </main>
  );
}
