import { Outfit, Inter, Noto_Sans_Sinhala } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Preloader from "@/components/preloader";
import WhatsAppButton from "@/components/WhatsAppButton";
import MagicCursor from "@/components/MagicCursor";
import CommandMenu from "@/components/CommandMenu";
import ScrollProgress from "@/components/ScrollProgress";
import OfflineDetector from "@/components/OfflineDetector";
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
  description: "We build high-performance websites, POS systems, and mobile apps. Based in Seeduwa, serving Colombo and global clients.",
  manifest: '/manifest.json',
  icons: { icon: '/icon' }, // Uses the generated icon.js
  themeColor: '#020617',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${inter.variable} ${sinhala.variable} bg-background text-text antialiased flex flex-col min-h-screen overflow-x-hidden cursor-none md:cursor-auto`}>
        <AuthProvider>
          <LanguageProvider>
            <JsonLd />
            <Preloader>
                {/* Note: SonicManager and ParticleBackground removed to fix build error */}
                <MagicCursor />
                <ScrollProgress />
                <OfflineDetector />
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