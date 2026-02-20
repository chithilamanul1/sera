'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency } from '@/lib/pricing';

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrency] = useState<Currency>('USD');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Attempt to detect location
        const detectLocation = async () => {
            try {
                // Using a free IP geolocation API (ipapi.co is common for this)
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();

                const countryCode = data.country_code;

                // Map country codes to our supported currencies
                let detectedCurrency: Currency = 'USD'; // Default

                switch (countryCode) {
                    case 'LK':
                        detectedCurrency = 'LKR';
                        break;
                    case 'GB':
                        detectedCurrency = 'GBP';
                        break;
                    case 'AU':
                        detectedCurrency = 'AUD';
                        break;
                    case 'AE':
                        detectedCurrency = 'AED';
                        break;
                    case 'US':
                        detectedCurrency = 'USD';
                        break;
                    // Add Eurozone checks as needed
                    case 'DE': case 'FR': case 'IT': case 'ES': case 'NL':
                        detectedCurrency = 'EUR';
                        break;
                    default:
                        detectedCurrency = 'USD';
                }

                setCurrency(detectedCurrency);
            } catch (error) {
                console.error("Failed to detect location:", error);
                setCurrency('USD'); // Fallback
            } finally {
                setIsLoading(false);
            }
        };

        detectLocation();
    }, []);

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, isLoading }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
