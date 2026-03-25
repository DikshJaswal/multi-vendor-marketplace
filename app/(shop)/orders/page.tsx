"use client";

import { useEffect, useState } from "react";

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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 border rounded-xl">
          <p className="text-gray-500">No orders yet 📦</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">

                {/* 🔥 SHORT ORDER ID */}
                <p className="font-semibold text-sm text-gray-700">
                  Order #{order._id.slice(-6).toUpperCase()}
                </p>

                {/* STATUS */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "confirmed"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "shipped"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
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

                      {/* 🔥 IMAGE */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
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
                        <p className="font-medium text-gray-800">
                          {item.product?.title || "Product"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="font-semibold text-gray-800">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex justify-between mt-5 pt-4 border-t font-semibold text-lg">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}