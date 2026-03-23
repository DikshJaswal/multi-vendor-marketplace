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
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          No orders yet 📦
        </p>
      ) : (
        <div className="space-y-8">
          {Array.isArray(orders) && orders.map((order: any) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-xl shadow-sm border"
            >
              <div className="flex justify-between mb-4">
                <p className="font-semibold">
                  Order ID: {order._id}
                </p>
                <p className="text-sm text-gray-500">
                  Status: {order.status}
                </p>
              </div>

              <div className="space-y-3">
                {order.items.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.product.title} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

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