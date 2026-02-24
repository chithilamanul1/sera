import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Rate Your Experience | Seranex Quality Assurance",
    description: "Provide feedback on your experience with Seranex. We value your input to continuously improve our software engineering services.",
};

export default function RateUsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
