"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Package, Plus, Edit3, Trash2, CheckCircle, Clock, Store } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  price: number;
  isApproved: boolean;
}

export default function SellerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    fetchProducts();
  }, [status]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products/seller");

      if (!res.ok) {
        toast.error("Not authorized as seller");
        setProducts([]);
        return;
      }

      const data = await res.json();
      setProducts(data || []);
    } catch {
      toast.error("Error loading products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      toast.success("Product deleted");

      setProducts((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen relative bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-40 dark:opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              rgba(148, 163, 184, 0.15) 40px,
              rgba(148, 163, 184, 0.15) 80px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              rgba(148, 163, 184, 0.08) 40px,
              rgba(148, 163, 184, 0.08) 80px
            )`
          }}></div>
        </div>
        
        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-36 h-36 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '9s' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s', animationDuration: '7s' }}></div>
        </div>
        
        {/* Additional Background Layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/30 to-transparent dark:from-slate-900/30 dark:to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/30 to-transparent dark:from-slate-900/30 dark:to-transparent"></div>
        </div>

        <div className="relative">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-8" />
          <div className="grid gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 animate-pulse space-y-4"
              >
                <div className="flex justify-between">
                  <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-600 rounded" />
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-600 rounded" />
                </div>

                <div className="space-y-3">
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-600 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-600 rounded" />
                </div>

                <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-600 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 max-w-7xl mx-auto px-4 md:px-6 py-8">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(148, 163, 184, 0.15) 40px,
            rgba(148, 163, 184, 0.15) 80px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(148, 163, 184, 0.08) 40px,
            rgba(148, 163, 184, 0.08) 80px
          )`
        }}></div>
      </div>
      
      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-36 h-36 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '9s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s', animationDuration: '7s' }}></div>
      </div>
      
      {/* Additional Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/30 to-transparent dark:from-slate-900/30 dark:to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/30 to-transparent dark:from-slate-900/30 dark:to-transparent"></div>
      </div>

      <div className="relative z-10">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-300"></div>
              <div className="relative bg-slate-800/90 dark:bg-slate-200/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl group-hover:scale-105 transition-all duration-300">
                <Store className="w-6 h-6 text-white dark:text-slate-800" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Seller Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage your products
              </p>
            </div>
          </div>
          
          <button
            onClick={() => router.push("/dashboard/add")}
            className="flex items-center gap-2 bg-slate-800/90 dark:bg-slate-200/90 backdrop-blur-sm text-white dark:text-slate-800 px-6 py-3 rounded-2xl hover:bg-slate-700/90 dark:hover:bg-slate-300/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Products</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{products.length}</h3>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500 rounded-xl">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Approved</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{products.filter(p => p.isApproved).length}</h3>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-500 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Pending</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{products.filter(p => !p.isApproved).length}</h3>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
            <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">No products yet</h2>
            <p className="text-gray-500 dark:text-gray-500 mb-6">Start selling by adding your first product.</p>
            <button
              onClick={() => router.push("/dashboard/add")}
              className="inline-flex items-center gap-2 bg-slate-800/90 dark:bg-slate-200/90 backdrop-blur-sm text-white dark:text-slate-800 px-6 py-3 rounded-2xl hover:bg-slate-700/90 dark:hover:bg-slate-300/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Create your first product
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <h2 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">
                      {p.title}
                    </h2>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                      ₹{p.price}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        p.isApproved
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                      }`}
                    >
                      {p.isApproved ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {p.isApproved ? "Approved" : "Pending"}
                    </span>

                    <button
                      onClick={() =>
                        router.push(`/dashboard/edit/${p._id}`)
                      }
                      className="flex items-center gap-1 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="flex items-center gap-1 px-4 py-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}