import Header from '@/components/shared/Header';
import Footer from '@/components/landing/Footer';
import AboutSection from '@/components/landing/AboutSection';

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-void pt-20">
                <AboutSection />
            </main>
            <Footer />
        </>
    );
}
