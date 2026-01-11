import type { Metadata } from "next";
import { Inter, Unbounded, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import FloatingWhatsApp from "@/components/shared/FloatingWhatsApp";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import CookieConsent from "@/components/shared/CookieConsent";
import { ThemeProvider } from "@/components/ThemeProvider";

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

export const metadata: Metadata = {
    title: "Seranex - Ready to Grow?",
    description: "Next-generation digital agency specializing in web development, app development, and digital solutions.",
    keywords: ["web development", "app development", "digital agency", "seranex"],
    authors: [{ name: "Seranex" }],
    icons: {
        icon: '/logos/zx-black.png',
        apple: '/logos/zx-black.png',
    },
    openGraph: {
        title: "Seranex - Ready to Grow?",
        description: "Next-generation digital agency",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${unbounded.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
            <body>
                <ThemeProvider>
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
                </ThemeProvider>
            </body>
        </html>
    );
}
