export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-zinc-50">

      <h1 className="text-5xl font-bold mb-6">
        Welcome to Marketplace 🛍
      </h1>

      <p className="text-gray-600 max-w-xl mb-8">
        Discover amazing products from multiple vendors. 
        Add to cart, place orders, and enjoy a seamless shopping experience.
      </p>

      <a
        href="/shop"
        className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition"
      >
        Start Shopping
      </a>

    </div>
  );
}