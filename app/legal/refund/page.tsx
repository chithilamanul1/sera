import { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export const metadata: Metadata = {
    title: 'Refund & Return Policy | Seranex',
    description: 'Refund and Return Policy for Seranex - Learn about our refund terms for digital services.',
};

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-void text-silver">
            <Header />
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold glow-text mb-8">Refund & Return Policy</h1>
                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="text-xl text-silver/80 mb-8">
                            Last Updated: {new Date().toLocaleDateString()}
                        </p>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">1. Overview</h2>
                            <p className="mb-4"> 
                                At Seranex ("we," "our," or "us"), we take pride in delivering high-quality digital services,
                                including web development, web design, UI/UX design, and related digital solutions.
                                As a service-based business providing custom digital work, our refund and return policy
                                is designed to be fair to both parties while reflecting the nature of our services.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">2. Nature of Services</h2>
                            <p className="mb-4">
                                Our services are primarily custom digital work that cannot be "returned" in the traditional sense.
                                Once work has been completed and delivered, it cannot be returned. However, we understand that
                                circumstances may arise where a refund request is warranted.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">3. Refund Eligibility</h2>
                            <p className="mb-4">
                                You may be eligible for a full or partial refund under the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li><strong>Project Not Started:</strong> If you cancel before any work has commenced, you are entitled to a full refund of any deposits paid.</li>
                                <li><strong>Significant Deviation:</strong> If the final deliverable significantly deviates from the agreed specifications without prior communication, you may request a refund.</li>
                                <li><strong>Technical Issues:</strong> If technical issues caused by our work prevent the product from functioning as specified, and we are unable to resolve them within a reasonable timeframe.</li>
                                <li><strong>Cancelled by Seranex:</strong> If we are unable to complete the project for any reason on our end, you will receive a full refund.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">4. Non-Refundable Situations</h2>
                            <p className="mb-4">
                                Refunds will generally NOT be provided in the following situations:
                            </p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>Work has been completed according to the agreed specifications and delivered</li>
                                <li>Client fails to provide necessary materials, feedback, or approvals causing project delays</li>
                                <li>Client changes their mind about the project direction after significant work has been done</li>
                                <li>Third-party service failures beyond our control (e.g., hosting, domain registrar issues)</li>
                                <li>Requests made after the project warranty period (typically 30 days from delivery)</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">5. Refund Process</h2>
                            <p className="mb-4">
                                To request a refund, please follow these steps:
                            </p>
                            <ol className="list-decimal pl-6 mb-4 space-y-2">
                                <li>Contact us at support@seranex.com with your project details and reason for refund request</li>
                                <li>Include any relevant documentation, screenshots, or evidence to support your claim</li>
                                <li>Our team will review your request within 5-7 business days</li>
                                <li>If approved, refunds will be processed within 10-14 business days to your original payment method</li>
                            </ol>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">6. Partial Refunds</h2>
                            <p className="mb-4">
                                In cases where work has partially been completed, a partial refund may be issued based on:
                            </p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>The percentage of work completed at the time of cancellation</li>
                                <li>Resources and time already invested in the project</li>
                                <li>Any third-party costs already incurred on your behalf</li>
                            </ul>
                            <p className="mb-4">
                                The exact refund amount will be determined on a case-by-case basis and communicated to you clearly.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">7. Revisions and Disputes</h2>
                            <p className="mb-4">
                                Before requesting a refund, we encourage you to take advantage of our revision policy.
                                Most of our service packages include a specified number of revisions to ensure your satisfaction.
                                We are committed to working with you to achieve the desired outcome.
                            </p>
                            <p className="mb-4">
                                If we cannot reach an agreement regarding a refund, either party may seek mediation or
                                other dispute resolution methods as outlined in our Terms of Service.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
                            <p className="mb-4">
                                If you have questions about this policy or wish to request a refund, please contact us:
                            </p>
                            <address className="not-italic">
                                Seranex Engineering<br />
                                Seeduwa, Western Province<br />
                                Sri Lanka<br />
                                Email: support@seranex.com
                            </address>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
