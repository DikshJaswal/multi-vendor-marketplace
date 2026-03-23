import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { addToCart } from "@/services/cart.service";

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { productId, type } = await req.json(); 

    const cart = await addToCart(
      session.user.id,
      productId,
      type 
    );

    return NextResponse.json(cart);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }
}