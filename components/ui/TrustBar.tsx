'use client';

const services = [
    "Web Apps", "Mobile Apps", "AI Tools", "E-Commerce", "UI/UX Design", "Automation", "SaaS"
];

export function TrustBar() {
    return (
        <section className="py-12 overflow-hidden bg-white dark:bg-black relative transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-black via-transparent to-white dark:to-black z-10 pointer-events-none" />

            <p className="text-center text-[10px] uppercase font-semibold tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-8">
                What We Build
            </p>

            <div className="flex whitespace-nowrap overflow-hidden">
                <div className="flex animate-infinite-scroll py-4">
                    {[...services, ...services].map((service, idx) => (
                        <div
                            key={idx}
                            className="mx-12 text-2xl md:text-4xl font-bold text-zinc-300 dark:text-zinc-800 hover:text-blue-500 dark:hover:text-white transition-colors cursor-default select-none opacity-60 dark:opacity-30 hover:opacity-100 font-syne"
                        >
                            {service}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
