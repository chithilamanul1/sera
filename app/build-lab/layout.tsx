import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Digital Build Lab | Custom Software Architecture Viewer",
    description: "Explore the Seranex Digital Build Lab. Visualize Next.js, React Native, and AI infrastructure architecture directly in your browser.",
};

export default function BuildLabLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
