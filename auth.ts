import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import authConfig from "./auth.config";

const ADMIN_EMAILS = [
    "info@seranex.org",
    "chithilamanul1@gmail.com",
    "riyonbashitha@gmail.com",
    "bashithariyon@gmail.com"
];

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
    providers: [
        ...authConfig.providers,
        Credentials({
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
        async session({ session }) {
            if (session.user) {
                try {
                    if (session.user.email) {
                        const dbUser = await prisma.user.findUnique({
                            where: { email: session.user.email },
                        });

                        if (dbUser) {
                            session.user.role = dbUser.role;
                            session.user.id = dbUser.id;

                            if (ADMIN_EMAILS.includes(dbUser.email as string) && dbUser.role !== "ADMIN") {
                                await prisma.user.update({
                                    where: { id: dbUser.id },
                                    data: { role: "ADMIN" }
                                });
                                session.user.role = "ADMIN";
                            }
                        }
                    }
                } catch (e) {
                    console.error("Error fetching user in session callback:", e);
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
