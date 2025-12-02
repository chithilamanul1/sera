import { Outfit, Inter, Noto_Sans_Sinhala } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Preloader from "@/components/preloader";
import WhatsAppButton from "@/components/WhatsAppButton";
import MagicCursor from "@/components/MagicCursor";
import CommandMenu from "@/components/CommandMenu";
import ScrollProgress from "@/components/ScrollProgress";
import ParticleBackground from "@/components/ParticleBackground";
import SonicManager from "@/components/SonicManager";
import VoiceControl from "@/components/VoiceControl";
import ThemeSwitcher from "@/components/ThemeSwitcher"; // <--- NEW IMPORT
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sinhala = Noto_Sans_Sinhala({ subsets: ["sinhala"], variable: "--font-sinhala" });

export const metadata = {
  title: "Seranex | Websites & Software",
  description: "Elite digital engineering in Sri Lanka.",
  manifest: '/manifest.json',
  icons: { icon: 'https://i.ibb.co/s9XYwhc0/New-Project-3.png' },
  themeColor: '#020617',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${inter.variable} ${sinhala.variable} bg-background text-text antialiased flex flex-col min-h-screen overflow-x-hidden cursor-none md:cursor-auto`}>
        <AuthProvider>
          <LanguageProvider>
            <Preloader>
                <SonicManager />
                <ThemeSwitcher /> {/* <--- INJECTED HERE */}
                <ParticleBackground />
                <MagicCursor />
                <ScrollProgress />
                <CommandMenu />
                <Navbar />
                <main className="flex-grow relative z-10">{children}</main>
                <WhatsAppButton />
                <VoiceControl />
                <Footer />
            </Preloader>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}