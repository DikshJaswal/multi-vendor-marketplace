import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json([], { status: 401 });
    }

    if (session.user.role !== "seller") {
      return NextResponse.json([], { status: 403 });
    }

    const products = await Product.find({
      seller: session.user.id,
    }).sort({ createdAt: -1 });

    return NextResponse.json(products);

  } catch (error) {
    console.error(error);
    return NextResponse.json([]);
  }
}