"use client";

import { useEffect, useState } from "react";
import { Package } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/my");
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen relative bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 max-w-6xl mx-auto px-6 py-10">
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
              <Package className="w-6 h-6 text-white dark:text-slate-800" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            My Orders
          </h1>
        </div>

        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 animate-pulse space-y-4"
          >
            <div className="flex justify-between">
              <div className="h-4 w-1/3 bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-xl" />
              <div className="h-4 w-20 bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-xl" />
            </div>

            <div className="space-y-3">
              <div className="h-4 w-1/2 bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-lg" />
              <div className="h-4 w-2/3 bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-lg" />
            </div>

            <div className="h-4 w-1/4 bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 max-w-6xl mx-auto px-6 py-10">
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

      <div className="relative flex items-center gap-4 mb-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-300"></div>
          <div className="relative bg-slate-800/90 dark:bg-slate-200/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl group-hover:scale-105 transition-all duration-300">
            <Package className="w-6 h-6 text-white dark:text-slate-800" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
          My Orders
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative group mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full p-8 group-hover:scale-105 transition-all duration-300">
              <Package className="w-16 h-16 text-slate-400 dark:text-slate-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-600 dark:text-slate-400 mb-4" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            No orders yet
          </h2>
          <p className="text-slate-500 dark:text-slate-500 text-center max-w-md mb-6" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            You haven't placed any orders yet. Start shopping to see your orders here!
          </p>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/80 dark:bg-slate-200/80 backdrop-blur-sm text-white dark:text-slate-800 rounded-2xl hover:bg-slate-700/80 dark:hover:bg-slate-300/80 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any, index: number) => (
            <div
              key={order._id}
              className="group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-slate-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">
                  <p className="font-semibold text-sm text-slate-700 dark:text-slate-300" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                    Order #{order._id.slice(-6).toUpperCase()}
                  </p>

                  {/* STATUS */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                      order.status === "pending"
                        ? "bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/50"
                        : order.status === "confirmed"
                        ? "bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50"
                        : order.status === "shipped"
                        ? "bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/50"
                        : "bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200/50 dark:border-green-800/50"
                    }`}
                    style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
                  >
                    {order.status}
                  </span>
                </div>

                {/* ITEMS */}
                <div className="space-y-4">
                  {order.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center"
                    >
                      {/* LEFT */}
                      <div className="flex items-center gap-4">
                        {/* IMAGE */}
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                          <img
                            src={
                              item.product?.images?.[0] ||
                              "https://via.placeholder.com/100"
                            }
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* TITLE */}
                        <div>
                          <p className="font-medium text-slate-800 dark:text-slate-200" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                            {item.product?.title || "Product"}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>

                      {/* PRICE */}
                      <div className="font-semibold text-slate-800 dark:text-slate-200" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="flex justify-between mt-5 pt-4 border-t border-slate-200 dark:border-slate-600 font-semibold text-lg">
                  <span className="text-slate-900 dark:text-slate-100" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>Total</span>
                  <span className="bg-gradient-to-r from-slate-700 to-slate-600 dark:from-slate-300 dark:to-slate-400 bg-clip-text text-transparent" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}