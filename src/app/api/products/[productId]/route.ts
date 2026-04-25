import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { checkAdminAuth } from "@/features/auth/utils/admin-auth";
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
    revalidateTag("products");
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
    revalidateTag("products");
    return new Response("Product deleted", { status: 204 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
