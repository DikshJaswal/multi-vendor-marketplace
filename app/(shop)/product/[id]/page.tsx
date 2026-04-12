"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "@/components/ProductCard";
import { ShoppingCart, Star } from "lucide-react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [productId, setProductId] = useState<string>("");

  useEffect(() => {
    const unwrapParams = async () => {
      const resolved = await params;
      setProductId(resolved.id);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!productId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();

        setProduct(data.product);
        setRelated(data.related || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      setAdding(true);

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Added to cart ✅");
    } catch {
      toast.error("Error adding to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen relative bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 max-w-7xl mx-auto px-6 py-10">
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
        </div>

        <div className="relative flex items-center gap-4 mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-300"></div>
            <div className="relative bg-slate-800/90 dark:bg-slate-200/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl group-hover:scale-105 transition-all duration-300">
              <ShoppingCart className="w-6 h-6 text-white dark:text-slate-800" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            Loading Product...
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-3xl h-96 animate-pulse border border-slate-300/50 dark:border-slate-600/50" />
          <div className="space-y-6">
            <div className="h-8 bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-xl animate-pulse border border-slate-300/50 dark:border-slate-600/50" />
            <div className="h-6 bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-xl animate-pulse w-1/2 border border-slate-300/50 dark:border-slate-600/50" />
            <div className="h-20 bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-xl animate-pulse border border-slate-300/50 dark:border-slate-600/50" />
            <div className="h-12 bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-xl animate-pulse border border-slate-300/50 dark:border-slate-600/50" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 max-w-7xl mx-auto px-6 py-10">
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
      {/* PRODUCT - Enhanced structure with beautiful styling */}
      <div className="relative grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-500/20 to-slate-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-3xl flex items-center justify-center p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm group-hover:scale-105 transition-all duration-300">
            <img
              src={product.images?.[0] || "https://via.placeholder.com/400"}
              alt={product.title}
              className="max-h-[400px] object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="relative space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            {product.title}
          </h1>
          
          {/* Stars */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
              ))}
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>(4.0 out of 5)</span>
          </div>
          
          <p className="text-3xl font-semibold bg-gradient-to-r from-slate-700 to-slate-600 dark:from-slate-300 dark:to-slate-400 bg-clip-text text-transparent" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            ₹{product.price}
          </p>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            {product.description || "No description available"}
          </p>

          {/* Key Features */}
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>Key Features</h3>
            <ul className="space-y-3 text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-3" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                <div className="w-2 h-2 bg-slate-500 rounded-full" />
                Premium quality material
              </li>
              <li className="flex items-center gap-3" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                <div className="w-2 h-2 bg-slate-500 rounded-full" />
                Fast and reliable delivery
              </li>
              <li className="flex items-center gap-3" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                <div className="w-2 h-2 bg-slate-500 rounded-full" />
                30-day return policy
              </li>
              <li className="flex items-center gap-3" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                <div className="w-2 h-2 bg-slate-500 rounded-full" />
                Secure payment options
              </li>
            </ul>
          </div>

          {/* Add to Cart - Enhanced functionality */}
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="w-full flex items-center justify-center gap-3 bg-slate-800/80 dark:bg-slate-200/80 backdrop-blur-sm text-white dark:text-slate-800 px-8 py-4 rounded-3xl hover:bg-slate-700/80 dark:hover:bg-slate-300/80 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-slate-200/50 dark:border-slate-700/50"
            style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
          >
            {adding ? (
              <>
                <div className="w-5 h-5 border-2 border-white dark:border-slate-800 border-t-transparent rounded-full animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* RELATED PRODUCTS - Enhanced functionality */}
      {related.length > 0 && (
        <div className="relative">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            Related Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p, index) => (
              <div 
                key={p._id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}