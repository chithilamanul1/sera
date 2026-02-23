import PageClient from "@/components/PageClient";
import { PAGE_SEO, SITE_METADATA } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: PAGE_SEO.home.title,
  description: PAGE_SEO.home.description,
  openGraph: {
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    images: [{ url: PAGE_SEO.home.image, width: 1200, height: 630, alt: "Seranex Logo" }],
  },
  twitter: {
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    images: [PAGE_SEO.home.image],
  }
};

export default function Home() {
  return <PageClient />;
}
