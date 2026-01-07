import Header from '@/components/shared/Header';
import Footer from '@/components/landing/Footer';
import PortfolioSection from '@/components/landing/PortfolioSection';

export default function PortfolioPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-void pt-20">
                <PortfolioSection />
            </main>
            <Footer />
        </>
    );
}
