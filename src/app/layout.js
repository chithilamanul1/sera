import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Preloader from "@/components/preloader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AuthProvider } from "@/context/AuthContext";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Seranex | Websites & Software",
  description: "Elite digital engineering in Sri Lanka.",
  // NOTE: 'icons' object removed. Next.js will now automatically look for icon.js
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${inter.variable} bg-background text-text antialiased flex flex-col min-h-screen overflow-x-hidden`}>
        <AuthProvider>
            <Preloader>
                <Navbar />
                <main className="flex-grow">{children}</main>
                <WhatsAppButton />
                <Footer />
            </Preloader>
        </AuthProvider>
      </body>
    </html>
  );
}