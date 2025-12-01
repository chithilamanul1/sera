import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AuthProvider } from "@/context/AuthContext"; // <--- ADDED

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Seranex | Websites & Software",
  description: "We build professional websites and custom software in Sri Lanka.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${inter.variable} bg-background text-text antialiased flex flex-col min-h-screen`}>
        <AuthProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <WhatsAppButton />
            <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}