import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import User from "@/models/User";

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

    await User.findByIdAndUpdate(session.user.id, {
      role: "seller",
      isSellerApproved: false, // 🔥 important
    });

    return NextResponse.json({
      message: "Seller request sent for approval",
    });

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}