import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  // find any user to act as seller
  const user = await User.findOne();

  const product = await Product.create({
    title: "Test Product",
    description: "This is a test product",
    price: 999,
    images: [],
    seller: user._id,
  });

  return NextResponse.json(product);
}