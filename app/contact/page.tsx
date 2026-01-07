import Header from '@/components/shared/Header';
import Footer from '@/components/landing/Footer';
import ContactSection from '@/components/landing/ContactSection';

export default function ContactPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-void pt-20">
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
