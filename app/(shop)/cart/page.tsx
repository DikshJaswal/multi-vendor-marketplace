"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false); // 🔥 for mock payment UI
  const router = useRouter();
  
  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      setItems(data.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🔥 Quantity update
  const updateQuantity = async (
    productId: string,
    type: "inc" | "dec"
  ) => {
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          type,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      fetchCart();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // 🔥 Remove item
  const removeItem = async (productId: string) => {
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          type: "dec-all",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Item removed 🗑");
      fetchCart();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // 🔥 MOCK PAYMENT
  const handleMockPayment = async () => {
    try {
      setPaying(true);

      // ⏳ fake delay
      await new Promise((res) => setTimeout(res, 2000));

      toast.success("Payment successful 🎉");

      // create order
      const res = await fetch("/api/orders", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // clear cart UI
      router.push("/success");
    } catch (error: any) {
      toast.error("Payment failed ❌");
    } finally {
      setPaying(false);
    }
  };

  const total = items.reduce(
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  );

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* 🔥 Payment Loader */}
      {paying && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <p className="text-lg font-semibold">
              Processing Payment...
            </p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          Nothing here yet 🛒
        </p>
      ) : (
        <div className="space-y-6">
          {items.map((item: any) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-white p-5 rounded-xl shadow-sm border"
            >
              <div>
                <h2 className="font-semibold text-lg">
                  {item.product.title}
                </h2>
                <p className="text-gray-500 text-sm">
                  ₹{item.product.price}
                </p>

                {/* 🔥 Remove */}
                <button
                  onClick={() => removeItem(item.product._id)}
                  className="text-red-500 text-sm mt-2 hover:underline"
                >
                  Remove
                </button>
              </div>

              {/* 🔥 Quantity */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, "dec")
                  }
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  -
                </button>

                <span className="font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    updateQuantity(item.product._id, "inc")
                  }
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <div className="font-semibold">
                ₹{item.product.price * item.quantity}
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 border-t pt-6">
            <h2 className="text-xl font-bold">
              Total: ₹{total}
            </h2>

            {/* 🔥 Mock Payment Button */}
            <button
              onClick={handleMockPayment}
              className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800"
            >
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}