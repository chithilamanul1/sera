import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Syne } from "next/font/google";
import "./globals.css";

import { CurrencyProvider } from "@/context/CurrencyContext";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { SITE_METADATA } from "@/lib/seo";
import { ThemeProvider } from "@/components/theme-provider";
import dynamic from 'next/dynamic';

const FloatingLines = dynamic(() => import('@/components/ui/FloatingLines').then(mod => mod.FloatingLines), { ssr: false });
const SeraGlobalChat = dynamic(() => import('@/components/sidebar/SeraGlobalChat').then(mod => mod.SeraGlobalChat), { ssr: false });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-clash-variable",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${SITE_METADATA.title.split("|")[0].trim()}`,
  },
  description: SITE_METADATA.description,
  keywords: SITE_METADATA.keywords,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_METADATA.siteUrl,
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    siteName: "Seranex",
    images: [
      {
        url: SITE_METADATA.ogImage,
        width: 1200,
        height: 630,
        alt: "Seranex - Premium Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    creator: SITE_METADATA.twitterHandle,
    images: [SITE_METADATA.ogImage],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${syne.variable} font-sans antialiased relative`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            <CurrencyProvider>
              <FloatingLines
                linesGradient={["#000000", "#808080", "#f3f0ff"]}
                animationSpeed={1}
                interactive
                bendRadius={5}
                bendStrength={-0.5}
                mouseDamping={0.05}
                parallax
                parallaxStrength={0.45}
              />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Seranex",
                    "legalName": "Seranex Lanka Business Solutions",
                    "url": SITE_METADATA.siteUrl,
                    "logo": `${SITE_METADATA.siteUrl}/favicon.svg`,
                    "description": SITE_METADATA.description,
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Seeduwa",
                      "addressCountry": "LK"
                    },
                    "contactPoint": {
                      "@type": "ContactPoint",
                      "email": "info@seranex.org",
                      "contactType": "customer service"
                    },
                    "sameAs": [
                      "https://twitter.com/seranex_ai"
                    ]
                  })
                }}
              />
              <div id="announcement" className="sr-only" aria-live="polite"></div>
              {children}
              <SeraGlobalChat />
            </CurrencyProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
