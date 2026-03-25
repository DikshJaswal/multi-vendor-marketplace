import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  await connectDB();

  const session = await getAuthSession();

  // 🔥 CHECK ADMIN
  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 403 }
    );
  }

  const users = await User.find();

  return NextResponse.json(users);
}