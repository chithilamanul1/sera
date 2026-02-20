import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");

    // Protect all /admin routes except /admin/login
    if (isOnAdmin && !req.nextUrl.pathname.startsWith("/admin/login")) {
        if (!isLoggedIn) {
            return Response.redirect(new URL("/login", req.nextUrl));
        }
    }
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
