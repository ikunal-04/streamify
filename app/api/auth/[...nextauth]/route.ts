import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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
                if (!credentials) {
                    throw new Error("No credentials provided");
                }
                
                const user = await prisma.user.findUnique({
                    where: { 
                        email: credentials.email 
                    }
                });

                if (user && await bcrypt.compare(credentials.password, user.password)) {
                    console.log("User found and password matched, means loggedin succesfully!!");
                                      
                    return user;
                } else {
                    throw new Error("Invalid credentials");
                }           
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST}