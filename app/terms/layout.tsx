import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Terms of Service | Seranex Business Solutions",
    description: "Review the Terms of Service and Engineering Agreements for engaging with Seranex Lanka.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
