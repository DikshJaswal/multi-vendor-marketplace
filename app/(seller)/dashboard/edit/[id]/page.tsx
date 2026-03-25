"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

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
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-10 px-4">
      <div className="w-full max-w-3xl space-y-6">

        <h1 className="text-3xl font-bold">Edit Product</h1>

        <div className="bg-white rounded-2xl shadow p-6 space-y-6">

          <form onSubmit={handleUpdate} className="space-y-6">

            {/* PRODUCT INFO */}
            <div className="border rounded-xl p-5 space-y-4">
              <h2 className="font-semibold text-lg">Product Info</h2>

              <div>
                <label className="text-sm text-gray-600">
                  Product Title
                </label>
                <input
                  placeholder="Enter product title"
                  className="w-full border p-2 rounded-lg mt-1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="Enter product price"
                  className="w-full border p-2 rounded-lg mt-1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* IMAGE */}
            <div className="border rounded-xl p-5 space-y-4">
              <h2 className="font-semibold text-lg">Product Image</h2>

              {!image ? (
                <label className="flex items-center justify-center border-2 border-dashed rounded-xl h-32 cursor-pointer">
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {uploading ? (
                    <span>Uploading...</span>
                  ) : (
                    <span>Click to upload image</span>
                  )}
                </label>
              ) : (
                <div className="flex items-center justify-between border rounded-xl px-4 py-3 bg-green-50">
                  <span className="text-green-700 font-medium">
                    Uploaded ✅
                  </span>

                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>

            <button className="w-full bg-black text-white py-3 rounded-xl">
              {loading ? "Updating..." : "Update Product"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}