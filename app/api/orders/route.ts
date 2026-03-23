import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { placeOrder } from "@/services/order.service";

export async function POST() {
  try {
    await connectDB();

    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const order = await placeOrder(session.user.id);

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }
}