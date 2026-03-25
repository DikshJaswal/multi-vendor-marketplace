"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const router = useRouter();

  // 🔥 FETCH CART
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

  // 🔥 UPDATE QUANTITY
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

      if (!res.ok) throw new Error();

      fetchCart();
    } catch {
      toast.error("Error updating quantity");
    }
  };

  // 🔥 REMOVE ITEM
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

      if (!res.ok) throw new Error();

   //   toast.success("Item removed 🗑");
      fetchCart();
    } catch {
      toast.error("Error removing item");
    }
  };

  // 🔥 BUY SINGLE PRODUCT (CORRECT)
  const handleBuySingle = async (productId: string, quantity: number) => {
    try {
      const res = await fetch("/api/orders/buy-now", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity, // ✅ correct quantity
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Order placed 🚀");

      // optional: remove that item from cart after purchase
      await removeItem(productId);

      router.push("/success");

    } catch {
      toast.error("Failed to place order");
    }
  };

  // 🔥 BUY FULL CART
  const handleBuyAll = async () => {
    try {
      setPaying(true);

      const res = await fetch("/api/orders", {
        method: "POST",
      });

      if (!res.ok) throw new Error();

      toast.success("Payment successful 🎉");
      router.push("/success");

    } catch {
      toast.error("Payment failed ❌");
    } finally {
      setPaying(false);
    }
  };

  // 🔥 TOTAL
  const total = items.reduce(
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  );

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

      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          Your cart is empty 🛒
        </p>
      ) : (
        <>
          {/* 🔥 ITEMS */}
          <div className="space-y-5">
            {items.map((item: any) => (
              <div
                key={item._id}
                className="bg-white p-5 rounded-2xl shadow-sm border flex items-center justify-between gap-6"
              >

                {/* LEFT */}
                <div className="flex items-center gap-4 flex-1">

                  {/* IMAGE */}
                  <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={
                        item.product.images?.[0] ||
                        "https://via.placeholder.com/150"
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div>
                    <h2 className="font-semibold text-lg">
                      {item.product.title}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      ₹{item.product.price}
                    </p>

                    <button
                      onClick={() =>
                        removeItem(item.product._id)
                      }
                      className="text-red-500 text-xs mt-1 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-6">

                  {/* QUANTITY */}
                  <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, "dec")
                      }
                      className="px-2"
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
                      className="px-2"
                    >
                      +
                    </button>
                  </div>

                  {/* PRICE */}
                  <div className="font-semibold text-lg min-w-[80px] text-right">
                    ₹{item.product.price * item.quantity}
                  </div>

                  {/* 🔥 BUY SINGLE */}
                  <button
                    onClick={() =>
                      handleBuySingle(
                        item.product._id,
                        item.quantity
                      )
                    }
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 text-sm"
                  >
                    Buy Now
                  </button>

                </div>
              </div>
            ))}
          </div>

          {/* 🔥 TOTAL */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border flex justify-between items-center mt-8">

            <div>
              <p className="text-gray-500 text-sm">
                Total Amount
              </p>
              <h2 className="text-2xl font-bold">
                ₹{total}
              </h2>
            </div>

            {/* 🔥 BUY ALL */}
            <button
              onClick={handleBuyAll}
              className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              Pay All
            </button>

          </div>
        </>
      )}
    </div>
  );
}