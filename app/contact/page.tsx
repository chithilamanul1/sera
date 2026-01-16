import Header from '@/components/shared/Header';
import Footer from '@/components/landing/Footer';
import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
    title: 'Contact Us | Seranex Digital',
    description: 'Get in touch with Seranex Digital for your web design and development needs. Call us at +94 728382638 or visit us in Seeduwa, Sri Lanka.',
    openGraph: {
        title: 'Contact Seranex Digital - Web Design & Development in Sri Lanka',
        description: 'Start your project with Seranex Digital today.',
    }
};

export default function ContactPage() {
    return (
        <div className="bg-void min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <ContactForm />
                </div>
            </main>

            <Footer />
        </div>
    );
}
