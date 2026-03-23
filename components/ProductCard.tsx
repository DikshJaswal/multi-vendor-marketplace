"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

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
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition duration-300 border overflow-hidden cursor-pointer">
        
        {/*Safe Image Rendering */}
        <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <img
              src="https://via.placeholder.com/300x200?text=No+Image"
              alt="No Image"
              className="h-full w-full object-cover opacity-70"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col justify-between">
          <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">
            {product.title}
          </h2>

          <p className="text-gray-500 mt-1 text-sm">
            ₹{product.price}
          </p>

          {/* Button */}
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 active:scale-95 transition duration-150 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}