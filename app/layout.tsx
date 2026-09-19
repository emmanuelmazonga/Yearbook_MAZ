import {content} from "@/lib/sanity";
import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL} from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
 const settings=(await content()).find(d=>d._id==="siteSettings");
 return {
  metadataBase: new URL(SITE_URL),
  title: { default: settings?.siteTitle || SITE_NAME, template: `%s | ${settings?.siteTitle || SITE_NAME}` },
  description: settings?.introduction || DEFAULT_DESCRIPTION,
  alternates: {canonical: "/"},
  applicationName: SITE_NAME,
  authors: [{name: SITE_NAME}],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  formatDetection: {email:false, address:false, telephone:false},
  icons: { icon: [{url:"/favicon.svg",type:"image/svg+xml"},{url:"/icon-192.png",sizes:"192x192",type:"image/png"}], shortcut: "/favicon.svg", apple:"/icon-192.png" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type:"website", locale:"en_ZM", url:"/", siteName:settings?.siteTitle || SITE_NAME,
    title:settings?.siteTitle || SITE_NAME, description:settings?.introduction || DEFAULT_DESCRIPTION,
    images:[{url:"/og.png",width:1200,height:630,alt:"Living Yearbooks — Your school years. Remembered forever."}],
  },
  twitter: {card:"summary_large_image", title:settings?.siteTitle || SITE_NAME, description:settings?.introduction || DEFAULT_DESCRIPTION, images:["/og.png"]},
  robots: {index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1},
 };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
