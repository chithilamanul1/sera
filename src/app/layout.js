import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Preloader from "@/components/preloader";

// SETUP FONTS
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Seranex | Websites & Software",
  description: "We build professional websites and custom software in Sri Lanka.",
  icons: {
    icon: 'https://i.ibb.co/s9XYwhc0/New-Project-3.png',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${inter.variable} bg-background text-text antialiased flex flex-col min-h-screen overflow-x-hidden`}>
        <Preloader>
            <Navbar />
            <main className="flex-grow">
            {children}
            </main>
            <Footer />
        </Preloader>
      </body>
    </html>
  );
}