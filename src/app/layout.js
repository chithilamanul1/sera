import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata = {
  title: "Seranex | Web & Software Solutions",
  description: "We build modern websites and software for your business.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${orbitron.variable} bg-background text-text antialiased flex flex-col min-h-screen overflow-x-hidden`}>
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