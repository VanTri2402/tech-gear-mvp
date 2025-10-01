import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkAdminAuth } from "@/lib/admin-auth";
export async function PATCH(
  request: Request,
  { params }: { params: { productId: string } }
) {
  await checkAdminAuth();
  const { productId } = params;

  try {
    const body = await request.json();
    const { name, description, price, imageUrl, categoryId } = body;
    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        description,
        price,
        imageUrl,
        categoryId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { productId: string } }
) {
  await checkAdminAuth();
  try {
    const { productId } = params;
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    return new Response("Product deleted", { status: 204 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
