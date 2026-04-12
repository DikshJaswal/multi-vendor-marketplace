"use client";

import Link from "next/link";
import { CheckCircle, ShoppingBag } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center justify-center text-center px-6">
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
        <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-36 h-36 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '9s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s', animationDuration: '7s' }}></div>
      </div>

      <div className="relative">
        {/* Success Icon */}
        <div className="relative group mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
          <div className="relative bg-green-100/50 dark:bg-green-900/50 backdrop-blur-sm rounded-full p-8 group-hover:scale-105 transition-all duration-300">
            <CheckCircle className="w-24 h-24 text-green-600 dark:text-green-400" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-6" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
          🎉 Order Confirmed!
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
          Your payment was successful and your order has been placed. You'll receive a confirmation email shortly.
        </p>

        {/* Success Details */}
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 mb-8 max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShoppingBag className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
              Order Details
            </h3>
          </div>
          <div className="space-y-3 text-left">
            <div className="flex justify-between items-center py-2 border-b border-slate-200/50 dark:border-slate-700/50">
              <span className="text-slate-600 dark:text-slate-400" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>Status</span>
              <span className="text-green-600 dark:text-green-400 font-medium" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>Confirmed</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200/50 dark:border-slate-700/50">
              <span className="text-slate-600 dark:text-slate-400" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>Payment</span>
              <span className="text-green-600 dark:text-green-400 font-medium" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>Successful</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600 dark:text-slate-400" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>Delivery</span>
              <span className="text-slate-900 dark:text-white font-medium" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>3-5 Business Days</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800/80 dark:bg-slate-200/80 backdrop-blur-sm text-white dark:text-slate-800 rounded-2xl hover:bg-slate-700/80 dark:hover:bg-slate-300/80 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl font-semibold"
            style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
          >
            <CheckCircle className="w-5 h-5" />
            View Orders
          </Link>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-800 dark:text-white rounded-2xl hover:bg-white/70 dark:hover:bg-slate-700/70 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl font-semibold border border-slate-200/50 dark:border-slate-700/50"
            style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}