"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Package, ArrowRight } from "lucide-react";

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

      // toast.success("Item removed 🗑");
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
      <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 max-w-6xl mx-auto px-6 py-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(148, 163, 184, 0.1) 35px,
              rgba(148, 163, 184, 0.1) 70px
            )`
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-slate-400/10 to-slate-600/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-slate-500/10 to-slate-700/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative flex items-center gap-4 mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-300"></div>
            <div className="relative bg-slate-800/90 dark:bg-slate-200/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl group-hover:scale-105 transition-all duration-300">
              <ShoppingCart className="w-6 h-6 text-white dark:text-slate-800" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            Your Cart
          </h1>
          <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-700/50">
            <Package className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 animate-pulse space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              </div>
              <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-xl" />
              </div>
              <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 max-w-6xl mx-auto px-6 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(148, 163, 184, 0.1) 35px,
            rgba(148, 163, 184, 0.1) 70px
          )`
        }}></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-slate-400/10 to-slate-600/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-slate-500/10 to-slate-700/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative flex items-center gap-4 mb-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-300"></div>
          <div className="relative bg-slate-800/90 dark:bg-slate-200/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl group-hover:scale-105 transition-all duration-300">
            <ShoppingCart className="w-6 h-6 text-white dark:text-slate-800" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
          Your Cart
        </h1>
        <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-700/50">
          <Package className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative group mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full p-8 group-hover:scale-105 transition-all duration-300">
              <ShoppingCart className="w-16 h-16 text-slate-400 dark:text-slate-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-600 dark:text-slate-400 mb-4" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            Your cart is empty
          </h2>
          <p className="text-slate-500 dark:text-slate-500 text-center max-w-md mb-6" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
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
        <>
          {/* ITEMS - Original structure with beautiful styling */}
          <div className="space-y-6">
            {items.map((item: any, index) => (
              <div
                key={item._id}
                className="group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-slate-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative">
                  <div className="flex items-center justify-between gap-6">
                    {/* LEFT - Original structure */}
                    <div className="flex items-center gap-4 flex-1">
                      {/* IMAGE */}
                      <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={
                            item.product.images?.[0] ||
                            "https://via.placeholder.com/150"
                          }
                          className="w-full h-full object-cover"
                          alt={item.product.title}
                        />
                      </div>
                    </div>

                    {/* INFO */}
                    <div className="flex-1">
                      <h2 className="font-bold text-xl text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                        {item.product.title}
                      </h2>
                      <p className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 dark:from-slate-300 dark:to-slate-400 bg-clip-text text-transparent mb-3">
                        ₹{item.product.price}
                      </p>
                      <button
                        onClick={() =>
                          removeItem(item.product._id)
                        }
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors duration-200 hover:scale-105"
                        style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* RIGHT - Original structure */}
                  <div className="flex items-center gap-6">
                    {/* QUANTITY */}
                    <div className="flex items-center gap-1 bg-slate-100/50 dark:bg-slate-700/50 backdrop-blur-sm p-1 rounded-2xl border border-slate-200/50 dark:border-slate-600/50">
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, "dec")
                        }
                        className="p-2 rounded-xl hover:bg-slate-200/70 dark:hover:bg-slate-600/70 transition-all duration-200 hover:scale-110"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </button>
                      <span className="font-bold text-lg text-slate-900 dark:text-white min-w-[3rem] text-center" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, "inc")
                        }
                        className="p-2 rounded-xl hover:bg-slate-200/70 dark:hover:bg-slate-600/70 transition-all duration-200 hover:scale-110"
                      >
                        <Plus className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </button>
                    </div>

                    {/* PRICE */}
                    <div className="text-right min-w-[100px]">
                      <p className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 dark:from-slate-300 dark:to-slate-400 bg-clip-text text-transparent">
                        ₹{item.product.price * item.quantity}
                      </p>
                    </div>

                    {/* BUY SINGLE - Original functionality */}
                    <button
                      onClick={() =>
                        handleBuySingle(
                          item.product._id,
                          item.quantity
                        )
                      }
                      className="flex items-center gap-2 bg-slate-800/80 dark:bg-slate-200/80 backdrop-blur-sm text-white dark:text-slate-800 px-6 py-3 rounded-2xl hover:bg-slate-700/80 dark:hover:bg-slate-300/80 hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                      style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
                    >
                      <CreditCard className="w-4 h-4" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL - Original structure with beautiful styling */}
          <div className="relative mt-8">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 rounded-3xl blur-xl opacity-30"></div>
            <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl p-1 rounded-3xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-8 rounded-3xl flex justify-between items-center">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm uppercase tracking-wide" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                    Total Amount
                  </p>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                    ₹{total}
                  </h2>
                </div>

                {/* BUY ALL - Enhanced functionality */}
                <button
                  onClick={handleBuyAll}
                  disabled={paying}
                  className="flex items-center gap-3 bg-slate-800/80 dark:bg-slate-200/80 backdrop-blur-sm text-white dark:text-slate-800 px-8 py-4 rounded-2xl hover:bg-slate-700/80 dark:hover:bg-slate-300/80 hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
                >
                  {paying ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white dark:border-slate-800 border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay All
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}