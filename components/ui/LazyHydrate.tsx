'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

interface LazyHydrateProps {
    children: ReactNode;
    fallback?: ReactNode;
    rootMargin?: string;
}

export function LazyHydrate({
    children,
    fallback = <div className="min-h-[200px] w-full" />,
    rootMargin = '300px'
}: LazyHydrateProps) {
    const [hydrated, setHydrated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // If the browser doesn't support IntersectionObserver, hydrate immediately
        if (typeof IntersectionObserver === 'undefined') {
            setHydrated(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting || entry.boundingClientRect.top <= 0) {
                    setHydrated(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            {
                rootMargin: rootMargin
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [rootMargin]);

    return (
        <div ref={ref}>
            {hydrated ? children : fallback}
        </div>
    );
}
