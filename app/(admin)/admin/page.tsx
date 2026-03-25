"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // 🔥 FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Error loading users");
    }
  };

  // 🔥 FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products/all");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Error loading products");
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchUsers(), fetchProducts()]);
      } catch {
        toast.error("Error loading admin data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // 🔥 APPROVE SELLER
  const approveSeller = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/approve/${userId}`, {
        method: "PUT",
      });

      if (!res.ok) {
        toast.error("Failed to approve seller");
        return;
      }

      toast.success("Seller approved 🚀");
      fetchUsers();
    } catch {
      toast.error("Error approving seller");
    }
  };

  // 🔥 APPROVE PRODUCT
  const approveProduct = async (productId: string) => {
    try {
      const res = await fetch(
        `/api/admin/products/approve/${productId}`,
        { method: "PUT" }
      );

      if (!res.ok) {
        toast.error("Failed to approve product");
        return;
      }

      toast.success("Product approved ✅");
      fetchProducts();
    } catch {
      toast.error("Error approving product");
    }
  };

  // ✅ NEW: REJECT PRODUCT
  const rejectProduct = async (productId: string) => {
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error("Failed to reject product");
        return;
      }

      toast.success("Product rejected ❌");
      fetchProducts();
    } catch {
      toast.error("Error rejecting product");
    }
  };

  // 🔥 FILTER USERS
  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    if (filter === "seller") return user.role === "seller";
    if (filter === "pending")
      return user.role === "seller" && !user.isSellerApproved;
    return true;
  });

  // 🔥 STATS
  const totalUsers = users.length;
  const totalSellers = users.filter((u) => u.role === "seller").length;
  const pendingSellers = users.filter(
    (u) => u.role === "seller" && !u.isSellerApproved
  ).length;

  const pendingProducts = products.filter((p) => !p.isApproved);

  // 🔥 LOADING
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl border animate-pulse space-y-3"
          >
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-gray-500 text-sm">Total Users</p>
          <h2 className="text-2xl font-bold">{totalUsers}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-gray-500 text-sm">Total Sellers</p>
          <h2 className="text-2xl font-bold">{totalSellers}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-gray-500 text-sm">Pending Sellers</p>
          <h2 className="text-2xl font-bold text-yellow-600">
            {pendingSellers}
          </h2>
        </div>

      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-6 flex-wrap">

        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1 rounded-full border ${
            filter === "all"
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("seller")}
          className={`px-4 py-1 rounded-full border ${
            filter === "seller"
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Sellers
        </button>

        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-1 rounded-full border ${
            filter === "pending"
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Pending Approval
        </button>

      </div>

      {/* USERS */}
      <div className="grid gap-6 md:grid-cols-2 mb-12">

        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="mb-4">
              <p className="font-semibold text-lg">
                {user.name || "No Name"}
              </p>
              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium">
                {user.role}
              </span>

              {user.role === "seller" && (
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    user.isSellerApproved
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {user.isSellerApproved
                    ? "Approved"
                    : "Pending"}
                </span>
              )}
            </div>

            {user.role === "seller" &&
              !user.isSellerApproved && (
                <button
                  onClick={() => approveSeller(user._id)}
                  className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800"
                >
                  Approve Seller
                </button>
              )}
          </div>
        ))}

      </div>

      {/* PRODUCTS */}
      <h2 className="text-2xl font-bold mb-4">
        Pending Products
      </h2>

      {pendingProducts.length === 0 ? (
        <p className="text-gray-500">No pending products</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">

          {pendingProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={product.images?.[0]}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <p className="font-semibold text-gray-800">
                  {product.title}
                </p>

                <p className="text-sm text-gray-500">
                  ₹{product.price}
                </p>

                <button
                  onClick={() => approveProduct(product._id)}
                  className="mt-3 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800"
                >
                  Approve Product
                </button>

                {/* ✅ NEW BUTTON */}
                <button
                  onClick={() => rejectProduct(product._id)}
                  className="mt-2 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600"
                >
                  Reject Product
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}