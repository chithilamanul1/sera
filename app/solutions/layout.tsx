import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Enterprise Solutions & Capabilities | Seranex",
    description: "Discover the proprietary Enterprise Solutions developed by Seranex, built to automate operations and deploy autonomous AI.",
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
