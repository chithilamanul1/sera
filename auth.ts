import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import authConfig from "./auth.config";

// Hardcoded initial access for the engineering team
const OWNER_EMAILS = [
    "info@seranex.org",
    "chithilamanul1@gmail.com"
];

const ADMIN_EMAILS = [
    "riyonbashitha@gmail.com",
    "bashithariyon@gmail.com"
];

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
    providers: [
        Credentials({
            name: "SeraNex Global Access",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!user || !user.password) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        ...authConfig.callbacks,
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.role = (user as any).role;
                token.id = user.id;
            }
            
            // Handle role updates during session
            if (trigger === "update" && session?.role) {
                token.role = session.role;
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;

                // Emergency Elevation Protocol (Hardcoded overrides)
                if (session.user.email) {
                    if (OWNER_EMAILS.includes(session.user.email) && session.user.role !== "OWNER") {
                        await prisma.user.update({
                            where: { email: session.user.email },
                            data: { role: "OWNER" }
                        });
                        session.user.role = "OWNER";
                    } else if (ADMIN_EMAILS.includes(session.user.email) && session.user.role !== "ADMIN" && session.user.role !== "OWNER") {
                        await prisma.user.update({
                            where: { email: session.user.email },
                            data: { role: "ADMIN" }
                        });
                        session.user.role = "ADMIN";
                    }
                }
            }
            return session;
        },
    },
});

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role?: string;
        } & DefaultSession["user"]
    }

    interface User {
        role?: string;
    }

    interface JWT {
        role?: string;
        id?: string;
    }
}
