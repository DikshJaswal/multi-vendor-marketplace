import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getProductById, updateProduct, deleteProduct } from "@/services/product.service";
import { getAuthSession } from "@/lib/auth";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    const product = await getProductById(id);

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const body = await req.json();

    const updatedProduct = await updateProduct(
      id,
      session.user.id,
      session.user.role,
      body
    );

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 403 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const result = await deleteProduct(
      id,
      session.user.id,
      session.user.role
    );

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 403 }
    );
  }
}