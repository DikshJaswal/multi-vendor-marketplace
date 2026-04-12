"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Users, Store, Clock, Package, TrendingUp, DollarSign, Shield, CheckCircle, XCircle } from "lucide-react";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

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
  const approvedSellers = users.filter((u) => u.role === "seller" && u.isSellerApproved).length;
  const pendingSellers = users.filter(
    (u) => u.role === "seller" && !u.isSellerApproved
  ).length;
  const totalProducts = products.length;
  const approvedProducts = products.filter((p) => p.isApproved).length;
  const pendingProducts = products.filter((p) => !p.isApproved);

  // 🔥 LOADING
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
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 animate-pulse space-y-3">
                <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-600 rounded" />
                <div className="h-8 w-1/2 bg-gray-200 dark:bg-gray-600 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
            {trend}
          </span>
        )}
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
    </div>
  );

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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-slate-800/90 dark:bg-slate-200/90 rounded-xl">
              <Shield className="w-6 h-6 text-white dark:text-slate-800" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 ml-14">
            Manage users, sellers, and product approvals
          </p>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-2 rounded-xl border border-gray-200/50 dark:border-gray-700/50 w-fit">
          {[
            { id: "overview", label: "Overview" },
            { id: "users", label: "Users" },
            { id: "products", label: "Products" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Users"
                value={totalUsers}
                icon={Users}
                color="bg-blue-500"
                trend="+12%"
              />
              <StatCard
                title="Total Sellers"
                value={totalSellers}
                icon={Store}
                color="bg-purple-500"
                trend="+8%"
              />
              <StatCard
                title="Approved Sellers"
                value={approvedSellers}
                icon={CheckCircle}
                color="bg-green-500"
              />
              <StatCard
                title="Pending Approvals"
                value={pendingSellers}
                icon={Clock}
                color="bg-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Products"
                value={totalProducts}
                icon={Package}
                color="bg-cyan-500"
                trend="+15%"
              />
              <StatCard
                title="Approved Products"
                value={approvedProducts}
                icon={CheckCircle}
                color="bg-green-500"
              />
              <StatCard
                title="Pending Products"
                value={pendingProducts.length}
                icon={Clock}
                color="bg-orange-500"
              />
              <StatCard
                title="Revenue"
                value="₹0"
                icon={DollarSign}
                color="bg-emerald-500"
              />
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => { setActiveTab("users"); setFilter("pending"); }}
                  className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all"
                >
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span className="font-medium text-gray-900 dark:text-white">Review Sellers</span>
                </button>
                <button
                  onClick={() => setActiveTab("products")}
                  className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all"
                >
                  <Package className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <span className="font-medium text-gray-900 dark:text-white">Review Products</span>
                </button>
                <button
                  onClick={() => { setActiveTab("users"); setFilter("seller"); }}
                  className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
                >
                  <Store className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="font-medium text-gray-900 dark:text-white">Manage Sellers</span>
                </button>
                <button
                  onClick={() => { setActiveTab("users"); setFilter("all"); }}
                  className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
                >
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-gray-900 dark:text-white">All Users</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div className="space-y-6">
            {/* FILTERS */}
            <div className="flex gap-3 flex-wrap bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
              <button
                onClick={() => setFilter("all")}
                className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === "all"
                    ? "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                All Users
              </button>
              <button
                onClick={() => setFilter("seller")}
                className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === "seller"
                    ? "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Sellers
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === "pending"
                    ? "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Pending Approval
              </button>
            </div>

            {/* USERS GRID */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-lg">
                          {user.name || "No Name"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          : user.role === "seller"
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>

                  {user.role === "seller" && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        {user.isSellerApproved ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                              Approved
                            </span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4 text-amber-500" />
                            <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                              Pending
                            </span>
                          </>
                        )}
                      </div>
                      {!user.isSellerApproved && (
                        <button
                          onClick={() => approveSeller(user._id)}
                          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">No users found</p>
              </div>
            )}
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Pending Products
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {pendingProducts.length} awaiting review
              </span>
            </div>

            {pendingProducts.length === 0 ? (
              <div className="text-center py-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">No pending products</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pendingProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="relative">
                      <img
                        src={product.images?.[0] || "/placeholder.jpg"}
                        alt={product.title}
                        className="h-48 w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg";
                        }}
                      />
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                          Pending
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
                        ₹{product.price}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => approveProduct(product._id)}
                          className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => rejectProduct(product._id)}
                          className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}