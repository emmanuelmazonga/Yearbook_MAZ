import type {CSSProperties, ReactNode} from 'react';
import {notFound} from 'next/navigation';
import {SchoolFooter} from '@/components/school-footer';
import {SchoolHeader} from '@/components/school-header';
import {content} from '@/lib/sanity';
import {schoolTheme} from '@/lib/school-theme';

export default async function SchoolLayout({children,params}: {children: ReactNode; params: Promise<{slug:string}>}) {
  const {slug}=await params;
  const docs=await content();
  const school=docs.find(d=>d._type==='school' && d.slug?.current===slug);
  if(!school) notFound();
  const latestBook=docs.filter(d=>d._type==='yearbook' && d.school?._ref===school._id).sort((a,b)=>b.graduationYear-a.graduationYear)[0];
  const theme=schoolTheme(school);
  const variables={
    '--school-primary':theme.primary,
    '--school-primary-ink':theme.primaryInk,
    '--school-secondary':theme.secondary,
    '--school-secondary-ink':theme.secondaryInk,
    '--school-accent':theme.accent,
    '--school-accent-ink':theme.accentInk,
    '--school-accent-on-primary':theme.accentOnPrimary,
    '--school-primary-on-secondary':theme.primaryOnSecondary,
  } as CSSProperties;
  return <div className="school-shell" style={variables}>
    <SchoolHeader school={school} latestBook={latestBook}/>
    {children}
    <SchoolFooter school={school} latestBook={latestBook}/>
  </div>;
}
