import { Outfit, Inter, Noto_Sans_Sinhala } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Preloader from "@/components/preloader";
import WhatsAppButton from "@/components/WhatsAppButton";
import MagicCursor from "@/components/MagicCursor";
import CommandMenu from "@/components/CommandMenu";
import OfflineDetector from "@/components/OfflineDetector";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LiveActivity from "@/components/LiveActivity";
import JsonLd from "@/components/JsonLd";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sinhala = Noto_Sans_Sinhala({ subsets: ["sinhala"], variable: "--font-sinhala" });

export const metadata = {
  metadataBase: new URL('https://seranex.org'),
  title: {
    default: "Seranex | Best Web Design & Software in Sri Lanka",
    template: "%s | Seranex Engineering"
  },
  description: "We build high-performance websites, POS systems, and mobile apps. Based in Seeduwa.",
  manifest: '/manifest.json',
  icons: { icon: '/icon' },
  themeColor: '#020617',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }) {
  const fontClasses = `${outfit.variable} ${inter.variable} ${sinhala.variable}`;
  
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${fontClasses} bg-background text-text antialiased flex flex-col min-h-screen overflow-x-hidden cursor-none md:cursor-auto`}>
        <AuthProvider>
          <LanguageProvider>
            <JsonLd />
            <Preloader>
                <MagicCursor />
                <ThemeSwitcher />
                <OfflineDetector />
                <LiveActivity />
                <CommandMenu />
                <Navbar />
                <main className="flex-grow relative z-10">{children}</main>
                <WhatsAppButton />
                <Footer />
            </Preloader>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}