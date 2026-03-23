import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const user = await User.create({
    name: "Test User",
    email: "test@example.com",
    password: "123456",
  });

  return NextResponse.json(user);
}   