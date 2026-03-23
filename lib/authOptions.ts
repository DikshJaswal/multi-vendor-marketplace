import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import { loginUser } from "@/services/user.service";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
        name: "Credentials",

        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
        },

        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
            }

            await connectDB();

            const user = await loginUser(
            credentials.email,
            credentials.password
            );

            if (!user) return null;

            return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            };
        },
        }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};