import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const categories = await prisma.category.findMany({  include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: {
        name: 'asc'
      }});
    return new Response(JSON.stringify(categories));
  } catch (error : any) {
    if (error.message === "Unauthorized" || error.message === "Forbidden") {
      return new NextResponse(error.message, { status: error.message === "Unauthorized" ? 401 : 403 });
    }
    console.error("Error fetching categories:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (dbUser?.role !== "ADMIN") {
    return new Response("Forbidden", { status: 403 });
  }
  try {
    const body = await request.json();
    const { name } = body;
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
