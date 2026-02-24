import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Syne } from "next/font/google";
import "./globals.css";

import { CurrencyProvider } from "@/context/CurrencyContext";
import { AuthProvider } from "@/components/providers/AuthProvider";
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { SITE_METADATA } from "@/lib/seo";
import { ThemeProvider } from "@/components/theme-provider";
import { ClientSideWrapper } from "@/components/ClientSideWrapper";

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
  metadataBase: new URL(SITE_METADATA.siteUrl),
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
    icon: [
      { url: "/icon.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "96x96", type: "image/png" },
      { url: "/icon.png", sizes: "144x144", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preload" href="/hero-poster.png" as="image" type="image/png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${syne.variable} font-sans antialiased relative`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            <CurrencyProvider>
              <ClientSideWrapper>
                {/* WebSite Schema for Brand Name in Search & Sitelinks Searchbox */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "WebSite",
                      "name": "Seranex",
                      "url": SITE_METADATA.siteUrl,
                      "potentialAction": {
                        "@type": "SearchAction",
                        "target": `${SITE_METADATA.siteUrl}/search?q={search_term_string}`,
                        "query-input": "required name=search_term_string"
                      }
                    })
                  }}
                />

                {/* SiteNavigationElement Schema for Sitelinks Discovery */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "ItemList",
                      "itemListElement": [
                        {
                          "@type": "SiteNavigationElement",
                          "position": 1,
                          "name": "About",
                          "url": `${SITE_METADATA.siteUrl}/about`
                        },
                        {
                          "@type": "SiteNavigationElement",
                          "position": 2,
                          "name": "Services",
                          "url": `${SITE_METADATA.siteUrl}/services`
                        },
                        {
                          "@type": "SiteNavigationElement",
                          "position": 3,
                          "name": "Portfolio",
                          "url": `${SITE_METADATA.siteUrl}/portfolio`
                        },
                        {
                          "@type": "SiteNavigationElement",
                          "position": 4,
                          "name": "Contact",
                          "url": `${SITE_METADATA.siteUrl}/contact`
                        }
                      ]
                    })
                  }}
                />

                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": ["Organization", "ProfessionalService"],
                      "name": "Seranex",
                      "legalName": "Seranex Lanka Business Solutions",
                      "alternateName": ["Seranex Software Studio", "Seranex AI"],
                      "url": SITE_METADATA.siteUrl,
                      "logo": `${SITE_METADATA.siteUrl}/icon.png`,
                      "image": `${SITE_METADATA.siteUrl}/og-image.png`,
                      "description": "Premium software studio specializing in AI engineering, custom web development, and enterprise SaaS solutions. Seranex focuses on architecting scalable digital infrastructure for global businesses.",
                      "knowsAbout": [
                        "Artificial Intelligence",
                        "Software Engineering",
                        "Web Development",
                        "SaaS Development",
                        "LLM Integration",
                        "Enterprise Software Architecture"
                      ],
                      "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": "Software Development Services",
                        "itemListElement": [
                          {
                            "@type": "Offer",
                            "itemOffered": {
                              "@type": "Service",
                              "name": "AI Solutions & LLM Integration"
                            }
                          },
                          {
                            "@type": "Offer",
                            "itemOffered": {
                              "@type": "Service",
                              "name": "Enterprise Web Applications"
                            }
                          },
                          {
                            "@type": "Offer",
                            "itemOffered": {
                              "@type": "Service",
                              "name": "Custom Software Architecture"
                            }
                          }
                        ]
                      },
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
                        "https://twitter.com/seranex_ai",
                        "https://github.com/Seranex-Lanka"
                      ]
                    })
                  }}
                />
                <div id="announcement" className="sr-only" aria-live="polite"></div>
                {children}
              </ClientSideWrapper>
            </CurrencyProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
