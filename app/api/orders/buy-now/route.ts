import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import Product from "@/models/Product";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getAuthSession();

    // ❌ Not logged in
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { productId, quantity } = body;

    // ❌ Validate input
    if (!productId || !quantity) {
      return NextResponse.json(
        { message: "Invalid data" },
        { status: 400 }
      );
    }

    // 🔍 Find product
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // 💰 Calculate total
    const totalAmount = product.price * quantity;

    // 🧾 Create order
    const order = await Order.create({
      user: session.user.id,
      items: [
        {
          product: product._id,
          quantity,
          price: product.price,
        },
      ],
      totalAmount,
      shippingAddress: "Default Address",
      status: "pending",
    });

    return NextResponse.json(order);

  } catch (error: any) {
    console.error("BUY NOW ERROR:", error);

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}