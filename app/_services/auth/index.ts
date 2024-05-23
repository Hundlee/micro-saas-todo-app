import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../database";
import { createStripeCustomer } from "../stripe";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    pages: {
        signIn: "/auth",
        signOut: "/auth",
        error: "/auth",
        verifyRequest: "/auth",
        newUser: "/app",
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    events: {
        createUser: async (message) => {
            await createStripeCustomer({
                name: message.user.name as string,
                email: message.user.email as string,
            });
        },
    },
    callbacks: {
        async session({ session, user }) {
            session.user = {
                ...session.user,
                id: user.id,
                emailVerified: user.emailVerified,
            };

            return session;
        },
    },
    secret: process.env.SECRET,
});
