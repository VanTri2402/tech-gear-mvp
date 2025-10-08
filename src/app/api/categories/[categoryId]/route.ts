import { checkAdminAuth } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
export async function DELETE({ params }: { params: { categoryId: string } }) {
  try {
    await checkAdminAuth();
    // Proceed with deletion logic
    const { categoryId } = params;
    await prisma?.category.delete({
      where: { id: categoryId },
    });
    return new NextResponse("Category deleted successfully!", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to delete category", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    await checkAdminAuth();
    const { categoryId } = params;
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    await prisma?.category.update({
      where: { id: categoryId },
      data: { name },
    });
    return new NextResponse("Category updated successfully!", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update category", { status: 500 });
  }
}
