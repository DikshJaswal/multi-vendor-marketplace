"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Package, Truck, Users, Star, TrendingUp, Shield, Sparkles } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Animated Pattern Overlay */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
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
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
          <div className="absolute top-1/4 right-20 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '4s', animationDuration: '9s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-gradient-to-r from-amber-400/20 to-red-400/20 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '7s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-28 h-28 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '3s', animationDuration: '11s' }}></div>
        </div>
      </div>

      {/* Hero Section - Modern Glassy Design */}
      <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Additional Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-slate-200/30 dark:bg-slate-700/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-slate-300/20 dark:bg-slate-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-10">
          {/* Logo - Glassy */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-300"></div>
              <div className="relative bg-slate-800/90 dark:bg-slate-200/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl group-hover:scale-105 transition-all duration-300">
                <ShoppingBag className="w-16 h-16 text-white dark:text-slate-800" />
              </div>
            </div>
          </div>

          {/* Main heading - Nexa Script */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            Welcome to Marketplace
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            Discover amazing products from multiple vendors. 
            <br className="hidden md:block" />
            Add to cart, place orders, and enjoy a seamless shopping experience.
          </p>

          {/* CTA Button - Glassy */}
          <div className="flex justify-center">
            <a
              href="/shop"
              className="relative group inline-flex items-center gap-3 px-10 py-4 bg-slate-800/80 dark:bg-slate-200/80 backdrop-blur-sm text-white dark:text-slate-800 rounded-2xl hover:bg-slate-700/80 dark:hover:bg-slate-300/80 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
              style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
            >
              <Sparkles className="w-5 h-5" />
              Start Shopping
              <Sparkles className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Features Section - Glassy Cards */}
      <div className="relative py-24 px-6">
        {/* Section Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50">
          <div className="absolute inset-0 opacity-20 dark:opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 30px,
                rgba(148, 163, 184, 0.05) 30px,
                rgba(148, 163, 184, 0.05) 60px
              )`
            }}></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-800 dark:text-white" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
            Why Choose Our Marketplace?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Package className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>Quality Products</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                  Curated selection of high-quality products from trusted vendors worldwide.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>Multiple Vendors</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                  Shop from various sellers and compare prices to find the best deals.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>Fast Delivery</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
                  Quick and reliable delivery to your doorstep with real-time tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Glassy Design */}
      <div className="relative py-20 px-6">
        {/* Section Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/30 to-white/30 dark:from-slate-800/30 dark:to-slate-900/30">
          <div className="absolute inset-0 opacity-15 dark:opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(
                circle at 25% 25%,
                rgba(148, 163, 184, 0.1) 0%,
                transparent 50%
              ),
              radial-gradient(
                circle at 75% 75%,
                rgba(148, 163, 184, 0.1) 0%,
                transparent 50%
              )`
            }}></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl rounded-3xl p-12 border border-slate-200/50 dark:border-slate-700/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-slate-800 dark:text-white mb-2" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>1000+</div>
                <div className="text-slate-600 dark:text-slate-400" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>Products</div>
              </div>
              <div className="group">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-slate-800 dark:text-white mb-2" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>50+</div>
                <div className="text-slate-600 dark:text-slate-400" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>Vendors</div>
              </div>
              <div className="group">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-slate-800 dark:text-white mb-2" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>10k+</div>
                <div className="text-slate-600 dark:text-slate-400" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>Happy Customers</div>
              </div>
              <div className="group">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-slate-800 dark:text-white mb-2" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>4.8⭐</div>
                <div className="text-slate-600 dark:text-slate-400" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Final */}
      <div className="relative py-24 px-6">
        {/* Section Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-700">
          <div className="absolute inset-0 opacity-30 dark:opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 50px,
                rgba(148, 163, 184, 0.1) 50px,
                rgba(148, 163, 184, 0.1) 100px
              )`
            }}></div>
          </div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-600/80 dark:from-slate-200/80 dark:to-slate-400/80 backdrop-blur-xl rounded-3xl p-12 border border-slate-300/50 dark:border-slate-700/50">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-slate-800" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
              Ready to Start Shopping?
            </h2>
            <p className="text-xl mb-8 text-white/90 dark:text-slate-800/90 max-w-2xl mx-auto" style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}>
              Join thousands of happy customers and discover the best products from trusted vendors.
            </p>
            <a
              href="/shop"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
              style={{ fontFamily: 'Nexa Script', fontStyle: 'italic' }}
            >
              <ShoppingBag className="w-5 h-5" />
              Explore Products
              <ShoppingBag className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}