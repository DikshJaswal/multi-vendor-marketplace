import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { getUserOrders } from "@/services/order.service";

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

    const orders = await getUserOrders(session.user.id);

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json([]);
  }
}