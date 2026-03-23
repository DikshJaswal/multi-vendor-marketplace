import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const user = await User.findOne();
  const product = await Product.findOne();

  const order = await Order.create({
    user: user._id,
    items: [
      {
        product: product._id,
        quantity: 1,
        price: product.price, // snapshot
      },
    ],
    totalAmount: product.price,
    shippingAddress: "Test Address, India",
  });

  return NextResponse.json(order);
}