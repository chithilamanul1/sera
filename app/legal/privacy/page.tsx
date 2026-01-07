import { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export const metadata: Metadata = {
    title: 'Privacy Policy | Seranex',
    description: 'Privacy Policy for Seranex - Learn how we collect, use, and protect your data.',
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-void text-silver">
            <Header />
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold glow-text mb-8">Privacy Policy</h1>
                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="text-xl text-silver/80 mb-8">
                            Last Updated: {new Date().toLocaleDateString()}
                        </p>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                            <p className="mb-4">
                                Welcome to Seranex ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy.
                                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                            <p className="mb-4">
                                We collect personal information that you voluntarily provide to us when you:
                            </p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>Register on the website</li>
                                <li>Express an interest in obtaining information about us or our products and services</li>
                                <li>Participate in activities on the website (such as posting messages in our online forums or entering competitions, contests, or giveaways)</li>
                                <li>Contact us</li>
                            </ul>
                            <p className="mb-4">
                                The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include:
                            </p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>Name and Contact Data (Email, Phone Number)</li>
                                <li>Credentials (Passwords, Security Information)</li>
                                <li>Payment Data (processed securely by third-party payment processors)</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                            <p className="mb-4">
                                We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                            </p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>To facilitate account creation and logon process.</li>
                                <li>To send you marketing and promotional communications.</li>
                                <li>To fulfill and manage your orders.</li>
                                <li>To request feedback.</li>
                                <li>To protect our Services.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">4. Sharing Your Information</h2>
                            <p className="mb-4">
                                We may process or share your data that we hold based on the following legal basis:
                            </p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
                                <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                <li><strong>Performance of a Contract:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                                <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">5. Security of Your Information</h2>
                            <p className="mb-4">
                                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
                            <p className="mb-4">
                                If you have questions or comments about this policy, you may email us at support@seranex.com or contact us by post at:
                            </p>
                            <address className="not-italic">
                                Seranex Engineering<br />
                                Seeduwa, Western Province<br />
                                Sri Lanka
                            </address>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
