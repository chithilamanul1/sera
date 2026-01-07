import Link from "next/link";
import Image from "next/image";

const logoUrl = "https://i.ibb.co/s9XYwhc0/New-Project-3.png";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Image */}
        <Link href="/" className="relative w-40 h-12">
            <Image 
                src={logoUrl}
                alt="Seranex Logo"
                fill
                className="object-contain mix-blend-screen" // mix-blend-screen hides the black background
                priority
            />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-muted hover:text-primary transition-colors font-medium">Home</Link>
          <Link href="/services" className="text-muted hover:text-primary transition-colors font-medium">Services</Link>
          <Link href="/portfolio" className="text-muted hover:text-primary transition-colors font-medium">Portfolio</Link>
          <Link href="/contact" className="bg-primary hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-bold transition-all shadow-md shadow-blue-900/20">
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu (Simple) */}
        <div className="md:hidden">
          <Link href="/contact" className="text-sm bg-primary text-white px-3 py-1.5 rounded font-bold">
            Menu
          </Link>
        </div>
      </div>
    </nav>
  );
}