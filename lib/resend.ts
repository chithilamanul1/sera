import { Resend } from 'resend';

// Lazy initialization to avoid build failures if the API key is missing
let resendInstance: Resend | null = null;

export const getResendClient = () => {
    if (!resendInstance) {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.warn("RESEND_API_KEY is missing. Resend functionality will fail.");
            // We return a dummy client or handle it in the caller. 
            // For build-time safety, we return a new instance with a dummy string if absolutely necessary,
            // or better, just throw a clearer error only when CALLED.
            return new Resend('re_dummy_key_for_build_safety');
        }
        resendInstance = new Resend(apiKey);
    }
    return resendInstance;
};

// Also export a getter-wrapped constant for easier migration if needed
export const resend = {
    get emails() {
        return getResendClient().emails;
    },
    get contacts() {
        return getResendClient().contacts;
    },
    get audiences() {
        return getResendClient().audiences;
    },
    get batches() {
        return getResendClient().batches;
    }
};
