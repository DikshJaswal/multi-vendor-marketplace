import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getProductById, updateProduct } from "@/services/product.service";
import { getAuthSession } from "@/lib/auth";
import Product from "@/models/Product";

// ✅ GET PRODUCT + RELATED PRODUCTS
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    // 🔥 RELATED PRODUCTS
    const related = await Product.find({
      _id: { $ne: id },
      category: product.category,
    })
      .limit(4)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      product,
      related,
    });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}

// ✅ UPDATE (PATCH)
export async function PATCH(
  req: NextRequest,
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

// ✅ DELETE (FIXED)
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    if (product.seller.toString() !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted" });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// ✅ PUT (FIXED)
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    if (product.seller.toString() !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const updated = await Product.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    return NextResponse.json(updated);

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}