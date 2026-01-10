import { redirect } from 'next/navigation';

// Redirect to the main refund policy page
export default function ReturnPolicyPage() {
    redirect('/legal/refund');
}
