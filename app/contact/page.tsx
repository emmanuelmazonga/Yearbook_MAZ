import {content} from "@/lib/sanity";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import {pageMetadata} from "@/lib/site";

export const metadata: Metadata = pageMetadata({title:"Start a Yearbook",description:"Tell us about your school, graduating class or photography needs in Zambia.",path:"/contact"});

export default async function ContactPage() {
 const settings=(await content()).find(d=>d._id==="siteSettings");
  return (
    <main className="section-space bg-[#132f31]">
      <div className="page-shell grid overflow-hidden lg:grid-cols-[.8fr_1.2fr]">
        <div className="flex flex-col justify-between bg-[#701d33] p-8 text-white sm:p-12">
          <div><p className="eyebrow text-[#f1ca7e]">Start a conversation</p><h1 className="display mt-5 text-5xl leading-[.95] sm:text-7xl">Let’s make your school’s next chapter visible.</h1><p className="mt-7 max-w-md text-lg leading-8 text-white/68">Tell us about your school, graduating class and what you want families to remember.</p></div>
          <div className="mt-16 border-t border-white/20 pt-7 text-sm leading-7 text-white/62"><p>Photography · Digital yearbooks · Print editions</p><p>Kitwe and the wider Copperbelt, Zambia</p>{settings?.contactEmail && <p><a href={"mailto:"+settings.contactEmail}>{settings.contactEmail}</a></p>}{settings?.contactPhone && <p>{settings.contactPhone}</p>}</div>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
