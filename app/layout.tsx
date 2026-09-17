import {content} from "@/lib/sanity";
import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export async function generateMetadata(): Promise<Metadata> {
 const settings=(await content()).find(d=>d._id==="siteSettings");
 return {
  title: { default: settings?.siteTitle || "Living Yearbooks", template: `%s | ${settings?.siteTitle || "Living Yearbooks"}` },
  description: settings?.introduction,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
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
