"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        title,
        price: Number(price),
        images: [image],
      }),
    });

    if (res.ok) {
      toast.success("Product created");
      router.push("/dashboard");
    } else {
      toast.error("Error creating product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-10 px-4">
      <div className="w-full max-w-3xl space-y-6">

        <h1 className="text-3xl font-bold">Add Product</h1>

        <div className="bg-white rounded-2xl shadow p-6 space-y-6">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* INFO */}
            <div className="border rounded-xl p-5 space-y-4">
              <h2 className="font-semibold text-lg">Product Info</h2>

              <input
                placeholder="Product Title"
                className="w-full border p-2 rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <input
                type="number"
                placeholder="Price"
                className="w-full border p-2 rounded-lg"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            {/* IMAGE */}
            <div className="border rounded-xl p-5 space-y-4">
              <h2 className="font-semibold text-lg">Product Image</h2>

              {!image ? (
                <label className="flex items-center justify-center border-2 border-dashed rounded-xl h-32 cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {uploading ? (
                    <span className="text-gray-500">Uploading...</span>
                  ) : (
                    <span className="text-gray-500">
                      Click to upload image
                    </span>
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
              Create Product
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}