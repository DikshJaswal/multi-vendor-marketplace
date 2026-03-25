"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

      <button
        onClick={() => router.push("/dashboard/add")}
        className="bg-black text-white px-4 py-2 rounded mb-6"
      >
        Add Product
      </button>

      {products.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <p className="text-gray-500 mb-3">No products yet</p>
          <button
            onClick={() => router.push("/dashboard/add")}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Create your first product
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{p.title}</h2>
                <p>₹{p.price}</p>
              </div>

              <div className="flex gap-3 items-center">

                <span
                  className={`px-2 py-1 text-sm rounded ${
                    p.isApproved
                      ? "bg-green-200"
                      : "bg-yellow-200"
                  }`}
                >
                  {p.isApproved ? "Approved" : "Pending"}
                </span>

                <button
                  onClick={() =>
                    router.push(`/dashboard/edit/${p._id}`)
                  }
                  className="text-blue-500 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}