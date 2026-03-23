"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [productId, setProductId] = useState<string>("");

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

    toast.success("Added to cart ✅");
    } catch (error: any) {
    toast.error(error.message || "Error adding to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!product) {
    return <p className="p-6 text-red-500">Product not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      
      {/* Image */}
      <div className="bg-gray-100 rounded-xl flex items-center justify-center h-80">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full object-cover rounded-xl"
          />
        ) : (
          <img
            src="https://via.placeholder.com/400x300?text=No+Image"
            alt="No Image"
            className="h-full object-cover rounded-xl opacity-70"
          />
        )}
      </div>
      
      {/* Details */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {product.title}
        </h1>

        <p className="text-xl text-gray-600 mt-2">
          ₹{product.price}
        </p>

        <p className="text-gray-500 mt-4">
          {product.description}
        </p>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50"
        >
          {adding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}