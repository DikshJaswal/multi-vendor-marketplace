"use client";

import Link from "next/link";
import { useSearch } from "@/context/SearchContext";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";

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
      ? "text-slate-800 dark:text-white font-semibold"
      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors";

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* LOGO - Glassy Mobile Optimized */}
          <Link href="/" className="flex items-center gap-2 lg:gap-4 transition-all duration-200 hover:scale-105">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-slate-800/90 dark:bg-slate-200/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white dark:text-slate-800 text-lg lg:text-xl">🛍</span>
            </div>
            <span className="text-lg lg:text-2xl font-bold text-slate-800 dark:text-white whitespace-nowrap self-center" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
              Marketplace
            </span>
          </Link>

          {/* SEARCH - Mobile Optimized */}
          {pathname === "/shop" && (
            <div className="hidden md:block flex-1 max-w-xs lg:max-w-xl mx-8 lg:mx-16">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-gray-300/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm lg:text-base transition-all duration-200 hover:bg-white/80 dark:hover:bg-gray-800/80"
                  style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
                />
              </div>
            </div>
          )}

          {/* DESKTOP NAV - Hidden on Mobile */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-10 ml-8">
            <Link href="/shop" className={`text-base lg:text-lg transition-colors duration-200 ${
              pathname === "/shop" 
                ? "text-slate-800 dark:text-white font-semibold" 
                : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`} style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
              Shop
            </Link>
            <Link href="/cart" className={`text-base lg:text-lg transition-colors duration-200 ${
              pathname === "/cart" 
                ? "text-slate-800 dark:text-white font-semibold" 
                : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`} style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
              Cart
            </Link>
            <Link href="/orders" className={`text-base lg:text-lg transition-colors duration-200 ${
              pathname === "/orders" 
                ? "text-slate-800 dark:text-white font-semibold" 
                : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`} style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
              Orders
            </Link>

            {/* 🔥 SELLER APPROVED */}
            {session?.user?.role === "seller" &&
              session.user.isSellerApproved && (
                <>
                  <Link href="/dashboard" className={`text-base lg:text-lg transition-colors duration-200 ${
                    pathname === "/dashboard" 
                      ? "text-slate-800 dark:text-white font-semibold" 
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  }`} style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                    Dashboard
                  </Link>
                  <Link href="/seller-orders" className={`text-base lg:text-lg transition-colors duration-200 ${
                    pathname === "/seller-orders" 
                      ? "text-slate-800 dark:text-white font-semibold" 
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  }`} style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                    Seller Orders
                  </Link>
                </>
              )}

            {/* 🔥 ADMIN */}
            {session?.user?.role === "admin" && (
              <Link href="/admin" className={`text-base lg:text-lg transition-colors duration-200 ${
                pathname === "/admin" 
                  ? "text-slate-800 dark:text-white font-semibold" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
              }`} style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                Admin
              </Link>
            )}
          </div>

          {/* AUTH - Mobile Optimized */}
          <div className="flex items-center gap-2 lg:gap-6 ml-8 lg:ml-12">
            {status === "loading" ? (
              <div className="w-16 h-8 lg:w-24 lg:h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg lg:rounded-xl" />
            ) : session ? (
              <div className="hidden lg:flex items-center gap-12">
                <span className="text-slate-600 dark:text-slate-400 hidden xl:block" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                  Hi, {session.user?.name || "User"}
                </span>

                {/* 🔥 SELLER STATES */}
                {session.user.role === "user" ? (
                  <button
                    onClick={handleBecomeSeller}
                    disabled={loadingSeller}
                    className="px-3 py-1 lg:px-5 lg:py-2 text-sm lg:text-base text-slate-600 dark:text-slate-400 border border-slate-300/50 dark:border-slate-600/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg lg:rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-200"
                    style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
                  >
                    {loadingSeller ? "Applying..." : "Become Seller"}
                  </button>
                ) : session.user.role === "seller" &&
                  !session.user.isSellerApproved ? (
                  <span className="text-amber-600 dark:text-amber-400 text-xs lg:text-sm" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                    Approval Pending
                  </span>
                ) : null}

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-3 py-1 lg:px-5 lg:py-2 text-sm lg:text-base text-slate-600 dark:text-slate-400 border border-slate-300/50 dark:border-slate-600/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg lg:rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-200"
                  style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2 lg:gap-4">
                <button
                  onClick={() => signIn()}
                  className="px-3 py-2 lg:px-6 lg:py-3 text-sm lg:text-base text-slate-600 dark:text-slate-400 border border-slate-300/50 dark:border-slate-600/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg lg:rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-200"
                  style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
                >
                  Login
                </button>

                <button
                  onClick={() => router.push("/signup")}
                  className="px-3 py-2 lg:px-6 lg:py-3 text-sm lg:text-base bg-slate-800/80 dark:bg-slate-200/80 backdrop-blur-sm text-white dark:text-slate-800 rounded-lg lg:rounded-xl hover:bg-slate-700/80 dark:hover:bg-slate-300/80 transition-all duration-200"
                  style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
                >
                  Signup
                </button>
              </div>
            )}

            {/* THEME TOGGLE - Always Visible */}
            <ThemeToggle />

            {/* MOBILE MENU CONTROLS */}
            <div className="flex lg:hidden">
              <button
                className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white p-2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-800/50"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="text-xl lg:text-2xl">☰</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU - Enhanced Mobile Design */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-2">
            {/* SEARCH - Mobile */}
            {pathname === "/shop" && (
              <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 hover:bg-white/80 dark:hover:bg-gray-800/80"
                  style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
                />
              </div>
            )}

            {/* NAVIGATION LINKS - Mobile */}
            <div className="space-y-1">
              <Link href="/shop" className={`block py-3 px-2 text-base transition-all duration-200 rounded-lg ${
                pathname === "/shop" 
                  ? "text-slate-800 dark:text-white font-semibold bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/30 dark:hover:bg-gray-800/30 backdrop-blur-sm"
              }`} style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }} onClick={() => setMenuOpen(false)}>Shop</Link>
              <Link href="/cart" className={`block py-3 px-2 text-base transition-all duration-200 rounded-lg ${
                pathname === "/cart" 
                  ? "text-slate-800 dark:text-white font-semibold bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/30 dark:hover:bg-gray-800/30 backdrop-blur-sm"
              }`} style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }} onClick={() => setMenuOpen(false)}>Cart</Link>
              <Link href="/orders" className={`block py-3 px-2 text-base transition-all duration-200 rounded-lg ${
                pathname === "/orders" 
                  ? "text-slate-800 dark:text-white font-semibold bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/30 dark:hover:bg-gray-800/30 backdrop-blur-sm"
              }`} style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }} onClick={() => setMenuOpen(false)}>Orders</Link>

              {/* SELLER - Mobile */}
              {session?.user?.role === "seller" &&
                session.user.isSellerApproved && (
                  <>
                    <Link href="/dashboard" className={`block py-3 px-2 text-base transition-all duration-200 rounded-lg ${
                      pathname === "/dashboard" 
                        ? "text-slate-800 dark:text-white font-semibold bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm" 
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/30 dark:hover:bg-gray-800/30 backdrop-blur-sm"
                    }`} style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }} onClick={() => setMenuOpen(false)}>Dashboard</Link>
                    <Link href="/seller-orders" className={`block py-3 px-2 text-base transition-all duration-200 rounded-lg ${
                      pathname === "/seller-orders" 
                        ? "text-slate-800 dark:text-white font-semibold bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm" 
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/30 dark:hover:bg-gray-800/30 backdrop-blur-sm"
                    }`} style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }} onClick={() => setMenuOpen(false)}>Seller Orders</Link>
                  </>
                )}

              {/* ADMIN - Mobile */}
              {session?.user?.role === "admin" && (
                <Link href="/admin" className={`block py-3 px-2 text-base transition-all duration-200 rounded-lg ${
                  pathname === "/admin" 
                    ? "text-slate-800 dark:text-white font-semibold bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/30 dark:hover:bg-gray-800/30 backdrop-blur-sm"
                }`} style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }} onClick={() => setMenuOpen(false)}>Admin</Link>
              )}
            </div>

            {/* AUTH - Mobile */}
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              {session ? (
                <>
                  <div className="px-2 py-2">
                    <p className="text-slate-600 dark:text-slate-400 text-sm" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                      Hi, {session.user?.name}
                    </p>
                  </div>

                  {session.user.role === "user" && (
                    <button
                      onClick={() => {
                        handleBecomeSeller();
                        setMenuOpen(false);
                      }}
                      disabled={loadingSeller}
                      className="w-full py-3 px-4 text-slate-600 dark:text-slate-400 border border-slate-300/50 dark:border-slate-600/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-200"
                      style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
                    >
                      {loadingSeller ? "Applying..." : "Become Seller"}
                    </button>
                  )}

                  {session.user.role === "seller" &&
                    !session.user.isSellerApproved && (
                    <div className="px-2">
                      <p className="text-amber-600 dark:text-amber-400 text-sm" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                        Approval Pending
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setMenuOpen(false);
                    }}
                    className="w-full py-3 px-4 text-slate-600 dark:text-slate-400 border border-slate-300/50 dark:border-slate-600/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-200"
                    style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      signIn();
                      setMenuOpen(false);
                    }}
                    className="w-full py-3 px-4 text-slate-600 dark:text-slate-400 border border-slate-300/50 dark:border-slate-600/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-200"
                    style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
                  >
                    Login
                  </button>

                  <button
                    onClick={() => {
                      router.push("/signup");
                      setMenuOpen(false);
                    }}
                    className="w-full py-3 px-4 bg-slate-800/80 dark:bg-slate-200/80 backdrop-blur-sm text-white dark:text-slate-800 rounded-lg hover:bg-slate-700/80 dark:hover:bg-slate-300/80 transition-all duration-200"
                    style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
                  >
                    Signup
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}