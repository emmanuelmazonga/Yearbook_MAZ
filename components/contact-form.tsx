"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) return (
    <div className="grid min-h-[520px] place-items-center bg-[#e7dcc7] p-8 text-center">
      <div className="max-w-md"><CheckCircle2 className="mx-auto size-12 text-[#701d33]" /><p className="eyebrow mt-6 text-[#701d33]">Enquiry noted</p><h2 className="display mt-4 text-4xl">Your school’s story can start here.</h2><p className="mt-5 leading-7 text-black/58">This prototype does not send messages yet, but the complete enquiry flow is ready for a real contact service.</p><button onClick={() => setSent(false)} className="focus-ring mt-7 border-b-2 border-[#701d33] pb-2 font-bold text-[#701d33]">Send another enquiry</button></div>
    </div>
  );

  return (
    <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="grid gap-6 bg-[#fffdf8] p-7 sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">Your name<input required name="name" className="h-13 border border-black/18 bg-transparent px-4 font-normal outline-none focus:border-[#701d33]" placeholder="Full name" /></label>
        <label className="grid gap-2 text-sm font-bold">Phone or email<input required name="contact" className="h-13 border border-black/18 bg-transparent px-4 font-normal outline-none focus:border-[#701d33]" placeholder="+260… or email" /></label>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">School name<input required name="school" className="h-13 border border-black/18 bg-transparent px-4 font-normal outline-none focus:border-[#701d33]" placeholder="Your school" /></label>
        <label className="grid gap-2 text-sm font-bold">Your role<select name="role" className="h-13 border border-black/18 bg-transparent px-4 font-normal outline-none focus:border-[#701d33]"><option>Headteacher / administrator</option><option>Teacher</option><option>PTA representative</option><option>Parent / guardian</option><option>Graduating student</option></select></label>
      </div>
      <label className="grid gap-2 text-sm font-bold">What would you like to create?<textarea required name="message" rows={6} className="border border-black/18 bg-transparent p-4 font-normal outline-none focus:border-[#701d33]" placeholder="Tell us about the graduating class, photography or yearbook you have in mind." /></label>
      <button type="submit" className="focus-ring inline-flex items-center justify-center gap-2 bg-[#701d33] px-6 py-4 font-bold text-white transition hover:bg-[#541426] sm:justify-self-start">Send enquiry <ArrowRight className="size-4" /></button>
    </form>
  );
}
