import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-surface border-t border-gray-800 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold font-display text-white mb-4">SERANEX</h2>
          <p className="text-muted max-w-sm">
            Elite digital engineering. We build websites and software that help your business grow.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-muted">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/services" className="hover:text-primary">Services</Link></li>
            <li><Link href="/portfolio" className="hover:text-primary">Our Work</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-bold text-white mb-4">Legal</h3>
          <ul className="space-y-2 text-muted">
            <li><Link href="/legal/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="/legal/terms" className="hover:text-primary">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-gray-800 text-center text-muted text-sm">
        © {year} Seranex. All rights reserved. Built in Seeduwa.
      </div>
    </footer>
  );
}