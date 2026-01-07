import { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export const metadata: Metadata = {
    title: 'Terms of Service | Seranex',
    description: 'Terms of Service for Seranex - Read about our terms and conditions.',
};

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-void text-silver">
            <Header />
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold glow-text mb-8">Terms of Service</h1>
                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="text-xl text-silver/80 mb-8">
                            Last Updated: {new Date().toLocaleDateString()}
                        </p>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                            <p className="mb-4">
                                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Seranex ("we," "us," or "our"), concerning your access to and use of the Seranex website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site"). Used by you, the Site indicates your acceptance of these Terms of Service.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property Rights</h2>
                            <p className="mb-4">
                                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">3. User Representations</h2>
                            <p className="mb-4">
                                By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service; (4) you are not a minor in the jurisdiction in which you reside.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">4. Prohibited Activities</h2>
                            <p className="mb-4">
                                You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">5. Disclaimer</h2>
                            <p className="mb-4">
                                THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
                            <p className="mb-4">
                                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
                            <p className="mb-4">
                                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                            </p>
                            <address className="not-italic">
                                Seranex Engineering<br />
                                Seeduwa, Western Province<br />
                                Sri Lanka<br />
                                support@seranex.com
                            </address>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
