import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import User from "@/models/User";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const user = await User.findOne();
  const product = await Product.findOne();

  const cart = await Cart.create({
    user: user._id,
    items: [
      {
        product: product._id,
        quantity: 2,
      },
    ],
  });

  return NextResponse.json(cart);
}