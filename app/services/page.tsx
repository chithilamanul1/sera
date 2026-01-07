import Header from '@/components/shared/Header';
import Footer from '@/components/landing/Footer';
import ServicesSection from '@/components/landing/ServicesSection';

export default function ServicesPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-void pt-20">
                <ServicesSection />
            </main>
            <Footer />
        </>
    );
}
