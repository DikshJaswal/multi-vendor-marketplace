import { connectDB } from "@/lib/db";
import { createUser } from "@/services/user.service";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await createUser({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }
}