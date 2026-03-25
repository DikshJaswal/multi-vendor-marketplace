import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getAuthSession } from "@/lib/auth";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const session = await getAuthSession();

  // 🔐 ADMIN ONLY
  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 403 }
    );
  }

  // 🔥 NEXT 16 FIX
  const { id } = await context.params;

  await User.findByIdAndUpdate(id, {
    isSellerApproved: true,
    role: "seller", // 🔥 ensure role stays seller
  });

  return NextResponse.json({
    message: "Seller approved",
  });
}