"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { useSearch } from "@/context/SearchContext";
import { ShoppingBag } from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { search } = useSearch();

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // 🔥 Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔥 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/products?search=${encodeURIComponent(debouncedSearch || "")}`
        );

        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearch]);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 max-w-7xl mx-auto px-6 py-10">
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

      <div className="relative z-10 flex items-center gap-4 mb-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-300"></div>
          <div className="relative bg-slate-800/90 dark:bg-slate-200/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl group-hover:scale-105 transition-all duration-300">
            <ShoppingBag className="w-6 h-6 text-white dark:text-slate-800" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
          Discover Products
        </h1>
      </div>

      {/* Products Grid - Original structure with beautiful styling */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative group mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full p-8 group-hover:scale-105 transition-all duration-300">
              <ShoppingBag className="w-16 h-16 text-slate-400 dark:text-slate-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-600 dark:text-slate-400 mb-4" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            No products found
          </h2>
          <p className="text-slate-500 dark:text-slate-500 text-center max-w-md mb-6" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            Try adjusting your search terms or browse our featured products.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/80 dark:bg-slate-200/80 backdrop-blur-sm text-white dark:text-slate-800 rounded-2xl hover:bg-slate-700/80 dark:hover:bg-slate-300/80 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
          >
            Browse All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any, index: number) => (
            <div 
              key={product._id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}