"use client";

import { SessionProvider } from "next-auth/react";
import { SearchProvider } from "@/context/SearchContext";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SearchProvider>

        <Navbar />

        {children}

        <Toaster position="top-right" />

      </SearchProvider>
    </SessionProvider>
  );
}