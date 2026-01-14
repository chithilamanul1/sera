import type { Metadata } from "next";
import { Inter, Unbounded, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
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
    src: '../public/fonts/AutoLogo.ttf',
    variable: '--font-autologo',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Seranex Digital | Future-Ready Web Solutions",
    description: "Seranex Digital is a premier web development agency in Sri Lanka, specializing in 3D web experiences, AI integrations, and scalable enterprise solutions.",
    keywords: ["web development", "app development", "digital agency", "seranex", "sri lanka", "3d website"],
    authors: [{ name: "Seranex Digital" }],
    openGraph: {
        title: "Seranex Digital | Future-Ready Web Solutions",
        description: "Building the digital future with 3D, AI, and precision engineering.",
        type: "website",
        images: ['/og-image.jpg'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${unbounded.variable} ${jetbrainsMono.variable} ${autologo.variable}`} suppressHydrationWarning>
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
