"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Package, ShoppingCart, CheckCircle, Clock, Truck, Box, AlertCircle } from "lucide-react";

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders/seller");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Error loading orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        toast.error("Failed to update");
        return;
      }

      toast.success("Status updated");
      await fetchOrders(); // ✅ always refresh

    } catch {
      toast.error("Error updating status");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <Box className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "confirmed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "shipped":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "delivered":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  // 🔥 SKELETON
  if (loading) {
    return (
      <div className="min-h-screen relative bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-slate-800/90 dark:bg-slate-200/90 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-white dark:text-slate-800" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Seller Orders
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 ml-14">
            Manage and track your orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
            <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">No orders yet</h2>
            <p className="text-gray-500 dark:text-gray-500">Your orders will appear here once customers start purchasing your products.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order: any) => (
              <div
                key={order._id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
              >
                {/* 🔥 HEADER */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

                  {/* ✅ ORDER ID */}
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Order #ORD-{order._id?.toString().slice(-6).toUpperCase()}
                    </p>
                  </div>

                  {/* STATUS */}
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className="border border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 dark:text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                {/* 🔥 ITEMS */}
                <div className="space-y-4 mb-6">
                  {order.items.map((item: any, i: number) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl"
                    >
                      <div className="flex items-center gap-4">

                        {/* IMAGE */}
                        <img
                          src={
                            item.product?.images?.[0] ||
                            "/placeholder.jpg"
                          }
                          alt={item.product?.title || "Product"}
                          className="w-16 h-16 rounded-xl object-cover border border-gray-200/50 dark:border-gray-600/50"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.jpg";
                          }}
                        />

                        {/* TITLE */}
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.product?.title || "Product"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Qty: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                      </div>

                      {/* PRICE */}
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 🔥 FOOTER */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Total Amount</span>
                  <span className="text-xl font-bold text-slate-800 dark:text-slate-200">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}