import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  const session = await getAuthSession();

  // 1. Not logged in
  if (!session) {
    return NextResponse.json(
      { message: "Not logged in" },
      { status: 401 }
    );
  }

  // 2. Not seller
  if (session.user.role !== "seller") {
    return NextResponse.json(
      { message: "Only seller allowed" },
      { status: 403 }
    );
  }

  // 3. Success
  return NextResponse.json({
    message: "Welcome seller!",
  });
}