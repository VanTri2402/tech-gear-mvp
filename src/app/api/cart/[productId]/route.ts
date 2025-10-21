// src/app/api/wishlist/[productId]/route.ts
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

// Thêm sản phẩm vào wishlist
export async function POST(
  req: Request,
  { params }: { params: { productId: string } }
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      inCart: {
        connect: { id: params.productId },
      },
    },
  });
  return new NextResponse("OK", { status: 200 });
}

// Xóa sản phẩm khỏi wishlist
export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      inCart: {
        disconnect: { id: params.productId },
      },
    },
  });
  return new NextResponse("OK", { status: 200 });
}
