import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Cookie Policy | Seranex Digital Experience",
    description: "Understand how Seranex uses cookies and local storage to deliver high-performance autonomous web experiences.",
};

export default function CookieLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
