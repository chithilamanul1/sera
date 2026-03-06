'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import { Loader2, CreditCard } from 'lucide-react';

interface PayHereButtonProps {
    orderId: string;
    items: string;
    amount: number;
    currency?: string;
    customerInfo: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        country: string;
    };
    onCompleted?: (orderId: string) => void;
    onDismissed?: () => void;
    onError?: (error: string) => void;
    className?: string;
    label?: string;
}

declare global {
    interface Window {
        payhere: any;
    }
}

export default function PayHereButton({
    orderId,
    items,
    amount,
    currency = 'LKR',
    customerInfo,
    onCompleted,
    onDismissed,
    onError,
    className = "",
    label = "Pay Now"
}: PayHereButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    const handlePayment = async () => {
        if (!isScriptLoaded) {
            onError?.("Payment gateway not ready");
            return;
        }

        setIsLoading(true);

        try {
            // 1. Get signature from backend
            const response = await fetch('/api/payhere/signature', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    order_id: orderId,
                    amount: amount,
                    currency: currency
                }),
            });

            if (!response.ok) throw new Error('Failed to get payment signature');

            const { signature, merchantId } = await response.json();

            // 2. Prepare payment object
            const payment = {
                sandbox: process.env.NEXT_PUBLIC_PAYHERE_ENV === 'sandbox' || true,
                merchant_id: merchantId,
                return_url: `${window.location.origin}/payment/success`,
                cancel_url: `${window.location.origin}/payment/cancel`,
                notify_url: `${window.location.origin}/api/payhere/notify`,
                order_id: orderId,
                items: items,
                amount: amount.toFixed(2),
                currency: currency,
                hash: signature,
                ...customerInfo
            };

            // 3. Start Payment
            window.payhere.onCompleted = function (orderId: string) {
                console.log("Payment completed. OrderID:" + orderId);
                onCompleted?.(orderId);
                setIsLoading(false);
            };

            window.payhere.onDismissed = function () {
                console.log("Payment dismissed");
                onDismissed?.();
                setIsLoading(false);
            };

            window.payhere.onError = function (error: string) {
                console.log("Error:" + error);
                onError?.(error);
                setIsLoading(false);
            };

            window.payhere.startPayment(payment);

        } catch (err: any) {
            console.error("Payment Start Error:", err);
            onError?.(err.message);
            setIsLoading(false);
        }
    };

    return (
        <>
            <Script
                src="https://www.payhere.lk/lib/payhere.js"
                onLoad={() => setIsScriptLoaded(true)}
                onError={() => console.error("PayHere script failed to load")}
            />

            <button
                onClick={handlePayment}
                disabled={isLoading || !isScriptLoaded}
                className={`flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <CreditCard className="w-5 h-5" />
                )}
                {isLoading ? "Processing..." : label}
            </button>
        </>
    );
}
