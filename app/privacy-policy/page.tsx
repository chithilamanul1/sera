import { redirect } from 'next/navigation';

// Redirect to the main privacy policy page
export default function PrivacyPolicyPage() {
    redirect('/legal/privacy');
}
