import {content, imageUrl} from "@/lib/sanity";
import type { Metadata } from "next";
import { SchoolDirectory } from "@/components/school-directory";

export const metadata: Metadata = { title: "Schools", description: "Browse participating schools and their growing digital yearbook archives." };

export default async function SchoolsPage() {
  const docs = await content();
  const schools = docs.filter(d => d._type === 'school').map(s => {
    const books = docs.filter(d => d._type === 'yearbook' && d.school?._ref === s._id).sort((a,b) => b.graduationYear-a.graduationYear);
    return {id:s._id,name:s.name,city:s.city,country:s.country,years:books.map(b=>String(b.graduationYear)),latest:books.length ? 'Class of '+books[0].graduationYear : 'Coming soon',image:imageUrl(s.coverImage),href:'/schools/'+s.slug.current,colors:'from-[#701d33] to-[#32101d]'};
  });
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
        <div className="mt-14"><SchoolDirectory schools={schools} /></div>
      </div>
    </main>
  );
}
