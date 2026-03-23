"use client";

import { useState } from "react";

export default function TestPage() {
  const [response, setResponse] = useState<any>(null);

  const handleAddToCart = async () => {
    const res = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: "69beb0266704fe6c785c3b29",
      }),
    });



    const data = await res.json();
    setResponse(data);
  };
      const handlePlaceOrder = async () => {
    const res = await fetch("/api/orders", {
        method: "POST",
    });

    const data = await res.json();
    setResponse(data);
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Test Cart</h1>

      <button onClick={handleAddToCart}>
        Add To Cart
      </button>

      <button onClick={handlePlaceOrder}>
  Place Order
</button>

      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}