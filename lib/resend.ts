import { Resend } from 'resend';

// Lazy initialization to avoid build failures if the API key is missing
let resendInstance: Resend | null = null;

const getResendClient = () => {
    if (!resendInstance) {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.warn("RESEND_API_KEY is missing. Resend functionality will fail.");
            // We return a dummy client during build to satisfy initialization
            return new Resend('re_dummy_key_for_build_safety');
        }
        resendInstance = new Resend(apiKey);
    }
    return resendInstance;
};

// Also export a getter-wrapped object to maintain compatibility with existing code
// while ensuring lazy initialization.
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
    get batch() {
        return getResendClient().batch;
    }
};
