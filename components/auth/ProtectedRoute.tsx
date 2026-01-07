'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getUserRole } from '@/lib/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: ('client' | 'admin' | 'owner')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            if (loading) return;

            if (!user) {
                router.push('/login');
                return;
            }

            if (allowedRoles) {
                const role = await getUserRole(user.uid);

                if (!allowedRoles.includes(role as any)) {
                    // Redirect to appropriate dashboard
                    if (role === 'owner') {
                        router.push('/owner');
                    } else if (role === 'admin') {
                        router.push('/admin');
                    } else {
                        router.push('/dashboard');
                    }
                    return;
                }
            }

            setAuthorized(true);
        }

        checkAuth();
    }, [user, loading, router, allowedRoles]);

    if (loading) {
        return (
            <div className="min-h-screen bg-void flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-glow-silver/20 border-t-glow-silver rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-silver/70">Loading...</p>
                </div>
            </div>
        );
    }

    if (!authorized) {
        return null;
    }

    return <>{children}</>;
}
