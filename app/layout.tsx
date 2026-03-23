"use client";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { SearchProvider } from "@/context/SearchContext";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        {/* 🔥 AUTH + SEARCH */}
        <SessionProvider>
          <SearchProvider>

            {/* 🔥 Navbar */}
            <Navbar />

            {/* 🔥 Pages */}
            {children}

            {/* 🔥 Toast */}
            <Toaster position="top-right" />

          </SearchProvider>
        </SessionProvider>

      </body>
    </html>
  );
}