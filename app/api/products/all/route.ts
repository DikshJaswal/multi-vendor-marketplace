import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  await connectDB();

  const session = await getAuthSession();

  if (!session || session.user.role !== "admin") {
    return NextResponse.json([], { status: 403 });
  }

  const products = await Product.find().sort({ createdAt: -1 });

  return NextResponse.json(products);
}