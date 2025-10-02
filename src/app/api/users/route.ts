import { checkAdminAuth } from "@/lib/admin-auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await checkAdminAuth();

    const users = await prisma.user.findMany({
      orderBy: { email: 'asc' }
    });
    return NextResponse.json(users);
    
  } catch (error: any) {
    if (error.message === "Unauthorized" || error.message === "Forbidden") {
      return new NextResponse(error.message, { 
        status: error.message === "Unauthorized" ? 401 : 403 
      });
    }
    console.error("Error fetching users:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}