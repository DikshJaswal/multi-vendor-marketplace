"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  // 🔥 SKELETON
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold mb-4">Seller Orders</h1>

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
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Seller Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">
          No orders yet
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div
              key={order._id}
              className="bg-white border p-5 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              {/* 🔥 HEADER */}
              <div className="flex justify-between items-center mb-4">

                {/* ✅ SHORT ORDER ID */}
                <p className="text-sm font-semibold text-gray-700">
                  Order #ORD-{order._id?.toString().slice(-6).toUpperCase()}
                </p>

                {/* STATUS */}
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="border px-3 py-1 rounded-lg text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              {/* 🔥 ITEMS */}
              <div className="space-y-4">
                {order.items.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">

                      {/* IMAGE */}
                      <img
                        src={
                          item.product?.images?.[0] ||
                          "https://via.placeholder.com/50"
                        }
                        className="w-12 h-12 rounded object-cover border"
                      />

                      {/* TITLE */}
                      <div>
                        <p className="text-sm font-medium">
                          {item.product?.title || "Product"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    {/* PRICE */}
                    <span className="text-sm font-medium">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* 🔥 FOOTER */}
              <div className="flex justify-between mt-4 pt-4 border-t font-semibold">
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