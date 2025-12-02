import { Outfit, Inter, Noto_Sans_Sinhala } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Preloader from "@/components/preloader";
import WhatsAppButton from "@/components/WhatsAppButton";
import MagicCursor from "@/components/MagicCursor";
import CommandMenu from "@/components/CommandMenu";
import ScrollProgress from "@/components/ScrollProgress"; // <--- NEW
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sinhala = Noto_Sans_Sinhala({ subsets: ["sinhala"], variable: "--font-sinhala" });

export const metadata = {
  title: "Seranex | Websites & Software",
  description: "Elite digital engineering in Sri Lanka.",
  icons: { icon: 'https://i.ibb.co/s9XYwhc0/New-Project-3.png' }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${inter.variable} ${sinhala.variable} bg-background text-text antialiased flex flex-col min-h-screen overflow-x-hidden cursor-none md:cursor-auto`}>
        <AuthProvider>
          <LanguageProvider>
            <Preloader>
                <MagicCursor />
                <ScrollProgress /> {/* <--- ADDED HERE */}
                <CommandMenu />
                <Navbar />
                <main className="flex-grow">{children}</main>
                <WhatsAppButton />
                <Footer />
            </Preloader>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}