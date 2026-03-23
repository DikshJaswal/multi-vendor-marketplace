"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Order Confirmed!
      </h1>

      <p className="text-gray-600 mb-6 max-w-md">
        Your payment was successful and your order has been placed.
      </p>

      <div className="flex gap-4">
        <Link
          href="/orders"
          className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800"
        >
          View Orders
        </Link>

        <Link
          href="/shop"
          className="border px-6 py-2 rounded-xl hover:bg-gray-100"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}