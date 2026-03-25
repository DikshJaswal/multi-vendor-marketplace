import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import Order from "@/models/Order";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> } // ✅ FIX
) {
  try {
    await connectDB();

    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "seller" && session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { status } = await req.json();

    // ✅ FIX: unwrap params
    const { id } = await context.params;

    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" } // ✅ modern mongoose fix
    );

    return NextResponse.json(updated);

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}