import Link from "next/link";

export default function Services() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">Our Services</h1>
      <p className="text-muted text-xl max-w-2xl mb-16">
        We don't just write code. We build digital assets that add value to your company.
      </p>

      <div className="grid gap-12">
        {/* Service 1 */}
        <div className="flex flex-col md:flex-row gap-8 items-center bg-surface p-8 rounded-2xl border border-gray-800">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-4">Web Application Development</h2>
            <p className="text-muted mb-6 text-lg">
              From simple landing pages to complex e-commerce platforms. We use the latest technology to ensure your site is fast and secure.
            </p>
            <ul className="space-y-2 mb-6 text-gray-400">
              <li>✓ E-Commerce Stores</li>
              <li>✓ Corporate Portfolios</li>
              <li>✓ Booking Systems</li>
            </ul>
            <Link href="/contact" className="text-primary font-bold hover:underline">Get a Quote →</Link>
          </div>
          <div className="w-full md:w-1/3 h-64 bg-slate-800 rounded-xl flex items-center justify-center text-slate-600">
             [Web Dev Image]
          </div>
        </div>

        {/* Service 2 */}
        <div className="flex flex-col md:flex-row gap-8 items-center bg-surface p-8 rounded-2xl border border-gray-800">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-4">Custom Software Solutions</h2>
            <p className="text-muted mb-6 text-lg">
              Stop using Excel sheets. We build custom software to automate your daily tasks.
            </p>
            <ul className="space-y-2 mb-6 text-gray-400">
              <li>✓ Inventory Management (POS)</li>
              <li>✓ Employee Management (HR)</li>
              <li>✓ Customer Databases (CRM)</li>
            </ul>
            <Link href="/contact" className="text-primary font-bold hover:underline">Discuss Requirements →</Link>
          </div>
          <div className="w-full md:w-1/3 h-64 bg-slate-800 rounded-xl flex items-center justify-center text-slate-600">
             [Software Image]
          </div>
        </div>
      </div>
    </div>
  );
}