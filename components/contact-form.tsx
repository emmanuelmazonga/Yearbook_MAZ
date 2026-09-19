"use client";

import {useState} from "react";
import Link from "next/link";
import {ArrowRight,CheckCircle2,LoaderCircle} from "lucide-react";

type FieldErrors=Record<string,string>;
type ApiResponse={ok:boolean;message?:string;reference?:string;fields?:FieldErrors};

const inputClass="h-13 border border-black/20 bg-transparent px-4 font-normal outline-none transition focus:border-[#701d33] focus:ring-2 focus:ring-[#701d33]/20 aria-[invalid=true]:border-[#b42318]";

export function ContactForm() {
  const [status,setStatus]=useState<'idle'|'submitting'|'sent'>('idle');
  const [message,setMessage]=useState('');
  const [reference,setReference]=useState('');
  const [errors,setErrors]=useState<FieldErrors>({});

  async function submit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(status==='submitting') return;
    setStatus('submitting'); setMessage(''); setErrors({});
    const form=event.currentTarget;
    const data=new FormData(form);
    const body={
      name:String(data.get('name') || ''), email:String(data.get('email') || ''),
      phone:String(data.get('phone') || ''), school:String(data.get('school') || ''),
      role:String(data.get('role') || ''), message:String(data.get('message') || ''),
      consent:data.get('consent')==='on', website:String(data.get('website') || ''),
    };
    const controller=new AbortController();
    const timeout=window.setTimeout(()=>controller.abort(),15_000);
    try {
      const response=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:controller.signal});
      const result=await response.json().catch(()=>({ok:false,message:'We could not send your enquiry right now. Please try again.'})) as ApiResponse;
      if(!response.ok || !result.ok) {
        setErrors(result.fields || {}); setMessage(result.message || 'We could not send your enquiry right now. Please try again.'); setStatus('idle'); return;
      }
      setReference(result.reference || ''); setStatus('sent'); form.reset();
    } catch(error) {
      setMessage(error instanceof DOMException && error.name==='AbortError' ? 'The request took too long. Please check your connection and try again.' : 'We could not connect right now. Please try again.');
      setStatus('idle');
    } finally { window.clearTimeout(timeout); }
  }

  if(status==='sent') return <div className="grid min-h-[620px] place-items-center bg-[#e7dcc7] p-8 text-center">
    <div className="max-w-md"><CheckCircle2 className="mx-auto size-12 text-[#701d33]"/><p className="eyebrow mt-6 text-[#701d33]">Enquiry sent</p><h2 className="display mt-4 text-4xl">Your school’s story can start here.</h2><p className="mt-5 leading-7 text-black/70">Thanks — your enquiry has been delivered. We’ll use the details you provided only to respond.</p>{reference && <p className="mt-4 text-sm text-black/60">Reference: {reference}</p>}<button onClick={()=>{setStatus('idle');setReference('');}} className="focus-ring mt-7 border-b-2 border-[#701d33] pb-2 font-bold text-[#701d33]">Send another enquiry</button></div>
  </div>;

  const invalid=(field:string)=>Boolean(errors[field]);
  return <form onSubmit={submit} noValidate className="relative grid gap-6 bg-[#fffdf8] p-7 sm:p-10">
    <div className="grid gap-6 sm:grid-cols-2">
      <Field label="Your name" name="name" error={errors.name}><input required maxLength={100} name="name" autoComplete="name" aria-invalid={invalid('name')} aria-describedby={invalid('name')?'name-error':undefined} className={inputClass} placeholder="Full name"/></Field>
      <Field label="Email address" name="email" error={errors.email}><input required maxLength={254} type="email" name="email" autoComplete="email" aria-invalid={invalid('email')} aria-describedby={invalid('email')?'email-error':undefined} className={inputClass} placeholder="name@example.com"/></Field>
    </div>
    <div className="grid gap-6 sm:grid-cols-2">
      <Field label="Phone number (optional)" name="phone" error={errors.phone}><input maxLength={30} type="tel" name="phone" autoComplete="tel" aria-invalid={invalid('phone')} aria-describedby={invalid('phone')?'phone-error':undefined} className={inputClass} placeholder="+260…"/></Field>
      <Field label="School name" name="school" error={errors.school}><input required maxLength={150} name="school" autoComplete="organization" aria-invalid={invalid('school')} aria-describedby={invalid('school')?'school-error':undefined} className={inputClass} placeholder="Your school"/></Field>
    </div>
    <Field label="Your role" name="role" error={errors.role}><select required name="role" defaultValue="" aria-invalid={invalid('role')} aria-describedby={invalid('role')?'role-error':undefined} className={inputClass}><option value="" disabled>Select your role</option><option>Headteacher / administrator</option><option>Teacher</option><option>PTA representative</option><option>Parent / guardian</option><option>Graduating student</option><option>Other</option></select></Field>
    <Field label="What would you like to create?" name="message" error={errors.message}><textarea required minLength={20} maxLength={2000} name="message" rows={6} aria-invalid={invalid('message')} aria-describedby={invalid('message')?'message-error':undefined} className="border border-black/20 bg-transparent p-4 font-normal outline-none transition focus:border-[#701d33] focus:ring-2 focus:ring-[#701d33]/20 aria-[invalid=true]:border-[#b42318]" placeholder="Tell us about the graduating class, photography or yearbook you have in mind."/></Field>
    <div className="absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <div>
      <label className="flex items-start gap-3 text-sm leading-6"><input required type="checkbox" name="consent" aria-invalid={invalid('consent')} aria-describedby={invalid('consent')?'consent-error':undefined} className="mt-1 size-4 shrink-0 accent-[#701d33]"/><span>I agree that Yearbook_MAZ may use the information I provide to respond to this enquiry. Read the <Link href="/privacy" className="font-bold text-[#701d33] underline underline-offset-4">privacy notice</Link>.</span></label>
      {errors.consent && <p id="consent-error" className="mt-2 text-sm font-semibold text-[#b42318]">{errors.consent}</p>}
    </div>
    <div aria-live="polite">{message && <p className="border-l-4 border-[#b42318] bg-[#fbe9e7] p-4 text-sm font-semibold text-[#781b14]">{message}</p>}</div>
    <button disabled={status==='submitting'} type="submit" className="focus-ring inline-flex min-h-13 items-center justify-center gap-2 bg-[#701d33] px-6 py-4 font-bold text-white transition hover:bg-[#541426] disabled:cursor-wait disabled:opacity-65 sm:justify-self-start">{status==='submitting' ? <><LoaderCircle className="size-4 animate-spin"/> Sending…</> : <>Send enquiry <ArrowRight className="size-4"/></>}</button>
  </form>;
}

function Field({label,name,error,children}:{label:string;name:string;error?:string;children:React.ReactNode}) {
  return <label className="grid gap-2 text-sm font-bold">{label}{children}{error && <span id={`${name}-error`} className="font-semibold text-[#b42318]">{error}</span>}</label>;
}
