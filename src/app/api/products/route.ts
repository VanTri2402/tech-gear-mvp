import { checkAdminAuth } from "@/lib/admin-auth";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      _count: true,
    },
  });
  return NextResponse.json(products);
}
export async function POST(request: Request) {
  try {
    await checkAdminAuth();

    const body = await request.json();
    const { name, description, price, imageUrl, categoryId } = body;

    const product = await prisma.product.create({
      data: { name, description, price, imageUrl, categoryId },
    });
    return NextResponse.json(product);
  } catch (error: any) {
    // Bắt các lỗi đã "ném" ra từ checkAdminAuth
    if (error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error.message === "Forbidden") {
      return new NextResponse("Forbidden", { status: 403 });
    }
    // Các lỗi khác
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
