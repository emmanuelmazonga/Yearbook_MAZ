import type {Metadata} from 'next';
import Link from 'next/link';
import {PolicyPage} from '@/components/policy-page';
import {pageMetadata} from '@/lib/site';

export const metadata: Metadata=pageMetadata({title:'Terms and Conditions',description:'Terms governing access to Living Yearbooks and the submission and publication of school content.',path:'/terms'});

export default function TermsPage() {
  return <PolicyPage eyebrow="Terms" title="A shared archive needs clear responsibilities." introduction="These terms set expectations for using the Living Yearbooks prototype and for any school that later provides material for publication.">
    <section><h2>1. Prototype status</h2><p>The current website is a demonstration. Sample yearbook profiles and stories are fictional. The Kansenshi preview includes a supplied photograph of its campus but is not an official school archive or a published Kansenshi yearbook. Features, pricing, availability and publication arrangements are not final offers.</p></section>
    <section><h2>2. Acceptable use</h2><p>You may browse and share published pages for ordinary personal, educational and school-community purposes. You may not attempt unauthorized access, interfere with the service, scrape personal information, impersonate another person, or reuse content in a misleading, harmful or unlawful way.</p></section>
    <section><h2>3. School-provided content</h2><p>A school or its authorized representative must ensure that submitted names, photographs, writing, branding and other material are accurate, appropriate and supplied with the permissions needed for publication. Sensitive records should never be submitted as yearbook content.</p></section>
    <section><h2>4. Review and approval</h2><p>Schools should review names, captions, photographs and page content before publication. Living Yearbooks may reject, unpublish or request changes to material that appears unsafe, inaccurate, unauthorized or unsuitable for the platform.</p></section>
    <section><h2>5. Intellectual property</h2><p>Schools and contributors retain rights they already hold in their submitted material. They must grant the permissions needed to edit, optimize, display and preserve that material as part of the agreed yearbook service. The platform design, code and original branding may not be copied or republished without permission.</p></section>
    <section><h2>6. Availability and external links</h2><p>We aim to keep published yearbooks available, but uninterrupted access is not guaranteed. The website may link to school or third-party services; those services control their own content, security and terms.</p></section>
    <section><h2>7. Corrections and takedowns</h2><p>Concerns about a published item should be submitted through the <Link href="/contact">contact page</Link> with enough information to locate it. Requests will be assessed with the relevant school and affected people where appropriate.</p></section>
    <section><h2>8. Changes to these terms</h2><p>These terms may change as the prototype becomes an operational service. The updated date will be shown above. Material commercial or school-specific arrangements should be recorded separately in writing.</p></section>
    <aside>These terms are a practical launch foundation, not a substitute for professional legal advice or a school service agreement.</aside>
  </PolicyPage>;
}
