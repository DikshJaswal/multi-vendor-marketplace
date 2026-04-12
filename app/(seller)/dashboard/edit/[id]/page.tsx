"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Edit3, Package, DollarSign, Image as ImageIcon, Upload, X, ArrowLeft, CheckCircle } from "lucide-react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();

    const product = data.find((p: any) => p._id === params.id);

    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setImage(product.images?.[0] || "");
    }
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "marketplace");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqay3nnhh/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error?.message || "Upload failed");
        return;
      }

      setImage(data.secure_url);
      toast.success("Image uploaded ✅");

    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch(`/api/products/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        price: Number(price),
        images: [image],
      }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Product updated");
      router.push("/dashboard");
    } else {
      toast.error("Error updating");
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 flex justify-center items-start pt-10 px-4">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30 z-0">
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
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-36 h-36 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '9s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s', animationDuration: '7s' }}></div>
      </div>
      
      {/* Additional Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/30 to-transparent dark:from-slate-900/30 dark:to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/30 to-transparent dark:from-slate-900/30 dark:to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl space-y-6">

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="p-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-300"></div>
              <div className="relative bg-slate-800/90 dark:bg-slate-200/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl group-hover:scale-105 transition-all duration-300">
                <Edit3 className="w-6 h-6 text-white dark:text-slate-800" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Edit Product
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Update your product details
              </p>
            </div>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 space-y-6">

          <form onSubmit={handleUpdate} className="space-y-6">

            {/* PRODUCT INFO */}
            <div className="bg-gray-50/50 dark:bg-gray-700/30 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Product Info</h2>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                  Product Title
                </label>
                <input
                  placeholder="Enter product title"
                  className="w-full border-2 border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                  Price (₹)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Enter product price"
                    className="w-full border-2 border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* IMAGE */}
            <div className="bg-gray-50/50 dark:bg-gray-700/30 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Product Image</h2>
              </div>

              {!image ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300/50 dark:border-gray-600/50 rounded-xl h-40 cursor-pointer hover:border-slate-500/50 dark:hover:border-slate-400/50 transition-all bg-white/30 dark:bg-gray-700/30 backdrop-blur-sm">
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />

                  {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Click to upload image</span>
                    </div>
                  )}
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border border-green-200/50 dark:border-green-800/50 rounded-xl px-4 py-3 bg-green-50/50 dark:bg-green-900/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-green-700 dark:text-green-400 font-medium">
                        Image uploaded successfully
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setImage("")}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                    >
                      <X className="w-4 h-4" />
                      Change
                    </button>
                  </div>
                  
                  {/* Image Preview */}
                  <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                    <img
                      src={image}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-800/90 dark:bg-slate-200/90 backdrop-blur-sm text-white dark:text-slate-800 py-3 rounded-xl hover:bg-slate-700/90 dark:hover:bg-slate-300/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Edit3 className="w-5 h-5" />
                  Update Product
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}