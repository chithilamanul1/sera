import PriceCalculator from '@/components/PriceCalculator';

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-display font-bold text-white mb-4">Transparent Pricing</h1>
        <p className="text-muted text-xl">No hidden fees. Pay for what you need.</p>
      </div>
      <PriceCalculator />
    </div>
  );
}