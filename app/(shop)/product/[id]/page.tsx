"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "@/components/ProductCard";

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
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        <h1 className="text-3xl font-bold mb-4">My Orders</h1>

        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border animate-pulse space-y-4"
          >
            <div className="flex justify-between">
              <div className="h-4 w-1/3 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>

            <div className="space-y-3">
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>

            <div className="h-4 w-1/4 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

      {/* PRODUCT */}
      <div className="grid md:grid-cols-2 gap-12">

        <div className="bg-gray-100 rounded-2xl flex items-center justify-center p-6">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/400"}
            alt={product.title}
            className="max-h-[400px] object-contain"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <p className="text-3xl font-semibold">₹{product.price}</p>

          <p className="text-gray-600">
            {product.description || "No description available"}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="bg-black text-white px-8 py-3 rounded-xl"
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* 🔥 RELATED PRODUCTS */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Related Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}