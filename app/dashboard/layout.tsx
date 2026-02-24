import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Client Dashboard | Seranex Mission Control",
    description: "Your personalized mission control. Manage your software projects, interact with your AI agents, and view analytics.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
