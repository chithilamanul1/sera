import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdmin = (auth?.user as any)?.role === "ADMIN";
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

            if (isOnAdmin) {
                if (isLoggedIn && isAdmin) return true;
                return false;
            }

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false;
            }

            return true;
        },
    },
    pages: {
        signIn: "/login",
    },
} satisfies NextAuthConfig;
