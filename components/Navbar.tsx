"use client";

import Link from "next/link";
import { useSearch } from "@/context/SearchContext";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation"; // 🔥 added
import { useEffect, useState } from "react";

export default function Navbar() {
  const { search, setSearch } = useSearch();
  const { data: session, status } = useSession();
  const pathname = usePathname(); // 🔥 current route
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          🛍 Marketplace
        </Link>

        {/* 🔍 Search (ONLY on /shop) */}
        {pathname === "/shop" && (
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 max-w-md px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
        )}

        {/* Right Section */}
        <div className="flex items-center gap-5 text-gray-600 font-medium">

          <Link href="/shop" className="hover:text-black">
            Shop
          </Link>
          <Link href="/cart" className="hover:text-black">
            Cart
          </Link>
          <Link href="/orders" className="hover:text-black">
            Orders
          </Link>

          {/* 🔥 AUTH */}
          {mounted && (
            status === "loading" ? (
              <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-lg" />
            ) : session ? (
              <>
                <span className="text-sm text-gray-700">
                  Hi, {session.user?.name || "User"}
                </span>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-black text-white px-4 py-1 rounded-lg hover:bg-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => signIn(undefined, { callbackUrl: "/" })}
                  className="px-4 py-1 rounded-lg border hover:bg-gray-100"
                >
                  Login
                </button>

                <button
                  onClick={() => signIn(undefined, { callbackUrl: "/" })}
                  className="bg-black text-white px-4 py-1 rounded-lg hover:bg-gray-800"
                >
                  Signup
                </button>
              </>
            )
          )}
        </div>
      </div>
    </nav>
  );
}