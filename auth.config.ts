export default {
    providers: [], // Providers added in auth.ts (Credentials)
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const role = (auth?.user as any)?.role;
            const isAllowed = role === "ADMIN" || role === "OWNER";
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

            if (isOnAdmin) {
                if (isLoggedIn && isAllowed) return true;
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
