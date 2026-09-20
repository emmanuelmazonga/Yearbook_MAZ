import {content, imageUrl} from "@/lib/sanity";
import {schoolTheme} from "@/lib/school-theme";
import type { Metadata } from "next";
import { SchoolDirectory } from "@/components/school-directory";
import {pageMetadata} from "@/lib/site";
import {schoolCover, isKansenshiPreview} from "@/lib/school-cover";

export const metadata: Metadata = pageMetadata({title:"School Archives",description:"Explore sample school archives in this Zambian yearbook demo.",path:"/schools"});

export default async function SchoolsPage() {
  const docs = await content();
  const schools = docs.filter(d => d._type === 'school').map(s => {
    const books = docs.filter(d => d._type === 'yearbook' && d.school?._ref === s._id).sort((a,b) => b.graduationYear-a.graduationYear);
    const theme=schoolTheme(s);
    const cover=schoolCover(s);
    return {id:s._id,name:s.name,city:s.city,country:s.country,years:books.map(b=>String(b.graduationYear)),latest:books.length ? 'Class of '+books[0].graduationYear : 'No yearbook yet',image:cover.src,imageAlt:cover.alt,localImage:cover.local,demoLabel:isKansenshiPreview(s) ? 'Campus photo · demo preview' : 'Fictional demo school',logo:imageUrl(s.logo,160),href:'/schools/'+s.slug.current,primary:theme.primary,primaryInk:theme.primaryInk,accent:theme.accent};
  });
  return (
    <main className="section-space min-h-screen">
      <div className="page-shell">
        <div className="grid gap-8 md:grid-cols-[.6fr_1.4fr] md:items-end">
          <p className="eyebrow text-[#701d33]">School archive / Zambia</p>
          <div>
            <h1 className="display text-6xl tracking-[-.05em] sm:text-8xl">Find your school.<br /><em className="font-normal text-[#701d33]">Find your year.</em></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/60">Explore sample archives. Kansenshi uses a supplied campus photograph; its page is a demonstration, not an official school archive.</p>
          </div>
        </div>
        <div className="mt-14"><SchoolDirectory schools={schools} /></div>
      </div>
    </main>
  );
}
