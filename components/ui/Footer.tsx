import Link from 'next/link';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-zinc-50 dark:bg-[#050505] border-t border-zinc-200 dark:border-neutral-900 text-zinc-700 dark:text-neutral-300 py-12 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-widest uppercase italic">Seranex</h2>
                    <p className="text-sm leading-relaxed">
                        Bridging the gap between high-end design and technical architecture.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-zinc-900 dark:text-white font-semibold mb-4 uppercase text-xs tracking-widest">Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/services/web-development" className="hover:text-[#00F2FF] transition">Web Development</Link></li>
                        <li><Link href="/services/mobile-applications" className="hover:text-[#00F2FF] transition">Mobile Apps</Link></li>
                        <li><Link href="/services/ai-solutions" className="hover:text-[#DC143C] transition">AI Solutions</Link></li>
                        <li><Link href="/services/custom-software" className="hover:text-[#DC143C] transition">Custom Software</Link></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h3 className="text-zinc-900 dark:text-white font-semibold mb-4 uppercase text-xs tracking-widest">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                        <li><Link href="/rate-us" className="text-blue-500 hover:text-blue-400 font-bold transition">Leave a Review</Link></li>
                        <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-zinc-900 dark:text-white font-semibold mb-4 uppercase text-xs tracking-widest">Connect</h3>
                    <div className="flex space-x-4 mb-4">
                        <Link href="#" className="hover:text-white transition" aria-label="Follow us on Twitter"><Twitter className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-white transition" aria-label="Connect with us on LinkedIn"><Linkedin className="w-5 h-5" /></Link>
                        <Link href="https://github.com/Seranex-Lanka" className="hover:text-white transition" aria-label="View our open-source work on GitHub"><Github className="w-5 h-5" /></Link>
                    </div>
                    <ul className="space-y-2 text-xs text-zinc-500 dark:text-neutral-400">
                        <li><a href="mailto:customer@airporttaxis.lk" className="hover:text-white transition">customer@airporttaxis.lk</a></li>
                        <li><a href="mailto:support@airporttaxis.lk" className="hover:text-white transition">support@airporttaxis.lk</a></li>
                        <li><a href="mailto:support@srilankantaxi.lk" className="hover:text-white transition">support@srilankantaxi.lk</a></li>
                        <li><a href="mailto:support@touris.lk" className="hover:text-white transition">support@touris.lk</a></li>
                        <li><a href="mailto:support@tourtaxi.lk" className="hover:text-white transition">support@tourtaxi.lk</a></li>
                        <li><a href="mailto:support@airporttaxicab.lk" className="hover:text-white transition">support@airporttaxicab.lk</a></li>
                    </ul>
                </div>

            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-zinc-200 dark:border-neutral-900 text-center text-xs text-zinc-600 dark:text-neutral-400">
                &copy; {new Date().getFullYear()} Seranex Business Solutions. Operating from Seeduwa, Sri Lanka.
            </div>
        </footer>
    );
}
