import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com"},
                password: { label: "Password", type: "password", placeholder: "Password"}
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                });

                if (user && user.password === credentials?.password) {
                    await prisma.user.create({
                        data: {
                            id: user.id,
                            email: user.email,
                            password: user.password
                        }
                    });
                    return user;
                } else {
                    throw new Error("Invalid credentials");
                }           
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST}