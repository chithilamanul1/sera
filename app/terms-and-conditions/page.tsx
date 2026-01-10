import { redirect } from 'next/navigation';

// Redirect to the main terms page
export default function TermsAndConditionsPage() {
    redirect('/legal/terms');
}
