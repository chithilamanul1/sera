import type { Metadata } from "next";
import { Inter, Unbounded, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import FloatingWhatsApp from "@/components/shared/FloatingWhatsApp";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import CookieConsent from "@/components/shared/CookieConsent";
import { ThemeProvider } from "@/components/ThemeProvider";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
});

const unbounded = Unbounded({
    subsets: ["latin"],
    variable: '--font-unbounded',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: '--font-jetbrains',
});

const autologo = localFont({
    src: '../public/fonts/Autologo.otf',
    variable: '--font-autologo',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Seranex - Professional Web Design & Development Company Sri Lanka | Colombo",
    description: "Leading web design and development company in Sri Lanka. Custom websites, mobile apps, e-commerce solutions starting from LKR 5,000. Expert UI/UX design, SEO-optimized websites, responsive design in Colombo.",
    keywords: ["web design sri lanka", "web development sri lanka", "web design colombo", "web development colombo", "custom website development sri lanka", "UI/UX design sri lanka", "mobile app development sri lanka", "e-commerce development sri lanka", "responsive web design sri lanka", "seo-optimized websites sri lanka", "affordable web design sri lanka", "small business websites sri lanka", "react development sri lanka", "next.js development sri lanka", "best web design company sri lanka", "digital agency colombo", "seranex"],
    authors: [{ name: "Seranex" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://seranex.org",
        siteName: "Seranex",
        title: "Seranex - Premium Web & Mobile Development | Sri Lanka",
        description: "Transform your digital presence with cutting-edge web and mobile solutions. Starting from LKR 15,000.",
        images: [
            {
                url: "https://seranex.org/logos/hero-logo.png",
                width: 1200,
                height: 630,
                alt: "Seranex - Web Development",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Seranex - Premium Web & Mobile Development",
        description: "Transform your digital presence with cutting-edge solutions.",
        images: ["https://seranex.org/logos/hero-logo.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

    return (
        <html lang="en" className={`${inter.variable} ${unbounded.variable} ${jetbrainsMono.variable} ${autologo.variable}`} suppressHydrationWarning>
            <head>
                {/* Facebook Pixel */}
                {FB_PIXEL_ID && (
                    <>
                        <Script id="fb-pixel" strategy="afterInteractive">
                            {`
                            !function(f,b,e,v,n,t,s)
                            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)}(window, document,'script',
                            'https://connect.facebook.net/en_US/fbevents.js');
                            fbq('init', '${FB_PIXEL_ID}');
                            fbq('track', 'PageView');
                            `}
                        </Script>
                        <noscript>
                            <img
                                height="1"
                                width="1"
                                style={{ display: 'none' }}
                                src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                            />
                        </noscript>
                    </>
                )}
                {/* MANUAL CSS OVERRIDE: Force load locally generated CSS */}
                <link rel="stylesheet" href="/globals.css" />
            </head>
            <body className="bg-void text-silver antialiased selection:bg-glow-silver/30 selection:text-white">
                <ThemeProvider>
                    <ErrorBoundary>
                        <AuthProvider>
                            {children}
                            <CookieConsent />
                            <Toaster
                                position="top-right"
                                toastOptions={{
                                    style: {
                                        background: '#121212',
                                        color: '#EAEAEA',
                                        border: '1px solid rgba(229, 228, 226, 0.1)',
                                    },
                                    success: {
                                        iconTheme: {
                                            primary: '#00FF41',
                                            secondary: '#121212',
                                        },
                                    },
                                    error: {
                                        iconTheme: {
                                            primary: '#FF0040',
                                            secondary: '#121212',
                                        },
                                    },
                                }}
                            />
                        </AuthProvider>
                    </ErrorBoundary>
                </ThemeProvider>
            </body>
        </html>
    );
}
