"use client";

import Link from "next/link";
import { useSearch } from "@/context/SearchContext";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { search, setSearch } = useSearch();
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadingSeller, setLoadingSeller] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // 🔥 FIXED SELLER FLOW
  const handleBecomeSeller = async () => {
    try {
      setLoadingSeller(true);

      const res = await fetch("/api/seller/apply", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      toast.success("Seller request sent 🚀");

      // 🔥 IMPORTANT: reload to refresh session
      window.location.reload();

    } catch {
      toast.error("Error applying for seller");
    } finally {
      setLoadingSeller(false);
    }
  };

  const linkStyle = (path: string) =>
    pathname === path
      ? "text-black font-semibold border-b-2 border-black pb-1"
      : "text-gray-600 hover:text-black transition";

  return (
    <nav className="bg-white/80 backdrop-blur border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-xl md:text-2xl font-bold">
          🛍 Marketplace
        </Link>

        {/* SEARCH */}
        {pathname === "/shop" && (
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="hidden md:block w-1/3 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
          />
        )}

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-6 font-medium">

          <Link href="/shop" className={linkStyle("/shop")}>
            Shop
          </Link>

          <Link href="/cart" className={linkStyle("/cart")}>
            Cart
          </Link>

          <Link href="/orders" className={linkStyle("/orders")}>
            Orders
          </Link>

          {/* 🔥 SELLER APPROVED */}
          {session?.user?.role === "seller" &&
            session.user.isSellerApproved && (
              <>
                <Link href="/dashboard" className={linkStyle("/dashboard")}>
                  Dashboard
                </Link>

                <Link href="/seller-orders" className={linkStyle("/seller-orders")}>
                  Seller Orders
                </Link>
              </>
          )}

          {/* 🔥 ADMIN */}
          {session?.user?.role === "admin" && (
            <Link href="/admin" className={linkStyle("/admin")}>
              Admin
            </Link>
          )}

          {/* AUTH */}
          {status === "loading" ? (
            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-full" />
          ) : session ? (
            <div className="flex items-center gap-4">

              <span className="text-sm text-gray-700 hidden lg:block">
                Hi, {session.user?.name || "User"}
              </span>

              {/* 🔥 SELLER STATES */}
              {session.user.role === "user" ? (
                <button
                  onClick={handleBecomeSeller}
                  disabled={loadingSeller}
                  className="px-3 py-1 rounded-full border hover:bg-gray-100 text-sm"
                >
                  {loadingSeller ? "Applying..." : "Become Seller"}
                </button>
              ) : session.user.role === "seller" &&
                !session.user.isSellerApproved ? (
                <span className="text-xs text-yellow-600">
                  Approval Pending
                </span>
              ) : null}

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-4 py-1.5 rounded-full border hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => signIn()}
                className="px-4 py-1.5 rounded-full border hover:bg-gray-100"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/signup")}
                className="bg-black text-white px-4 py-1.5 rounded-full"
              >
                Signup
              </button>
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* 🔥 MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 border-t bg-white">

          {/* SEARCH */}
          {pathname === "/shop" && (
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />
          )}

          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/orders">Orders</Link>

          {/* SELLER */}
          {session?.user?.role === "seller" &&
            session.user.isSellerApproved && (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/seller-orders">Seller Orders</Link>
              </>
          )}

          {/* ADMIN */}
          {session?.user?.role === "admin" && (
            <Link href="/admin">Admin</Link>
          )}

          {/* AUTH */}
          {session ? (
            <>
              <p className="text-sm text-gray-700">
                Hi, {session.user?.name}
              </p>

              {session.user.role === "user" && (
                <button
                  onClick={handleBecomeSeller}
                  className="w-full border py-2 rounded-lg"
                >
                  Become Seller
                </button>
              )}

              {session.user.role === "seller" &&
                !session.user.isSellerApproved && (
                <p className="text-yellow-600 text-sm">
                  Approval Pending
                </p>
              )}

              <button
                onClick={() => signOut()}
                className="w-full border py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="w-full border py-2 rounded-lg"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/signup")}
                className="w-full bg-black text-white py-2 rounded-lg"
              >
                Signup
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}