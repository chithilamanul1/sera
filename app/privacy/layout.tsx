import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Privacy Policy | Seranex Data Sovereignty",
    description: "Seranex handles enterprise data with zero-trust architecture. Read our full privacy and data governance policy.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
