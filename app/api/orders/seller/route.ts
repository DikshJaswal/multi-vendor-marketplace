import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { getSellerOrders } from "@/services/order.service";

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

    if (session.user.role !== "seller") {
      return NextResponse.json(
        { message: "Only sellers allowed" },
        { status: 403 }
      );
    }

    const orders = await getSellerOrders(session.user.id);

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}