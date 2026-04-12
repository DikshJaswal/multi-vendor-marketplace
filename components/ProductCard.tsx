"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { ShoppingCart } from "lucide-react";

type Product = {
  _id: string;
  title: string;
  price: number;
  images?: string[];
};

export default function ProductCard({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });

      const data = await res.json();

      if (res.status === 401) {
        toast.error("Please login to add items to cart");

        //open login
        signIn();
        return;
      }
      
      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Added to cart ✅");
    } catch (error: any) {
      toast.error(error.message || "Error adding to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={`/product/${product._id}`}>
      <div className="group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden cursor-pointer hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-slate-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        
        {/*Safe Image Rendering */}
        <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center overflow-hidden">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <img
              src="https://via.placeholder.com/300x200?text=No+Image"
              alt="No Image"
              className="h-full w-full object-cover opacity-70"
            />
          )}
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="relative p-5 flex flex-col justify-between">
          <h2 className="font-semibold text-lg text-slate-800 dark:text-white line-clamp-1 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-300" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            {product.title}
          </h2>

          <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm font-medium" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            ₹{product.price}
          </p>

          {/* Button */}
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-slate-800/80 dark:bg-slate-200/80 backdrop-blur-sm text-white dark:text-slate-800 py-2.5 rounded-2xl hover:bg-slate-700/80 dark:hover:bg-slate-300/80 active:scale-95 transition-all duration-200 disabled:opacity-50 font-medium border border-slate-200/50 dark:border-slate-700/50"
            style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white dark:border-slate-800 border-t-transparent rounded-full animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}