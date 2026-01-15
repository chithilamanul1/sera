import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/landing/Header';
import Footer from '@/components/shared/Footer';

export const metadata: Metadata = {
    title: 'Careers at Seranex | Join Our Partner Network',
    description: 'Join Seranex as a sales partner or freelance developer. High commission rates, flexible work, and the chance to represent Sri Lanka\'s premium digital agency.',
};

const jobs = [
    {
        id: 'sales-partner',
        title: 'Digital Sales Partner',
        type: 'Commission Based',
        commission: '15-20% per Project',
        description: 'We are looking for energetic individuals to connect businesses with our premium web solutions. Earn significant commissions for every client you refer.',
        requirements: [
            'Strong communication skills',
            'Network of business contacts',
            'Understanding of web value proposition',
            'Self-motivated'
        ]
    },
    {
        id: 'referral-agent',
        title: 'Brand Ambassador',
        type: 'Performance Based',
        commission: 'LKR 5,000 per Referral',
        description: 'Simply refer friends or businesses to our LKR 5,000 Starter Website package. For every 3 signups, you get a special bonus.',
        requirements: [
            'Social media presence',
            'Active in local business communities',
            'Passion for digital growth'
        ]
    }
];

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-void">
            <Header />
            <div className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Header */}
                    <div className="text-center mb-20 space-y-4">
                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tighter">
                            WORK WITH <span className="text-accent">US</span>
                        </h1>
                        <p className="text-silver/60 text-lg max-w-2xl mx-auto">
                            Join our partner network. Flexible opportunities with high earning potential.
                        </p>
                    </div>

                    {/* Jobs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {jobs.map((job) => (
                            <div key={job.id} className="bg-surface border border-white/5 rounded-2xl p-8 hover:border-accent/40 transition-colors">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                                        <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-bold uppercase tracking-wide">
                                            {job.type}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-silver/60">Potential Earnings</div>
                                        <div className="text-lg font-bold text-green-400">{job.commission}</div>
                                    </div>
                                </div>

                                <p className="text-silver/70 mb-8 leading-relaxed">
                                    {job.description}
                                </p>

                                <div className="mb-8">
                                    <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Requirements</h4>
                                    <ul className="space-y-2">
                                        {job.requirements.map((req, i) => (
                                            <li key={i} className="flex items-center text-silver/60 text-sm">
                                                <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></span>
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link href="/contact" className="block w-full py-4 text-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-all">
                                    Apply Now
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Banner */}
                    <div className="mt-20 p-12 bg-gradient-to-r from-surface to-surface/50 border border-white/10 rounded-3xl text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Have a different skill?</h2>
                        <p className="text-silver/60 mb-8 max-w-xl mx-auto relative z-10">
                            We are always looking for talented freelance developers, designers, and copywriters to join our roster.
                        </p>
                        <Link href="/contact" className="inline-block px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform relative z-10">
                            Send Your Portfolio
                        </Link>
                    </div>

                </div>
                <Footer />
            </div>
            );
}
