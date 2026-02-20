import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session || session.user?.role !== 'ADMIN') {
        redirect('/admin/login');
    }

    return <>{children}</>;
}
