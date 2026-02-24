import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Refund Policy | Seranex Service Guarantee",
    description: "Learn about the Seranex outcome-based software contract guarantees and refund procedures.",
};

export default function RefundLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
