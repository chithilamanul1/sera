import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Secure Login | Seranex Admin & Client Portal",
    description: "Access your Seranex projects, AI architecture, and global dashboard.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
