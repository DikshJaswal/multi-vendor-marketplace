import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "user" | "seller" | "admin";
      isSellerApproved: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "user" | "seller" | "admin";
    isSellerApproved: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "user" | "seller" | "admin";
    isSellerApproved: boolean;
  }
}