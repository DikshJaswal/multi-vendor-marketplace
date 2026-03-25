import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // ✅ add
import { connectDB } from "@/lib/db";
import { loginUser } from "@/services/user.service";
import User from "@/models/User"; // ✅ needed for Google users
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [

    // 🔥 GOOGLE OAUTH
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000, // ✅ 10 seconds
      },
    }),

    // 🔥 CREDENTIALS LOGIN
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
          isSellerApproved: user.isSellerApproved,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {

    // 🔥 HANDLE BOTH GOOGLE + CREDENTIALS
    async jwt({ token, user, account }) {

      // ✅ ONLY RUN ON FIRST LOGIN
      if (account && user) {
        await connectDB();

        let dbUser = await User.findOne({ email: user.email });

        if (!dbUser) {
          dbUser = await User.create({
            name: user.name,
            email: user.email,
            role: "user",
            isSellerApproved: false,
          });
        }

        token.id = dbUser._id.toString();
        token.role = dbUser.role;
        token.isSellerApproved = dbUser.isSellerApproved;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "user" | "seller" | "admin";
        session.user.isSellerApproved = token.isSellerApproved as boolean;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login", // optional (your custom login page)
  },

  secret: process.env.NEXTAUTH_SECRET,
};