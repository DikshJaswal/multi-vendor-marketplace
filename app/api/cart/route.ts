import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { getCart } from "@/services/cart.service";

export async function GET() {
  try {
    await connectDB();

    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const cart = await getCart(session.user.id);

    return NextResponse.json(cart);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}