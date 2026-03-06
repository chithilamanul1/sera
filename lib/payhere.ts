import crypto from 'crypto';

/**
 * PayHere Payment Types & Utilities
 */

export interface PayHerePaymentRequest {
    sandbox: boolean;
    merchant_id: string;
    return_url: string;
    cancel_url: string;
    notify_url: string;
    order_id: string;
    items: string;
    amount: string;
    currency: string;
    hash: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    delivery_address?: string;
    delivery_city?: string;
    delivery_country?: string;
    custom_1?: string;
    custom_2?: string;
}

export interface PayHereNotification {
    merchant_id: string;
    order_id: string;
    payment_id: string;
    payhere_amount: string;
    payhere_currency: string;
    status_code: string;
    md5sig: string;
    custom_1?: string;
    custom_2?: string;
    method?: string;
    status_message?: string;
    card_holder_name?: string;
    card_expiry?: string;
    card_no?: string;
}

/**
 * Generates an MD5 signature for a PayHere payment request.
 * Format: Upper(MD5(merchant_id + order_id + amount + currency + Upper(MD5(merchant_secret))))
 */
export function generatePayHereSignature(
    merchantId: string,
    merchantSecret: string,
    orderId: string,
    amount: number,
    currency: string = 'LKR'
): string {
    const amountFormatted = amount.toLocaleString('en-us', { minimumFractionDigits: 2 }).replaceAll(',', '');

    const secretHash = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();

    const mainString = merchantId + orderId + amountFormatted + currency + secretHash;

    return crypto.createHash('md5').update(mainString).digest('hex').toUpperCase();
}

/**
 * Verifies the MD5 signature returned by PayHere in the notify callback.
 * Format: Upper(MD5(merchant_id + order_id + payhere_amount + payhere_currency + status_code + Upper(MD5(merchant_secret))))
 */
export function verifyPayHereNotification(
    notification: PayHereNotification,
    merchantSecret: string
): boolean {
    const secretHash = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();

    const mainString =
        notification.merchant_id +
        notification.order_id +
        notification.payhere_amount +
        notification.payhere_currency +
        notification.status_code +
        secretHash;

    const expectedHash = crypto.createHash('md5').update(mainString).digest('hex').toUpperCase();

    return expectedHash === notification.md5sig;
}
