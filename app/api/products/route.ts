import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { createProduct } from "@/services/product.service";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getAuthSession();

    // 🔐 AUTH CHECK
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🔐 ONLY APPROVED SELLER CAN ADD
    if (
      session.user.role !== "seller" ||
      !session.user.isSellerApproved
    ) {
      return NextResponse.json(
        { message: "Seller not approved" },
        { status: 403 }
      );
    }

    const body = await req.json();

    // 🔥 CREATE PRODUCT (PENDING BY DEFAULT)
    const product = await createProduct({
      ...body,
      seller: session.user.id,
      isApproved: false,
    });

    return NextResponse.json(product);

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    const query: any = {
      isApproved: true, // 🔥 ONLY APPROVED PRODUCTS
    };

    if (search && search.trim() !== "") {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    const products = await Product.find(query).sort({
      createdAt: -1,
    });

    return NextResponse.json(products);

  } catch (error) {
    console.error(error);
    return NextResponse.json([]);
  }
}