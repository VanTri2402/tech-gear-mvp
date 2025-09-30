import  prisma  from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";


export async function GET() {
  const product = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  return NextResponse.json(product)
}

export async function POST(request: Request) {
    try {
        const {getUser} = getKindeServerSession();
        const user = await getUser();
        if (!user) {
            return new Response("Unauthorized", { status: 401 });
        }
        const dbUser = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
        });
        if(dbUser?.role !== "ADMIN") {
            return new Response("Forbidden", { status: 403 });
        }
        const body = await request.json();
        const { name, description, price, imageUrl, categoryId } = body;
        const product = await prisma.product.create({
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
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
