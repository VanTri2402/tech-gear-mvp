// src/app/api/auth/check-role/route.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Đảm bảo đường dẫn import prisma đúng

// API route này sẽ chạy trên Node.js runtime mặc định
export async function GET(request: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return (
        NextResponse.json({ isAdmin: false }, { status: 401 }) &&
        NextResponse.redirect("/access-denied")
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    if (!dbUser || !dbUser.role) {
      return NextResponse.json({ isAdmin: false }, { status: 403 }); // Forbidden
    }

    const isAdmin = dbUser.role === "ADMIN";
    return NextResponse.json({ isAdmin: isAdmin });
  } catch (error) {
    console.error("API Check Role Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
